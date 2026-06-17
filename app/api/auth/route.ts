import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const { action, email, password, name } = body || {};
  if (!email || !password) {
    return NextResponse.json({ error: 'Email və şifrə tələb olunur' }, { status: 400 });
  }
  const mail = String(email).toLowerCase().trim();

  // ── REGISTER ────────────────────────────────────────────────────────────────
  if (action === 'register') {
    // Mövcud istifadəçi yoxla
    const { data: existing } = await supabaseAdmin
      .from('users').select('id').eq('email', mail).maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Bu email artıq qeydiyyatdan keçib' }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({ email: mail, name: name || mail.split('@')[0], password_hash: hash })
      .select()
      .single();

    if (error || !user) {
      console.error('[auth/register]', error);
      return NextResponse.json({ error: 'Qeydiyyat uğursuz oldu' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name, plan: user.plan, cvCount: user.cv_count },
    });
  }

  // ── LOGIN ───────────────────────────────────────────────────────────────────
  if (action === 'login') {
    const { data: user } = await supabaseAdmin
      .from('users').select('*').eq('email', mail).maybeSingle();

    if (!user) {
      return NextResponse.json({ error: 'Bu email tapılmadı' }, { status: 404 });
    }

    const valid = user.password_hash
      ? await bcrypt.compare(password, user.password_hash)
      : false;

    if (!valid) {
      return NextResponse.json({ error: 'Şifrə yanlışdır' }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name, plan: user.plan, cvCount: user.cv_count },
    });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
