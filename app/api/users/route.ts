import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  if (process.env.ADMIN_KEY && key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, name, email, plan, cv_count, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[users] fetch error:', error);
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 });
  }

  const users = (data || []).map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    plan: u.plan,
    cvCount: u.cv_count,
    createdAt: u.created_at,
  }));

  return NextResponse.json({ users, total: users.length });
}
