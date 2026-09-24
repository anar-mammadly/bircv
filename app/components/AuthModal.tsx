'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader2, Mail, Lock, User as UserIcon, ArrowLeft } from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import { User as UserType } from '@/app/types/cv';
import Modal from '@/app/components/ui/Modal';
import { useToast } from '@/app/components/ui/Toaster';

const S = {
  az: {
    login: 'Daxil ol', register: 'Qeydiyyat', verify: 'E-poçtu təsdiqlə', first: 'Ad', last: 'Soyad', email: 'E-poçt', pass: 'Şifrə',
    agree1: 'İstifadə Şərtləri', and: 'və', agree2: 'Gizlilik Siyasəti', agree3: 'ilə razıyam',
    sendCode: 'Kodu göndər', wait: 'Gözləyin…', noAcc: 'Hesabınız yoxdur?', hasAcc: 'Hesabınız var?',
    codeSent: 'ünvanına göndərilən 6 rəqəmli kodu daxil edin', confirm: 'Təsdiqlə', checking: 'Yoxlanılır…', back: 'Geri', valid: 'Kodun etibarlılıq müddəti',
    eReq: 'E-poçt və şifrə tələb olunur', ePass: 'Şifrə minimum 4 simvol olmalıdır', eAgree: 'Davam etmək üçün şərtlərlə razılaşmalısınız',
    eCode: 'Kodu daxil edin', eBad: 'Yanlış və ya vaxtı keçmiş kod', eNet: 'Şəbəkə xətası, yenidən cəhd edin', eSend: 'Kod göndərilə bilmədi. Bir az sonra yenidən cəhd edin.', welcome: 'Xoş gəldiniz',
  },
  en: {
    login: 'Log in', register: 'Create account', verify: 'Verify your email', first: 'First name', last: 'Last name', email: 'Email', pass: 'Password',
    agree1: 'Terms of Service', and: 'and', agree2: 'Privacy Policy', agree3: '— I agree',
    sendCode: 'Send code', wait: 'Please wait…', noAcc: "Don't have an account?", hasAcc: 'Already have an account?',
    codeSent: 'Enter the 6-digit code we sent to', confirm: 'Verify', checking: 'Checking…', back: 'Back', valid: 'Code expires in',
    eReq: 'Email and password are required', ePass: 'Password must be at least 4 characters', eAgree: 'Please accept the terms to continue',
    eCode: 'Enter the code', eBad: 'Wrong or expired code', eNet: 'Network error, please try again', eSend: 'Could not send the code. Please try again shortly.', welcome: 'Welcome',
  },
};

function Field({ icon: Icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: typeof Mail }) {
  return (
    <div className="relative">
      <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
      <input {...props} className="input pl-9" />
    </div>
  );
}

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, setUser, lang } = useCVStore();
  const s = S[lang];
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [devCode, setDevCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setStep('form'); setOtp(''); setError(''); setDevCode(''); setPassword('');
    setFirstName(''); setLastName(''); setAgreed(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [showAuthModal, authMode]);

  useEffect(() => {
    if (secondsLeft <= 0 && timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, [secondsLeft]);

  const startTimer = (ttl: number) => {
    setSecondsLeft(ttl);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSecondsLeft(x => (x <= 1 ? 0 : x - 1)), 1000);
  };

  const finishLogin = (u: UserType) => { setUser(u); setShowAuthModal(false); toast({ kind: 'success', title: `${s.welcome}, ${u.name || u.email}` }); };

  const post = async (url: string, body: object) => {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return res.json();
  };

  const handleSendOtp = async () => {
    if (!email || !password) { setError(s.eReq); return; }
    if (password.length < 4) { setError(s.ePass); return; }
    if (!agreed) { setError(s.eAgree); return; }
    setLoading(true); setError('');
    try {
      const data = await post('/api/otp', { action: 'send', email });
      if (!data.ok) { console.error('[otp]', data); setError(data.error === 'could not create code' ? s.eSend : data.error || s.eNet); return; }
      if (data.devCode) setDevCode(data.devCode);
      setStep('otp'); startTimer(data.ttl || 180);
    } catch { setError(s.eNet); } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    if (!otp) { setError(s.eCode); return; }
    setLoading(true); setError('');
    try {
      const ver = await post('/api/otp', { action: 'verify', email, code: otp });
      if (!ver.ok) { setError(s.eBad); return; }
      const reg = await post('/api/auth', { action: 'register', email, password, name: `${firstName} ${lastName}`.trim() });
      if (!reg.ok) { setError(reg.error || s.eNet); return; }
      finishLogin(reg.user);
    } catch { setError(s.eNet); } finally { setLoading(false); }
  };

  const handleLogin = async () => {
    if (!email || !password) { setError(s.eReq); return; }
    setLoading(true); setError('');
    try {
      const data = await post('/api/auth', { action: 'login', email, password });
      if (!data.ok) { setError(data.error || s.eNet); return; }
      finishLogin(data.user);
    } catch { setError(s.eNet); } finally { setLoading(false); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'otp') handleVerifyOtp(); else if (authMode === 'login') handleLogin(); else handleSendOtp();
  };

  const title = step === 'otp' ? s.verify : authMode === 'login' ? s.login : s.register;
  const disabled = loading || (step === 'form' && authMode === 'register' && !agreed);

  return (
    <Modal open={showAuthModal} onClose={() => setShowAuthModal(false)} title={title}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        {step === 'otp' ? (
          <>
            <p className="text-small text-ink-2"><span className="font-medium text-ink">{email}</span> — {s.codeSent}</p>
            {devCode && (
              <div className="rounded-control bg-warning-soft px-3 py-2 text-small text-warning">
                Demo: e-poçt provayderi qoşulmayıb, test kodu: <strong>{devCode}</strong>
              </div>
            )}
            <input data-autofocus value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" inputMode="numeric" autoComplete="one-time-code"
              aria-label="Code" className="input h-14 text-center font-display text-2xl tracking-[0.5em]" />
            {secondsLeft > 0 && (
              <p className="text-center text-caption text-muted">
                {s.valid} {String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:{String(secondsLeft % 60).padStart(2, '0')}
              </p>
            )}
          </>
        ) : (
          <>
            {authMode === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <Field icon={UserIcon} value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={s.first} aria-label={s.first} autoComplete="given-name" />
                <Field icon={UserIcon} value={lastName} onChange={e => setLastName(e.target.value)} placeholder={s.last} aria-label={s.last} autoComplete="family-name" />
              </div>
            )}
            <Field icon={Mail} value={email} onChange={e => setEmail(e.target.value)} placeholder={s.email} aria-label={s.email} type="email" autoComplete="email" />
            <Field icon={Lock} value={password} onChange={e => setPassword(e.target.value)} placeholder={s.pass} aria-label={s.pass} type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} />
            {authMode === 'register' && (
              <label className="flex cursor-pointer items-start gap-2.5 text-small text-ink-2">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--primary))]" />
                <span>
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-2 hover:underline">{s.agree1}</a> {s.and}{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-2 hover:underline">{s.agree2}</a> {s.agree3}
                </span>
              </label>
            )}
          </>
        )}

        {error && <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-small text-danger">{error}</p>}

        <button type="submit" disabled={disabled} className="btn-primary btn-lg mt-1 w-full">
          {loading && <Loader2 size={16} className="spin" />}
          {loading ? (step === 'otp' ? s.checking : s.wait) : step === 'otp' ? s.confirm : authMode === 'login' ? s.login : s.sendCode}
        </button>

        {step === 'otp' ? (
          <button type="button" className="btn-ghost w-full" onClick={() => setStep('form')}><ArrowLeft size={15} />{s.back}</button>
        ) : (
          <p className="pt-1 text-center text-small text-ink-2">
            {authMode === 'login' ? s.noAcc : s.hasAcc}{' '}
            <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="font-semibold text-primary hover:underline">
              {authMode === 'login' ? s.register : s.login}
            </button>
          </p>
        )}
      </form>
    </Modal>
  );
}
