'use client';
import { useState } from 'react';
import { CVProvider } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import { Users, CreditCard, RefreshCw, ShieldCheck } from 'lucide-react';

type Row = { id: string; name: string; email: string; plan: string; createdAt: string };
type Sub = { email: string; plan: string; createdAt: string };

function AdminInner() {
  const [key, setKey] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [users, setUsers] = useState<Row[]>([]);
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = async () => {
    setLoading(true); setErr('');
    try {
      const [uRes, sRes] = await Promise.all([
        fetch(`/api/users?key=${encodeURIComponent(key)}`),
        fetch('/api/subscribe'),
      ]);
      if (uRes.status === 401) { setErr('Yanlış admin açarı'); setLoading(false); return; }
      const uData = await uRes.json();
      const sData = await sRes.json();
      setUsers(uData.users || []);
      setSubs(sData.subscriptions || []);
      setUnlocked(true);
    } catch {
      setErr('Məlumat yüklənmədi');
    } finally {
      setLoading(false);
    }
  };

  const fmt = (iso: string) => { try { return new Date(iso).toLocaleString(); } catch { return iso; } };

  const card: React.CSSProperties = { background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 };
  const th: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)', textTransform: 'uppercase', letterSpacing: 0.5 };
  const td: React.CSSProperties = { padding: '11px 12px', fontSize: 13, color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.04)' };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={26} style={{ color: '#7C6EF8' }} /> Admin Panel
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginBottom: 28 }}>
          Qeydiyyatdan keçən istifadəçiləri və abunəlikləri izləyin
        </p>

        <div style={{ ...card, marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={key} onChange={e => setKey(e.target.value)}
            placeholder="Admin açarı (ADMIN_KEY)"
            style={{ flex: 1, minWidth: 200, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none' }}
          />
          <button onClick={load} disabled={loading} style={{ background: '#7C6EF8', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <RefreshCw size={15} className={loading ? 'spin' : ''} /> {unlocked ? 'Yenilə' : 'Daxil ol'}
          </button>
        </div>

        {err && <div style={{ color: '#f87171', fontSize: 13, marginBottom: 16 }}>{err}</div>}

        {unlocked && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 24 }} className="grid-resp-2">
              <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 14 }}>
                <Users size={26} style={{ color: '#7C6EF8' }} />
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{users.length}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>İstifadəçi</div>
                </div>
              </div>
              <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 14 }}>
                <CreditCard size={26} style={{ color: '#059669' }} />
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{subs.length}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Abunəlik</div>
                </div>
              </div>
            </div>

            <div style={{ ...card, marginBottom: 24, overflowX: 'auto' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 14 }}>İstifadəçilər</h2>
              {users.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Hələ qeydiyyat yoxdur.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
                  <thead><tr><th style={th}>Ad</th><th style={th}>E-poçt</th><th style={th}>Plan</th><th style={th}>Tarix</th></tr></thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td style={td}>{u.name}</td>
                        <td style={td}>{u.email}</td>
                        <td style={td}>{u.plan}</td>
                        <td style={td}>{fmt(u.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ ...card, overflowX: 'auto' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Abunəliklər</h2>
              {subs.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Hələ abunəlik yoxdur.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420 }}>
                  <thead><tr><th style={th}>E-poçt</th><th style={th}>Plan</th><th style={th}>Tarix</th></tr></thead>
                  <tbody>
                    {subs.map((s, i) => (
                      <tr key={i}>
                        <td style={td}>{s.email}</td>
                        <td style={td}>{s.plan}</td>
                        <td style={td}>{fmt(s.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return <CVProvider><AdminInner /></CVProvider>;
}
