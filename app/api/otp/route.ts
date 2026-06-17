import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

const OTP_TTL_MS = 3 * 60 * 1000; // 3 dəqiqə

function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendEmail(to: string, code: string): Promise<boolean> {
  const subject = 'BirCV – Təsdiq kodu';
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:12px;">
      <h2 style="color:#1a1a2e;margin:0 0 8px">BirCV</h2>
      <p style="color:#555;margin:0 0 24px">Aşağıdakı kodu daxil edin:</p>
      <div style="background:#fff;border:1px solid #e5e5e5;border-radius:8px;padding:20px;text-align:center;">
        <span style="font-size:36px;font-weight:900;letter-spacing:8px;color:#7C6EF8">${code}</span>
      </div>
      <p style="color:#999;font-size:12px;margin:16px 0 0">Kod 3 dəqiqə etibarlıdır.</p>
    </div>
  `;
  const text = `BirCV təsdiq kodunuz: ${code}\nKod 3 dəqiqə etibarlıdır.`;

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'BirCV <onboarding@resend.dev>',
        to, subject, html,
      });
      return true;
    } catch (e) { console.error('[otp] Resend error:', e); return false; }
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = (nodemailer as any).createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, html, text });
      return true;
    } catch (e) { console.error('[otp] SMTP error:', e); return false; }
  }

  console.log(`\n[OTP DEV] ${to} → KOD: ${code}\n`);
  return false;
}

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const { action, email, code } = body || {};
  const mail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return NextResponse.json({ error: 'valid email required' }, { status: 400 });
  }

  // ── SEND ──────────────────────────────────────────────────────────────────
  if (action === 'send') {
    const newCode = genCode();
    const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

    // Supabase upsert (köhnə kodu əvəz et)
    await supabaseAdmin.from('otp_codes').upsert({ email: mail, code: newCode, expires_at: expiresAt });

    const delivered = await sendEmail(mail, newCode);
    return NextResponse.json({
      ok: true,
      ttl: OTP_TTL_MS / 1000,
      delivered,
      ...(delivered ? {} : { devCode: newCode }),
    });
  }

  // ── VERIFY ────────────────────────────────────────────────────────────────
  if (action === 'verify') {
    const { data: entry } = await supabaseAdmin
      .from('otp_codes').select('*').eq('email', mail).maybeSingle();

    if (!entry) return NextResponse.json({ ok: false, reason: 'no_code' }, { status: 400 });
    if (new Date(entry.expires_at).getTime() < Date.now()) {
      await supabaseAdmin.from('otp_codes').delete().eq('email', mail);
      return NextResponse.json({ ok: false, reason: 'expired' }, { status: 400 });
    }
    if (String(code) !== entry.code) {
      return NextResponse.json({ ok: false, reason: 'mismatch' }, { status: 400 });
    }
    await supabaseAdmin.from('otp_codes').delete().eq('email', mail);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'unknown action' }, { status: 400 });
}
