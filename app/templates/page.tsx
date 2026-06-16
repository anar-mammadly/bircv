'use client';
import Link from 'next/link';
import { CVProvider } from '@/app/store/cvStore';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import AuthModal from '@/app/components/AuthModal';
import ChatWidget from '@/app/components/ChatWidget';

// Mini CV preview components for each template style
function KompaktPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', fontSize: 6, fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* Left sidebar */}
      <div style={{ width: '38%', background: '#1e1b4b', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#7C6EF8,#a5b4fc)', margin: '0 auto 4px', border: '2px solid rgba(255,255,255,0.3)' }} />
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 7.5, textAlign: 'center', lineHeight: 1.2 }}>Əli Əliyev</div>
        <div style={{ color: '#a5b4fc', fontSize: 5.5, textAlign: 'center', marginBottom: 6 }}>Frontend Developer</div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 6 }}>
          <div style={{ color: '#7C6EF8', fontSize: 5, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>Əlaqə</div>
          {['ali@gmail.com', '+994 50 123 45 67', 'Bakı, Azərbaycan'].map(c => (
            <div key={c} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 5, marginBottom: 3 }}>• {c}</div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 6 }}>
          <div style={{ color: '#7C6EF8', fontSize: 5, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>Bacarıqlar</div>
          {['React', 'TypeScript', 'Node.js', 'CSS'].map(s => (
            <div key={s} style={{ background: 'rgba(124,110,248,0.3)', borderRadius: 3, padding: '2px 5px', color: '#a5b4fc', fontSize: 5, marginBottom: 3 }}>{s}</div>
          ))}
        </div>
      </div>
      {/* Right content */}
      <div style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <div style={{ color: '#4f46e5', fontSize: 5.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5, borderBottom: '1.5px solid #4f46e5', paddingBottom: 3 }}>İş Təcrübəsi</div>
          <div style={{ fontWeight: 700, fontSize: 6.5, color: '#111' }}>Frontend Developer</div>
          <div style={{ color: '#6b7280', fontSize: 5.5, marginBottom: 3 }}>Kapital Bank · 2022 – İndi</div>
          <div style={{ color: '#374151', fontSize: 5.5, lineHeight: 1.6 }}>• React ilə müştəri interfeysi inkişaf etdirdi{'\n'}• API inteqrasiyalarını 30% sürətləndirdi</div>
        </div>
        <div>
          <div style={{ color: '#4f46e5', fontSize: 5.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5, borderBottom: '1.5px solid #4f46e5', paddingBottom: 3 }}>Təhsil</div>
          <div style={{ fontWeight: 700, fontSize: 6.5, color: '#111' }}>BDU – Kompüter Mühəndisliyi</div>
          <div style={{ color: '#6b7280', fontSize: 5.5 }}>2018 – 2022</div>
        </div>
      </div>
    </div>
  );
}

function ModernPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontSize: 6, fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* Top header band */}
      <div style={{ background: 'linear-gradient(135deg, #7C6EF8 0%, #5b47e0 100%)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 11, letterSpacing: -0.3 }}>Əli Əliyev</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 6.5, marginTop: 2, fontWeight: 500 }}>Frontend Developer</div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 5.5, marginTop: 3 }}>ali@gmail.com · Bakı</div>
        </div>
      </div>
      <div style={{ padding: '10px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <div style={{ color: '#7C6EF8', fontSize: 5.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 }}>İş Təcrübəsi</div>
          <div style={{ fontWeight: 700, fontSize: 6.5, color: '#111' }}>Frontend Developer</div>
          <div style={{ color: '#7C6EF8', fontSize: 5.5, marginBottom: 3, fontWeight: 600 }}>Kapital Bank</div>
          <div style={{ color: '#6b7280', fontSize: 5.5, lineHeight: 1.7 }}>• React, TypeScript ilə işləyib{'\n'}• 30% performans artımı{'\n'}• 5 nəfərlik team lead</div>
          <div style={{ fontWeight: 700, fontSize: 6.5, color: '#111', marginTop: 7 }}>Junior Developer</div>
          <div style={{ color: '#7C6EF8', fontSize: 5.5, fontWeight: 600 }}>PAŞA Bank · 2020–2022</div>
        </div>
        <div>
          <div style={{ color: '#7C6EF8', fontSize: 5.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 }}>Bacarıqlar</div>
          {[['React', 90], ['TypeScript', 85], ['Node.js', 70], ['CSS/Tailwind', 90]].map(([s, p]) => (
            <div key={s} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1.5 }}>
                <span style={{ color: '#374151', fontSize: 5.5 }}>{s}</span>
                <span style={{ color: '#7C6EF8', fontSize: 5 }}>{p}%</span>
              </div>
              <div style={{ height: 3, background: '#e5e7eb', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${p}%`, background: 'linear-gradient(90deg,#7C6EF8,#a5b4fc)', borderRadius: 2 }} />
              </div>
            </div>
          ))}
          <div style={{ color: '#7C6EF8', fontSize: 5.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, marginTop: 8 }}>Təhsil</div>
          <div style={{ fontWeight: 600, fontSize: 6, color: '#111' }}>BDU – Kompüter Mühəndisliyi</div>
          <div style={{ color: '#6b7280', fontSize: 5.5 }}>2018–2022 · Bakı</div>
        </div>
      </div>
    </div>
  );
}

function MinimalPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: '16px', fontSize: 6, fontFamily: 'Georgia, serif', overflow: 'hidden' }}>
      <div style={{ borderBottom: '0.5px solid #d1d5db', paddingBottom: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#111', letterSpacing: -0.5 }}>Əli Əliyev</div>
        <div style={{ fontSize: 6.5, color: '#6b7280', marginTop: 2, fontFamily: 'Inter,sans-serif' }}>Frontend Developer · ali@gmail.com · +994 50 123 45 67 · Bakı</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#9ca3af', marginBottom: 5, fontFamily: 'Inter,sans-serif' }}>İş Təcrübəsi</div>
          <div style={{ fontWeight: 700, fontSize: 7, color: '#111', marginBottom: 1 }}>Frontend Developer</div>
          <div style={{ color: '#6b7280', fontSize: 5.5, marginBottom: 4, fontFamily: 'Inter,sans-serif' }}>Kapital Bank · 2022 – İndi · Bakı</div>
          <div style={{ color: '#374151', fontSize: 5.5, lineHeight: 1.8, fontFamily: 'Inter,sans-serif' }}>
            — React ilə müştəri interfeysi inkişaf etdirdi<br/>
            — API inteqrasiyalarını 30% sürətləndirdi<br/>
            — Komanda ilə Agile metodologiya
          </div>
          <div style={{ fontWeight: 700, fontSize: 7, color: '#111', marginTop: 7, marginBottom: 1 }}>Junior Developer</div>
          <div style={{ color: '#6b7280', fontSize: 5.5, fontFamily: 'Inter,sans-serif' }}>PAŞA Bank · 2020–2022</div>
        </div>
        <div style={{ width: '30%' }}>
          <div style={{ fontSize: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#9ca3af', marginBottom: 5, fontFamily: 'Inter,sans-serif' }}>Bacarıqlar</div>
          {['React', 'TypeScript', 'Node.js', 'Git', 'Figma'].map(s => (
            <div key={s} style={{ fontSize: 5.5, color: '#374151', borderBottom: '0.5px solid #f3f4f6', padding: '2.5px 0', fontFamily: 'Inter,sans-serif' }}>{s}</div>
          ))}
          <div style={{ fontSize: 5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#9ca3af', marginBottom: 4, marginTop: 8, fontFamily: 'Inter,sans-serif' }}>Dillər</div>
          <div style={{ fontSize: 5.5, color: '#374151', fontFamily: 'Inter,sans-serif' }}>Azərbaycan · Ana dili</div>
          <div style={{ fontSize: 5.5, color: '#374151', fontFamily: 'Inter,sans-serif' }}>İngilis · B2</div>
        </div>
      </div>
    </div>
  );
}

function BoldPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0f0f0f', fontSize: 6, fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ background: '#FFD60A', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: '#0f0f0f', border: '2px solid rgba(0,0,0,0.2)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 22, height: 22, borderRadius: 4, background: 'rgba(255,214,10,0.3)' }} />
        </div>
        <div>
          <div style={{ color: '#0f0f0f', fontWeight: 900, fontSize: 12, letterSpacing: -0.5, textTransform: 'uppercase' }}>Əli Əliyev</div>
          <div style={{ color: 'rgba(0,0,0,0.7)', fontSize: 6.5, fontWeight: 700, marginTop: 1 }}>Frontend Developer</div>
        </div>
      </div>
      <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ color: '#FFD60A', fontSize: 5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Təcrübə</div>
          <div style={{ fontWeight: 800, fontSize: 7, color: '#fff' }}>Frontend Developer</div>
          <div style={{ color: '#FFD60A', fontSize: 5.5, fontWeight: 700, marginBottom: 4 }}>Kapital Bank · 2022–İndi</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 5.5, lineHeight: 1.7 }}>
            → React ilə böyük miqyaslı app<br/>
            → TypeScript migration həyata keçirdi<br/>
            → Performansı 40% artırdı
          </div>
          <div style={{ fontWeight: 800, fontSize: 7, color: '#fff', marginTop: 7 }}>Junior Dev</div>
          <div style={{ color: '#FFD60A', fontSize: 5.5, fontWeight: 700 }}>PAŞA Bank · 2020–2022</div>
        </div>
        <div>
          <div style={{ color: '#FFD60A', fontSize: 5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Bacarıqlar</div>
          {['React / Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
              <div style={{ width: 4, height: 4, background: '#FFD60A', borderRadius: 1, flexShrink: 0 }} />
              <span style={{ color: '#fff', fontSize: 6 }}>{s}</span>
            </div>
          ))}
          <div style={{ color: '#FFD60A', fontSize: 5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 5, marginTop: 8 }}>Əlaqə</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 5.5 }}>ali@gmail.com</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 5.5 }}>+994 50 123 45 67</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 5.5 }}>Bakı, Azərbaycan</div>
        </div>
      </div>
    </div>
  );
}

function ElegantPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#faf7f4', fontSize: 6, fontFamily: 'Georgia, serif', overflow: 'hidden' }}>
      <div style={{ background: '#3d2b1f', padding: '16px', textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#c8a97e,#8b6343)', margin: '0 auto 8px', border: '2px solid rgba(200,169,126,0.5)' }} />
        <div style={{ color: '#c8a97e', fontWeight: 700, fontSize: 11, letterSpacing: 1 }}>Əli Əliyev</div>
        <div style={{ color: 'rgba(200,169,126,0.75)', fontSize: 6, marginTop: 3, fontStyle: 'italic' }}>Frontend Developer</div>
        <div style={{ color: 'rgba(200,169,126,0.55)', fontSize: 5, marginTop: 4 }}>ali@gmail.com · Bakı</div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <div style={{ height: 0.5, flex: 1, background: '#c8a97e' }} />
            <div style={{ color: '#8b6343', fontSize: 5, textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'Georgia' }}>İş Təcrübəsi</div>
            <div style={{ height: 0.5, flex: 1, background: '#c8a97e' }} />
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 7, color: '#3d2b1f', marginBottom: 1 }}>Frontend Developer</div>
        <div style={{ color: '#8b6343', fontSize: 5.5, fontStyle: 'italic', marginBottom: 4 }}>Kapital Bank · 2022 – İndi</div>
        <div style={{ color: '#5c4033', fontSize: 5.5, lineHeight: 1.8 }}>
          Müştəri interfeyslərini React ilə inkişaf etdirdi, API inteqrasiyasını optimallaşdırdı, TypeScript tətbiq etdi.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', margin: '8px 0' }}>
          <div style={{ height: 0.5, flex: 1, background: '#c8a97e' }} />
          <div style={{ color: '#8b6343', fontSize: 5, textTransform: 'uppercase', letterSpacing: 2 }}>Bacarıqlar</div>
          <div style={{ height: 0.5, flex: 1, background: '#c8a97e' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {['React', 'TypeScript', 'Node.js', 'CSS', 'Git'].map(s => (
            <span key={s} style={{ border: '0.5px solid #c8a97e', color: '#5c4033', fontSize: 5, padding: '2px 6px', borderRadius: 2 }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function KlassikPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: '16px', fontSize: 6, fontFamily: '"Times New Roman", Times, serif', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #111', paddingBottom: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', letterSpacing: 0.5 }}>ƏLİ ƏLİYEV</div>
        <div style={{ fontSize: 6, color: '#374151', marginTop: 3 }}>Frontend Developer</div>
        <div style={{ fontSize: 5.5, color: '#6b7280', marginTop: 3 }}>
          ali@gmail.com &nbsp;|&nbsp; +994 50 123 45 67 &nbsp;|&nbsp; Bakı, Azərbaycan
        </div>
      </div>
      <div style={{ marginBottom: 9 }}>
        <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#111', borderBottom: '1px solid #111', marginBottom: 5, paddingBottom: 2 }}>Peşəkar Təcrübə</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 7, color: '#111' }}>Frontend Developer, Kapital Bank</span>
          <span style={{ fontSize: 6, color: '#6b7280' }}>2022 – İndi</span>
        </div>
        <div style={{ color: '#374151', fontSize: 5.5, lineHeight: 1.8, paddingLeft: 8 }}>
          • React və TypeScript istifadə edərək müştəri tərəfi interfeys inkişaf etdirdi<br/>
          • RESTful API inteqrasiyalarını optimallaşdıraraq 30% sürət artımı əldə etdi<br/>
          • 5 nəfərlik frontend komandasına rəhbərlik etdi
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, marginBottom: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 7, color: '#111' }}>Junior Developer, PAŞA Bank</span>
          <span style={{ fontSize: 6, color: '#6b7280' }}>2020–2022</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#111', borderBottom: '1px solid #111', marginBottom: 5, paddingBottom: 2 }}>Təhsil</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: 6.5, color: '#111' }}>Bakı Dövlət Universiteti</span>
          <span style={{ fontSize: 6, color: '#6b7280' }}>2018–2022</span>
        </div>
        <div style={{ color: '#374151', fontSize: 5.5 }}>Kompüter Mühəndisliyi, Bakalavriat · GPA: 4.5/5.0</div>
      </div>
    </div>
  );
}

const previewComponents: Record<string, React.FC> = {
  kompakt: KompaktPreview,
  modern: ModernPreview,
  minimal: MinimalPreview,
  bold: BoldPreview,
  elegant: ElegantPreview,
  klassik: KlassikPreview,
};

function TemplatesInner() {
  const { lang } = useCVStore();

  const templates = [
    { id: 'kompakt', name: 'Kompakt', desc: lang === 'az' ? '2-sütunlu, çox məlumat sığır' : '2-column, fits more content', premium: false, color: '#4f46e5' },
    { id: 'modern', name: 'Modern', desc: lang === 'az' ? 'Bənövşəyi aksent, bacarıq barları' : 'Purple accent, skill bars', premium: false, color: '#7C6EF8' },
    { id: 'minimal', name: 'Minimal', desc: lang === 'az' ? 'İncə xətlər, geniş ağ sahə' : 'Thin lines, lots of whitespace', premium: false, color: '#6b7280' },
    { id: 'bold', name: 'Bold', desc: lang === 'az' ? 'Güclü tipografiya, sarı aksent' : 'Strong typography, yellow accent', premium: false, color: '#ca8a04' },
    { id: 'elegant', name: 'Elegant', desc: lang === 'az' ? 'Zərif qəhvəyi tonlar, serif' : 'Subtle brown tones, serif', premium: true, color: '#92400e' },
    { id: 'klassik', name: 'Klassik', desc: lang === 'az' ? 'Ənənəvi, Times New Roman' : 'Traditional, Times New Roman', premium: true, color: '#374151' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <AuthModal />
      <ChatWidget />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 12 }}>
            {lang === 'az' ? 'CV Şablonları' : 'CV Templates'}
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)' }}>
            {lang === 'az' ? '6 peşəkar şablon – birini seç, doldur, yüklə' : '6 professional templates – pick, fill, download'}
          </p>
        </div>

        <div className="grid-resp-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {templates.map(tpl => {
            const Preview = previewComponents[tpl.id];
            return (
              <div key={tpl.id} style={{
                background: '#111118',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = tpl.color;
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Live CV Preview */}
                <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, transform: 'scale(1)', transformOrigin: 'top left' }}>
                    <Preview />
                  </div>
                  {tpl.premium && (
                    <div style={{ position: 'absolute', top: 12, right: 12, background: '#FFD60A', color: '#0a0a0a', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 6, zIndex: 10 }}>PRO</div>
                  )}
                  {/* Subtle overlay at bottom for fade effect */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(transparent, rgba(17,17,24,0.6))', zIndex: 5 }} />
                </div>

                <div style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{tpl.name}</h3>
                    <span style={{ fontSize: 11, color: tpl.premium ? '#FFD60A' : '#059669', fontWeight: 600 }}>
                      {tpl.premium ? 'Premium' : (lang === 'az' ? 'Pulsuz' : 'Free')}
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', margin: '0 0 14px', lineHeight: 1.5 }}>{tpl.desc}</p>
                  <Link href={`/create?template=${tpl.id}`} style={{
                    display: 'block', textAlign: 'center',
                    background: tpl.premium ? 'transparent' : `${tpl.color}20`,
                    border: `1px solid ${tpl.premium ? '#FFD60A80' : tpl.color + '60'}`,
                    color: tpl.premium ? '#FFD60A' : tpl.color,
                    textDecoration: 'none', borderRadius: 8, padding: '9px',
                    fontSize: 13, fontWeight: 600
                  }}>
                    {tpl.premium
                      ? (lang === 'az' ? '👑 Premium ilə istifadə et' : '👑 Use with Premium')
                      : (lang === 'az' ? 'Bu şablonu seç →' : 'Use this template →')}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontSize: 14 }}>
            {lang === 'az' ? 'Premium şablonlar üçün aylıq abunə – 20 AZN' : 'Premium templates with monthly subscription – 20 AZN'}
          </p>
          <Link href="/create" style={{
            background: '#7C6EF8', color: '#fff', textDecoration: 'none',
            borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 700, display: 'inline-block'
          }}>
            {lang === 'az' ? 'CV Yaratmağa Başla →' : 'Start Creating CV →'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return <CVProvider><TemplatesInner /></CVProvider>;
}
