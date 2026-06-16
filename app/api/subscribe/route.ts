import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// In-memory subscription log. NOTE: resets on restart, per-instance.
// Back this with a database for production.
type Sub = { email: string; plan: string; createdAt: string };
const subs: Sub[] =
  (globalThis as any).__SUBS__ || ((globalThis as any).__SUBS__ = []);

async function notifyAdmin(sub: Sub): Promise<boolean> {
  const admin = process.env.ADMIN_EMAIL || 'support@bircv.az';
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
        to: admin,
        subject: 'BirCV – Yeni abunəlik',
        text: `Yeni abunəlik:\nE-poçt: ${sub.email}\nPlan: ${sub.plan}\nTarix: ${sub.createdAt}`,
      });
      return true;
    } catch (e) {
      console.error('[subscribe] admin notify failed:', e);
      return false;
    }
  }
  // No mailer configured – log to server console for development.
  console.log(`[subscribe] (dev) new subscription -> notify ${admin}:`, sub);
  return false;
}

export async function GET() {
  return NextResponse.json({ subscriptions: subs });
}

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad body' }, { status: 400 }); }
  const { email, plan } = body || {};
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

  const sub: Sub = {
    email: String(email).toLowerCase(),
    plan: plan || 'premium',
    createdAt: new Date().toISOString(),
  };
  subs.push(sub);
  const notified = await notifyAdmin(sub);
  return NextResponse.json({ ok: true, notified });
}
