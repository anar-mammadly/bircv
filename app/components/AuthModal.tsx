'use client';
import { useState, useEffect, useRef } from 'react';
import { useCVStore } from '@/app/store/cvStore';
import { User as UserType } from '@/app/types/cv';
import { Mail, Lock, User, ShieldCheck, BadgeCheck, ArrowLeft } from 'lucide-react';

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
  padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none',
};

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, setUser } = useCVStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // OTP step
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [devCode, setDevCode] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // reset modal state whenever it opens/closes or mode changes
  useEffect(() => {
    setStep('form'); setOtp(''); setError(''); setDevCode('');
    if (timerRef.current) clearInterval(timerRef.current);
  }, [showAuthModal, authMode]);

  useEffect(() => {
    if (secondsLeft <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [secondsLeft]);

  if (!showAuthModal) return null;

  const startTimer = (ttl: number) => {
    setSecondsLeft(ttl);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSecondsLeft(s => (s <= 1 ? 0 : s - 1)), 1000);
  };

  const finish = () => {
    const newUser: UserType = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      plan: 'free',
      cvCount: 0,
    };
    // Record the registration in the server-side registry (best-effort).
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email, plan: newUser.plan }),
    }).catch(() => {});
    setUser(newUser);
    setShowAuthModal(false);
  };

  // Login: no OTP needed for existing accounts (demo)
  const handleLogin = async () => {
    if (!email || !password) { setError('E-poçt və şifrə tələb olunur'); return; }
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    finish();
  };

  // Register: request OTP then verify
  const handleSendOtp = async () => {
    if (!email || !password) { setError('E-poçt və şifrə tələb olunur'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || 'send failed');
      setStep('otp');
      startTimer(data.ttl || 180);
      if (data.devCode) setDevCode(data.devCode); // shown only when no mailer configured
    } catch {
      setError('Kod göndərilə bilmədi, yenidən cəhd edin');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length < 6) { setError('6 rəqəmli kodu daxil edin'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email, code: otp }),
      });
      const data = await res.json();
      if (!data.ok) {
        const reason = data?.reason;
        setError(reason === 'expired' ? 'Kodun müddəti bitib, yenisini istəyin'
          : reason === 'mismatch' ? 'Kod yanlışdır'
          : 'Təsdiq alınmadı');
        setLoading(false);
        return;
      }
      setLoading(false);
      finish();
    } catch {
      setError('Təsdiq alınmadı, yenidən cəhd edin');
      setLoading(false);
    }
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div
      onClick={() => setShowAuthModal(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#111118', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '2.25rem', width: '100%', maxWidth: 420,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>bir</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#7C6EF8' }}>CV</span>
          </div>

          {step === 'otp' ? (
            <>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>E-poçtu təsdiqlə</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
                <b style={{ color: '#a89ef8' }}>{email}</b> ünvanına göndərilən 6 rəqəmli kodu daxil edin
              </p>
            </>
          ) : (
            <>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                {authMode === 'register' ? 'Hesab Yarat' : 'Daxil Ol'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
                {authMode === 'register' ? 'CV yükləmək üçün qeydiyyatdan keçin' : 'Hesabınıza daxil olun'}
              </p>
            </>
          )}
        </div>

        {/* Free platform emphasis (register only) */}
        {authMode === 'register' && step === 'form' && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.35)',
            borderRadius: 10, padding: '9px 14px', marginBottom: 18,
          }}>
            <BadgeCheck size={16} style={{ color: '#10b981' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#34d399' }}>
              100% Pulsuz – kart məlumatı tələb olunmur
            </span>
          </div>
        )}

        {error && (
          <div style={{ fontSize: 12.5, color: '#f87171', marginBottom: 12, padding: '8px 12px', background: 'rgba(248,113,113,0.1)', borderRadius: 8 }}>
            {error}
          </div>
        )}

        {step === 'form' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {authMode === 'register' && (
              <Field label="Ad Soyad" icon={<User size={15} />}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Əli Əliyev" style={inputStyle} />
              </Field>
            )}
            <Field label="E-poçt" icon={<Mail size={15} />}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ali@example.com" style={inputStyle} />
            </Field>
            <Field label="Şifrə" icon={<Lock size={15} />}>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" style={inputStyle} />
            </Field>

            <button
              onClick={authMode === 'register' ? handleSendOtp : handleLogin}
              disabled={loading}
              style={{
                background: loading ? '#5a50c0' : '#7C6EF8', color: '#fff', border: 'none',
                borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer', marginTop: 4, opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? '...' : authMode === 'register' ? 'Kod göndər və davam et' : 'Daxil Ol'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
              {authMode === 'register' ? 'Hesabınız var? ' : 'Hesabınız yoxdur? '}
              <button
                onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
                style={{ background: 'none', border: 'none', color: '#7C6EF8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
              >
                {authMode === 'register' ? 'Daxil Ol' : 'Qeydiyyat'}
              </button>
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Təsdiq kodu" icon={<ShieldCheck size={15} />}>
              <input
                inputMode="numeric"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="______"
                style={{ ...inputStyle, letterSpacing: 8, textAlign: 'center', fontSize: 20, fontWeight: 700 }}
              />
            </Field>

            <div style={{ textAlign: 'center', fontSize: 13, color: secondsLeft > 0 ? 'rgba(255,255,255,0.55)' : '#f87171' }}>
              {secondsLeft > 0
                ? <>Kodun etibarlılıq müddəti: <b style={{ color: '#a89ef8' }}>{mm}:{ss}</b></>
                : 'Kodun müddəti bitdi'}
            </div>

            {devCode && (
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                (Demo: e-poçt provayderi qoşulmayıb, test kodu: <b style={{ color: '#a89ef8' }}>{devCode}</b>)
              </div>
            )}

            <button
              onClick={handleVerify}
              disabled={loading || secondsLeft <= 0}
              style={{
                background: secondsLeft <= 0 ? 'rgba(255,255,255,0.08)' : loading ? '#5a50c0' : '#7C6EF8',
                color: '#fff', border: 'none', borderRadius: 10, padding: '13px',
                fontSize: 15, fontWeight: 700, cursor: secondsLeft <= 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? '...' : 'Təsdiqlə və qeydiyyatı bitir'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setStep('form')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <ArrowLeft size={14} /> Geri
              </button>
              <button onClick={handleSendOtp} disabled={loading || secondsLeft > 0} style={{
                background: 'none', border: 'none',
                color: secondsLeft > 0 ? 'rgba(255,255,255,0.3)' : '#7C6EF8',
                cursor: secondsLeft > 0 ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600,
              }}>
                Kodu yenidən göndər
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
        <span style={{ display: 'inline-flex', color: '#a89ef8' }}>{icon}</span>{label}
      </label>
      {children}
    </div>
  );
}
