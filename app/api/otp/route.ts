import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// In-memory OTP store. NOTE: this resets on server restart and is per-instance.
// For production, back this with Redis / a database so codes survive across
// serverless invocations.
type Entry = { code: string; expires: number };
const store: Map<string, Entry> =
  (globalThis as any).__OTP_STORE__ || ((globalThis as any).__OTP_STORE__ = new Map());

const OTP_TTL_MS = 3 * 60 * 1000; // 3 minutes

function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000)); // 6 digits
}

async function sendEmail(to: string, code: string): Promise<boolean> {
  // Wire your email provider here (SMTP / Resend / SendGrid …).
  // Example with nodemailer (install it and set the SMTP_* env vars):
  //
  //   const nodemailer = await import('nodemailer');
  //   const tx = nodemailer.createTransport({ host: process.env.SMTP_HOST, ... });
  //   await tx.sendMail({ to, subject: 'BirCV təsdiq kodu', text: `Kodunuz: ${code}` });
  //
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      // @ts-ignore - optional dependency, present only if installed
      const nodemailer = await import('nodemailer');
      const transporter = (nodemailer as any).createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: 'BirCV – Təsdiq kodu',
        text: `Qeydiyyat kodunuz: ${code}\nKod 3 dəqiqə ərzində etibarlıdır.`,
      });
      return true;
    } catch (e) {
      console.error('[otp] email send failed:', e);
      return false;
    }
  }
  // No mailer configured – log to server console for development.
  console.log(`[otp] (dev) code for ${to}: ${code}`);
  return false;
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  const { action, email, code } = body || {};
  const mail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return NextResponse.json({ error: 'valid email required' }, { status: 400 });
  }

  if (action === 'send') {
    const newCode = genCode();
    store.set(mail, { code: newCode, expires: Date.now() + OTP_TTL_MS });
    const delivered = await sendEmail(mail, newCode);
    return NextResponse.json({
      ok: true,
      ttl: OTP_TTL_MS / 1000,
      delivered,
      // devCode is only returned when no real mailer is configured, so the
      // flow stays testable locally. Remove once SMTP is wired up.
      ...(delivered ? {} : { devCode: newCode }),
    });
  }

  if (action === 'verify') {
    const entry = store.get(mail);
    if (!entry) return NextResponse.json({ ok: false, reason: 'no_code' }, { status: 400 });
    if (Date.now() > entry.expires) {
      store.delete(mail);
      return NextResponse.json({ ok: false, reason: 'expired' }, { status: 400 });
    }
    if (String(code) !== entry.code) {
      return NextResponse.json({ ok: false, reason: 'mismatch' }, { status: 400 });
    }
    store.delete(mail); // single use
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'unknown action' }, { status: 400 });
}
