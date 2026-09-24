import { createClient } from '@supabase/supabase-js';

// Server code reads SUPABASE_URL (a runtime var from wrangler.jsonc). NEXT_PUBLIC_* values are inlined at BUILD time,
// so a CI build with a stale value would silently point production at the wrong project (Cloudflare error 1016).
const url  = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side (limited)
export const supabase = createClient(url, anon);

// Server-side only — full access (API routes only!)
export const supabaseAdmin = createClient(url, svc);
