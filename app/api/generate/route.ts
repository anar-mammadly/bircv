import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { jobTitle, wantedTitle, employer, city, startDate, endDate, language, type, skills, yearsOfExperience } = body;

  if (!jobTitle?.trim()) {
    return NextResponse.json({ error: 'jobTitle is required' }, { status: 400 });
  }

  // Graceful fallback when the AI key is not configured.
  const apiKey = process.env.GROQ_API_KEY;

  const langLabel = language === 'az' ? 'Azerbaijani' : 'English';

  let prompt: string;
  let fallbackText: string;

  if (type === 'summary') {
    const skillsNote = skills?.trim() ? `, skilled in ${skills}` : '';
    const expNote = yearsOfExperience?.trim() ? ` with ${yearsOfExperience} of experience` : '';
    const locationNote = city?.trim() ? ` based in ${city}` : '';
    prompt = `A candidate is applying for a "${jobTitle}" position${locationNote}${expNote}${skillsNote}. Write a confident, natural-sounding professional CV summary paragraph about this candidate, as if it will be printed directly on their CV.

Rules: write 2-3 flowing sentences as a single paragraph, no bullet points, no headings, no labels like "Target role" or "Location", do not restate these instructions, do not add an intro like "Here is...", do not wrap the output in quotation marks — output ONLY the final summary text itself, max 60 words, written ONLY in ${langLabel}.`;

    fallbackText = language === 'az'
      ? `${jobTitle} sahəsində nəticəyönümlü mütəxəssis. Komanda işində səmərəli ünsiyyət və problemləri həll etmə bacarığı ilə layihələrə dəyər qatır. Davamlı inkişafa və peşəkar nailiyyətlərə can atır.`
      : `Results-driven ${jobTitle} with strong problem-solving and communication skills. Brings value to projects through effective collaboration and attention to detail. Committed to continuous growth and professional excellence.`;
  } else {
    const durationNote = (startDate && startDate !== 'bilinmir' && startDate !== 'unknown')
      ? `from ${startDate} to ${endDate}`
      : '';

    const careerContext = wantedTitle?.trim() && wantedTitle.trim().toLowerCase() !== jobTitle.trim().toLowerCase()
      ? ` (targeting a "${wantedTitle}" role)`
      : '';

    prompt = `Write 3 CV bullet points in ${langLabel} for:
- Position: ${jobTitle}${careerContext}
- Company: ${employer}
- Location: ${city}
${durationNote ? `- Period: ${durationNote}` : ''}

Rules: exactly 3 bullets starting with "•", each on new line, strong past-tense action verbs, max 15 words each, no intro text, write ONLY in ${langLabel}.`;

    fallbackText = language === 'az'
      ? `• Komandanın fəaliyyətini koordinasiya edərək layihə hədəflərinə nail oldu\n• Yeni iş prosesləri tətbiq edərək səmərəliliyi 20% artırdı\n• Müştəri tələblərinə uyğun həllər hazırlayaraq məmnunluğu yüksəltdi`
      : `• Coordinated team activities and achieved project goals on schedule\n• Implemented new workflows that improved efficiency by 20%\n• Developed client-focused solutions increasing satisfaction scores`;
  }

  // No API key configured → return the canned fallback instead of crashing.
  if (!apiKey) {
    return new Response(fallbackText, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  try {
    const groq = new Groq({ apiKey });
    const stream = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: type === 'summary'
            ? `You are a professional CV writer. Return ONLY the summary paragraph, no bullet points, no intro, no explanation. Write in the language specified.`
            : `You are a professional CV writer. Return ONLY bullet points starting with •. No intro, no explanation. Write in the language specified.`
        },
        { role: 'user', content: prompt }
      ],
      stream: true,
      max_tokens: 200,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        if (type === 'summary') {
          // Short response — buffer fully so we can strip stray wrapping quotes the
          // model sometimes adds despite being told not to.
          let acc = '';
          for await (const chunk of stream) acc += chunk.choices[0]?.delta?.content || '';
          acc = acc.trim().replace(/^["“']([\s\S]*)["”']$/, '$1').trim();
          controller.enqueue(encoder.encode(acc));
        } else {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      }
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });

  } catch (err: any) {
    console.error('[generate] Error:', err?.message || err);
    return new Response(fallbackText, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
