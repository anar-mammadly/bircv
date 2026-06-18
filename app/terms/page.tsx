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

function TermsInner() {
  const { lang } = useCVStore();
  const az = lang === 'az';

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <AuthModal />
      <ChatWidget />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          {az ? 'İstifadə Şərtləri' : 'Terms of Service'}
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
          {az ? 'Son yenilənmə: 2026' : 'Last updated: 2026'}
        </p>

        <Section title={az ? '1. Xidmətin təsviri' : '1. Description of service'}>
          {az
            ? 'BirCV süni intellekt vasitəsilə peşəkar CV hazırlamağa imkan verən onlayn platformadır. Platformadan istifadə edərək siz bu şərtləri qəbul etmiş sayılırsınız.'
            : 'BirCV is an online platform that uses AI to help you create professional CVs. By using the platform, you agree to these terms.'}
        </Section>

        <Section title={az ? '2. Hesab yaratma' : '2. Account registration'}>
          {az
            ? 'Hesabınızın təhlükəsizliyinə (şifrənizin gizliliyinə) görə özünüz məsuliyyət daşıyırsınız. Şübhəli fəaliyyət gördükdə bizimlə əlaqə saxlayın.'
            : 'You are responsible for the security of your account (keeping your password confidential). Contact us if you notice any suspicious activity.'}
        </Section>

        <Section title={az ? '3. Pulsuz və ödənişli planlar' : '3. Free and paid plans'}>
          {az
            ? 'BirCV pulsuz plan (məhdud sayda CV və şablon) və Premium/HR ödənişli planlar təklif edir. Ödənişli xidmətlərin qiymətləri Qiymətlər səhifəsində göstərilir və əvvəlcədən bildirişlə dəyişdirilə bilər.'
            : 'BirCV offers a free plan (limited CVs and templates) and paid Premium/HR plans. Prices for paid services are shown on the Pricing page and may change with prior notice.'}
        </Section>

        <Section title={az ? '4. Ödənişlərin geri qaytarılması' : '4. Refunds'}>
          {az
            ? 'Bir dəfəlik xidmətlər (HR konsultasiyası, CV yazımı və s.) göstərildikdən sonra geri qaytarılmır. Premium abunəliyi istənilən vaxt ləğv edə bilərsiniz, ləğv etdikdə cari dövrün sonuna qədər xidmətdən istifadə davam edir.'
            : 'One-time services (HR consultation, CV writing, etc.) are non-refundable once delivered. You may cancel your Premium subscription at any time; access continues until the end of the current billing period.'}
        </Section>

        <Section title={az ? '5. İstifadəçinin məsuliyyəti' : '5. User responsibilities'}>
          {az
            ? 'CV-yə daxil etdiyiniz məlumatların düzgünlüyünə görə siz məsuliyyət daşıyırsınız. Platformadan qanunsuz, yanıltıcı və ya başqasının hüquqlarını pozan məzmun üçün istifadə etmək qadağandır.'
            : 'You are responsible for the accuracy of the information you enter into your CV. You may not use the platform for unlawful, misleading content, or content that infringes on others\' rights.'}
        </Section>

        <Section title={az ? '6. Süni intellekt funksiyaları' : '6. AI features'}>
          {az
            ? 'AI vasitəsilə yaradılan mətn təklifləri yalnız köməkçi xarakter daşıyır. Yaradılan mətnin düzgünlüyünü və faktiki dəqiqliyini yoxlamaq istifadəçinin öhdəliyidir.'
            : 'AI-generated text suggestions are assistive in nature only. It is the user\'s responsibility to verify the accuracy and factual correctness of the generated text.'}
        </Section>

        <Section title={az ? '7. Xidmətin dayandırılması' : '7. Service termination'}>
          {az
            ? 'Bu şərtləri pozan hesablar xəbərdarlıq edilmədən bloklana və ya silinə bilər. Biz xidməti istənilən vaxt yeniləmək, dəyişdirmək və ya müvəqqəti dayandırmaq hüququnu özümüzdə saxlayırıq.'
            : 'Accounts that violate these terms may be blocked or deleted without prior warning. We reserve the right to update, modify, or temporarily suspend the service at any time.'}
        </Section>

        <Section title={az ? '8. Şərtlərə dəyişiklik' : '8. Changes to these terms'}>
          {az
            ? 'Bu şərtlər zaman zaman yenilənə bilər. Əhəmiyyətli dəyişikliklər olduqda saytda və ya e-poçt vasitəsilə sizə bildiriş ediləcək.'
            : 'These terms may be updated from time to time. We will notify you of significant changes via the site or by email.'}
        </Section>

        <Section title={az ? '9. Bizimlə əlaqə' : '9. Contact us'}>
          {az ? 'İstifadə şərtləri ilə bağlı suallarınız üçün: ' : 'For any questions about these terms: '}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#7C6EF8', textDecoration: 'none', fontWeight: 600 }}>{SUPPORT_EMAIL}</a>
        </Section>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return <CVProvider><TermsInner /></CVProvider>;
}
