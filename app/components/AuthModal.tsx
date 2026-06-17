'use client';
import { useState, useEffect, useRef } from 'react';
import { useCVStore } from '@/app/store/cvStore';
import { User as UserType } from '@/app/types/cv';

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
  padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none',
};

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, setUser } = useCVStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [step, setStep]       = useState<'form' | 'otp'>('form');
  const [otp, setOtp]         = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [devCode, setDevCode] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setStep('form'); setOtp(''); setError(''); setDevCode(''); setPassword('');
    setFirstName(''); setLastName('');
    if (timerRef.current) clearInterval(timerRef.current);
  }, [showAuthModal, authMode]);

  useEffect(() => {
    if (secondsLeft <= 0 && timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, [secondsLeft]);

  if (!showAuthModal) return null;

  const startTimer = (ttl: number) => {
    setSecondsLeft(ttl);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSecondsLeft(s => s <= 1 ? 0 : s - 1), 1000);
  };

  const finishLogin = (userData: UserType) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  // ── Register: OTP göndər ──────────────────────────────────────────────────
  const handleSendOtp = async () => {
    if (!email || !password) { setError('Email və şifrə tələb olunur'); return; }
    if (password.length < 4) { setError('Şifrə minimum 4 simvol olmalıdır'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email }),
      });
      const data = await res.json();
      if (!data.ok) { setError(data.error || 'Xəta baş verdi'); return; }
      if (data.devCode) setDevCode(data.devCode);
      setStep('otp');
      startTimer(data.ttl || 180);
    } catch { setError('Şəbəkə xətası'); }
    finally { setLoading(false); }
  };

  // ── Register: OTP yoxla + istifadəçi yarat ───────────────────────────────
  const handleVerifyOtp = async () => {
    if (!otp) { setError('Kodu daxil edin'); return; }
    setLoading(true); setError('');
    try {
      const verRes = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email, code: otp }),
      });
      const verData = await verRes.json();
      if (!verData.ok) { setError('Yanlış və ya vaxtı keçmiş kod'); setLoading(false); return; }

      // OTP doğru — Supabase-də qeydiyyat et
      const regRes = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', email, password, name: `${firstName} ${lastName}`.trim() }),
      });
      const regData = await regRes.json();
      if (!regData.ok) { setError(regData.error || 'Qeydiyyat uğursuz'); setLoading(false); return; }
      finishLogin(regData.user);
    } catch { setError('Şəbəkə xətası'); }
    finally { setLoading(false); }
  };

  // ── Login ────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!email || !password) { setError('Email və şifrə tələb olunur'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (!data.ok) { setError(data.error || 'Giriş uğursuz'); return; }
      finishLogin(data.user);
    } catch { setError('Şəbəkə xətası'); }
    finally { setLoading(false); }
  };

  const btn: React.CSSProperties = {
    width: '100%', padding: '13px', background: '#7C6EF8', color: '#fff',
    border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer',
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
      <div style={{ background:'#111118', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32, width:'100%', maxWidth:400, margin:'0 16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h2 style={{ color:'#fff', fontSize:20, fontWeight:800, margin:0 }}>
            {step==='otp' ? 'E-poçtu təsdiqlə' : authMode==='login' ? 'Daxil ol' : 'Qeydiyyat'}
          </h2>
          <button onClick={()=>setShowAuthModal(false)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', fontSize:22, cursor:'pointer' }}>✕</button>
        </div>

        {step === 'otp' ? (
          <>
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:13, marginBottom:20 }}>
              {email} ünvanına göndərilən 6 rəqəmli kodu daxil edin
            </p>
            {devCode && (
              <div style={{ background:'rgba(255,214,10,0.1)', border:'1px solid rgba(255,214,10,0.3)', borderRadius:8, padding:'10px 14px', marginBottom:16, color:'#FFD60A', fontSize:12 }}>
                Demo: e-poçt provayderi qoşulmayıb, test kodu: <strong>{devCode}</strong>
              </div>
            )}
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456"
              style={{ ...inputStyle, fontSize:22, letterSpacing:8, textAlign:'center', marginBottom:16 }} />
            {secondsLeft > 0 && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginBottom:16, textAlign:'center' }}>Kodun etibarlılıq müddəti: {Math.floor(secondsLeft/60).toString().padStart(2,'0')}:{(secondsLeft%60).toString().padStart(2,'0')}</p>}
            {error && <p style={{ color:'#f87171', fontSize:13, marginBottom:12 }}>{error}</p>}
            <button onClick={handleVerifyOtp} disabled={loading} style={btn}>{loading ? 'Yoxlanılır...' : 'Təsdiqlə'}</button>
            <button onClick={()=>setStep('form')} style={{ ...btn, background:'transparent', border:'1px solid rgba(255,255,255,0.15)', marginTop:10, color:'rgba(255,255,255,0.6)' }}>Geri</button>
          </>
        ) : (
          <>
            {authMode === 'register' && (
              <>
                <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Ad"
                  style={{ ...inputStyle, marginBottom:12 }} />
                <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Soyad"
                  style={{ ...inputStyle, marginBottom:12 }} />
              </>
            )}
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-poçt"
              type="email" style={{ ...inputStyle, marginBottom:12 }} />
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Şifrə"
              type="password" style={{ ...inputStyle, marginBottom:16 }} />
            {error && <p style={{ color:'#f87171', fontSize:13, marginBottom:12 }}>{error}</p>}
            <button onClick={authMode==='login' ? handleLogin : handleSendOtp} disabled={loading} style={btn}>
              {loading ? 'Gözləyin...' : authMode==='login' ? 'Daxil ol' : 'Kodu göndər'}
            </button>
            <p style={{ textAlign:'center', color:'rgba(255,255,255,0.4)', fontSize:13, marginTop:16 }}>
              {authMode==='login' ? 'Hesabınız yoxdur? ' : 'Hesabınız var? '}
              <span onClick={()=>setAuthMode(authMode==='login'?'register':'login')}
                style={{ color:'#7C6EF8', cursor:'pointer', fontWeight:600 }}>
                {authMode==='login' ? 'Qeydiyyat' : 'Daxil ol'}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
