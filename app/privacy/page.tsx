'use client';
import { CVProvider, useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import AuthModal from '@/app/components/AuthModal';
import ChatWidget from '@/app/components/ChatWidget';
import { SUPPORT_EMAIL } from '@/lib/config';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{title}</h2>
      <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function PrivacyInner() {
  const { lang } = useCVStore();
  const az = lang === 'az';

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <AuthModal />
      <ChatWidget />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          {az ? 'Gizlilik Siyasəti' : 'Privacy Policy'}
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
          {az ? 'Son yenilənmə: 2026' : 'Last updated: 2026'}
        </p>

        <Section title={az ? '1. Hansı məlumatları toplayırıq' : '1. What information we collect'}>
          {az ? (
            <>
              BirCV-dən istifadə etdiyiniz zaman aşağıdaki məlumatları topluyuruq: ad, soyad, e-poçt ünvanı,
              şifrənin şifrələnmiş forması və CV yaratmaq üçün daxil etdiyiniz məlumatlar (iş təcrübəsi, təhsil,
              bacarıqlar, fotoşəkil və s.). Bu məlumatlar yalnız xidmətin işləməsi üçün lazım olan həcmdə toplanır.
            </>
          ) : (
            <>
              When you use BirCV, we collect: your name, email address, an encrypted form of your password, and
              the information you enter to build your CV (work experience, education, skills, photo, etc.). We
              only collect what is necessary for the service to function.
            </>
          )}
        </Section>

        <Section title={az ? '2. Məlumatlardan necə istifadə edirik' : '2. How we use your information'}>
          {az
            ? 'Topladığımız məlumatlar hesabınızı idarə etmək, CV-lərinizi saxlamaq, PDF generasiya etmək, AI vasitəsilə mətn təklifləri vermək və sizinlə əlaqə saxlamaq (məsələn dəstək sualları və ya OTP təsdiq kodları) üçün istifadə olunur.'
            : 'The information we collect is used to manage your account, store your CVs, generate PDFs, provide AI-powered text suggestions, and communicate with you (e.g. support requests or OTP verification codes).'}
        </Section>

        <Section title={az ? '3. Məlumatların 3-cü tərəflərlə paylaşılması' : '3. Sharing data with third parties'}>
          <div style={{ background: 'rgba(124,110,248,0.08)', border: '1px solid rgba(124,110,248,0.25)', borderRadius: 10, padding: '14px 16px' }}>
            <strong style={{ color: '#a89ef8' }}>
              {az
                ? 'Sizin açıq icazəniz olmadan məlumatlarınız heç bir 3-cü tərəflə paylaşılmır və satılmır.'
                : 'Your data is never shared with or sold to any third party without your explicit consent.'}
            </strong>
          </div>
          <p style={{ marginTop: 12 }}>
            {az
              ? 'Şəxsi məlumatlarınız tam konfidensial saxlanılır və kənar şəxslərə ötürülmür.'
              : 'Your personal data is kept fully confidential and is not disclosed to outside parties.'}
          </p>
        </Section>

        <Section title={az ? '4. Məlumatların saxlanması' : '4. Data storage'}>
          {az
            ? 'Məlumatlarınız şifrələnmiş bağlantılar üzərindən təhlükəsiz buludda saxlanılır. Hesabınızı sildikdə, məlumatlarınız sistemdən silinir.'
            : 'Your data is stored securely in the cloud over encrypted connections. If you delete your account, your data is removed from our systems.'}
        </Section>

        <Section title={az ? '5. Sizin hüquqlarınız' : '5. Your rights'}>
          {az
            ? 'İstənilən vaxt məlumatlarınıza çıxış əldə etmək, onları düzəltmək və ya tamamilə silinməsini tələb etmək hüququnuz var. Bunun üçün bizimlə əlaqə saxlamağınız kifayətdir.'
            : 'You have the right to access, correct, or request full deletion of your data at any time. Simply contact us to do so.'}
        </Section>

        <Section title={az ? '6. Cookie və yerli yaddaş' : '6. Cookies & local storage'}>
          {az
            ? 'Sayt sizin seçimlərinizi (dil, tema) və hesab sessiyanızı xatırlamaq üçün brauzerinizin yerli yaddaşından (localStorage) istifadə edir. Bu, izləmə məqsədli reklam cookie-ləri deyil.'
            : 'The site uses your browser\'s local storage to remember your preferences (language, theme) and account session. This is not used for advertising or tracking purposes.'}
        </Section>

        <Section title={az ? '7. Bizimlə əlaqə' : '7. Contact us'}>
          {az ? 'Gizlilik siyasəti ilə bağlı suallarınız üçün: ' : 'For any privacy-related questions: '}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#7C6EF8', textDecoration: 'none', fontWeight: 600 }}>{SUPPORT_EMAIL}</a>
        </Section>
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return <CVProvider><PrivacyInner /></CVProvider>;
}
