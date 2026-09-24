'use client';
import { useState } from 'react';
import { Users, CreditCard, RefreshCw, ShieldCheck, Loader2 } from 'lucide-react';
import Navbar from '@/app/components/Navbar';

type Row = { id: string; name: string; email: string; plan: string; cvCount?: number; aiCount?: number; createdAt: string };
type Sub = { email: string; plan: string; createdAt: string };

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-small">
        <thead><tr>{head.map(h => <th key={h} className="border-b border-line px-3 py-2.5 text-caption font-semibold uppercase tracking-wide text-muted">{h}</th>)}</tr></thead>
        <tbody className="[&_td]:border-b [&_td]:border-line/60 [&_td]:px-3 [&_td]:py-2.5">{children}</tbody>
      </table>
    </div>
  );
}

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [users, setUsers] = useState<Row[]>([]);
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = async () => {
    setLoading(true); setErr('');
    try {
      const [uRes, sRes] = await Promise.all([fetch(`/api/users?key=${encodeURIComponent(key)}`), fetch('/api/subscribe')]);
      if (uRes.status === 401) { setErr('Yanlış admin açarı'); return; }
      const uData = await uRes.json(); const sData = await sRes.json();
      setUsers(uData.users || []); setSubs(sData.subscriptions || []); setUnlocked(true);
    } catch { setErr('Məlumat yüklənmədi'); } finally { setLoading(false); }
  };
  const fmt = (iso: string) => { try { return new Date(iso).toLocaleString(); } catch { return iso; } };

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="section max-w-[1000px] py-10">
        <h1 className="t-h2 flex items-center gap-2.5"><ShieldCheck size={26} className="text-primary" />Admin panel</h1>
        <p className="mt-1 text-ink-2">Qeydiyyatdan keçən istifadəçiləri və abunəlikləri izləyin.</p>

        <form onSubmit={e => { e.preventDefault(); load(); }} className="card mt-6 flex flex-wrap items-center gap-3 p-4">
          <input value={key} onChange={e => setKey(e.target.value)} type="password" placeholder="Admin açarı (ADMIN_KEY)" aria-label="Admin key" className="input min-w-[220px] flex-1" />
          <button type="submit" disabled={loading} className="btn-primary">{loading ? <Loader2 size={15} className="spin" /> : <RefreshCw size={15} />}{unlocked ? 'Yenilə' : 'Daxil ol'}</button>
        </form>
        {err && <p role="alert" className="mt-3 rounded-control bg-danger-soft px-3 py-2 text-small text-danger">{err}</p>}

        {unlocked && (
          <div className="mt-6 flex flex-col gap-5 animate-rise">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card flex items-center gap-4 p-5"><Users size={26} className="text-primary" /><div><div className="font-display text-3xl font-bold">{users.length}</div><div className="text-small text-ink-2">İstifadəçi</div></div></div>
              <div className="card flex items-center gap-4 p-5"><CreditCard size={26} className="text-success" /><div><div className="font-display text-3xl font-bold">{subs.length}</div><div className="text-small text-ink-2">Abunəlik</div></div></div>
            </div>
            <section className="card p-5">
              <h2 className="t-h3 mb-3">İstifadəçilər</h2>
              {users.length === 0 ? <p className="text-small text-muted">Hələ qeydiyyat yoxdur.</p> : (
                <Table head={['Ad', 'E-poçt', 'Plan', 'CV', 'AI', 'Tarix']}>
                  {users.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td><span className={u.plan === 'free' ? 'badge-muted' : 'badge-primary'}>{u.plan}</span></td><td>{u.cvCount ?? '—'}</td><td>{u.aiCount ?? '—'}</td><td>{fmt(u.createdAt)}</td></tr>)}
                </Table>
              )}
            </section>
            <section className="card p-5">
              <h2 className="t-h3 mb-3">Abunəliklər</h2>
              {subs.length === 0 ? <p className="text-small text-muted">Hələ abunəlik yoxdur.</p> : (
                <Table head={['E-poçt', 'Plan', 'Tarix']}>
                  {subs.map((s, i) => <tr key={i}><td>{s.email}</td><td>{s.plan}</td><td>{fmt(s.createdAt)}</td></tr>)}
                </Table>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
