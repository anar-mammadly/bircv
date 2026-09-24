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

function TermsInner() {
  const { lang } = useCVStore();
  const az = lang === 'az';

  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className="section max-w-[760px] pb-20 pt-12 lg:pt-16">
        <h1 className="t-h1 mb-2">
          {az ? 'İstifadə Şərtləri' : 'Terms of Service'}
        </h1>
        <p className="mb-10 text-small text-muted">
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
          <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary hover:underline">{SUPPORT_EMAIL}</a>
        </Section>
      </div>
      <Footer />
    </div>
  );
}

export default function TermsPage() {
  return <TermsInner />;
}
