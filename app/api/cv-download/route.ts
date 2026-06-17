import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  const { userId } = body || {};
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  const { data: current } = await supabaseAdmin
    .from('users').select('cv_count, plan').eq('id', userId).single();

  if (!current) return NextResponse.json({ error: 'user not found' }, { status: 404 });

  if (current.plan !== 'admin' && current.plan === 'free' && current.cv_count >= 2) {
    return NextResponse.json({ ok: false, reason: 'limit_reached', cvCount: current.cv_count });
  }

  const { data: updated } = await supabaseAdmin
    .from('users')
    .update({ cv_count: current.cv_count + 1 })
    .eq('id', userId)
    .select('cv_count')
    .single();

  return NextResponse.json({ ok: true, cvCount: updated?.cv_count ?? current.cv_count + 1 });
}
