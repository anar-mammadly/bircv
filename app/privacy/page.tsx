'use client';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { SUPPORT_EMAIL } from '@/lib/config';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="t-h3 mb-2.5">{title}</h2>
      <div className="text-[0.9375rem] leading-[1.75] text-ink-2">{children}</div>
    </section>
  );
}

function PrivacyInner() {
  const { lang } = useCVStore();
  const az = lang === 'az';

  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className="section max-w-[760px] pb-20 pt-12 lg:pt-16">
        <h1 className="t-h1 mb-2">
          {az ? 'Gizlilik Siyasəti' : 'Privacy Policy'}
        </h1>
        <p className="mb-10 text-small text-muted">
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
          <div className="rounded-xl border border-primary/25 bg-primary-soft px-4 py-3.5">
            <strong className="text-primary">
              {az
                ? 'Sizin açıq icazəniz olmadan məlumatlarınız heç bir 3-cü tərəflə paylaşılmır və satılmır.'
                : 'Your data is never shared with or sold to any third party without your explicit consent.'}
            </strong>
          </div>
          <p className="mt-3">
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
          <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary hover:underline">{SUPPORT_EMAIL}</a>
        </Section>
      </div>
      <Footer />
    </div>
  );
}

export default function PrivacyPage() {
  return <PrivacyInner />;
}
