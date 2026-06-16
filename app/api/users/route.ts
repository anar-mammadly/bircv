import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// In-memory user registry. NOTE: resets on restart and is per-instance.
// Replace with a real database (Postgres, etc.) for production.
type Row = { id: string; name: string; email: string; plan: string; createdAt: string };
const users: Row[] =
  (globalThis as any).__USERS__ || ((globalThis as any).__USERS__ = []);

export async function GET(req: NextRequest) {
  // Simple shared-secret gate for the admin list.
  const key = req.nextUrl.searchParams.get('key');
  if (process.env.ADMIN_KEY && key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad body' }, { status: 400 }); }
  const { id, name, email, plan } = body || {};
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });
  const mail = String(email).toLowerCase();
  if (!users.some(u => u.email === mail)) {
    users.push({
      id: String(id || Date.now()),
      name: name || mail.split('@')[0],
      email: mail,
      plan: plan || 'free',
      createdAt: new Date().toISOString(),
    });
  }
  return NextResponse.json({ ok: true, count: users.length });
}
