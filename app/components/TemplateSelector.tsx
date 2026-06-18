'use client';
import React from 'react';
import { useCVStore } from '@/app/store/cvStore';
import { TemplateId } from '@/app/types/cv';
import { Crown, ChevronLeft, ChevronRight } from 'lucide-react';

const TEMPLATES: { id: TemplateId; name: string; premium: boolean; color: string }[] = [
  { id: 'kompakt',  name: 'Kompakt',  premium: false, color: '#4f46e5' },
  { id: 'modern',   name: 'Modern',   premium: false, color: '#7C6EF8' },
  { id: 'minimal',  name: 'Minimal',  premium: false, color: '#6b7280' },
  { id: 'bold',     name: 'Bold',     premium: false, color: '#ca8a04' },
  { id: 'designer', name: 'Designer', premium: false, color: '#6366f1' },
  { id: 'header',   name: 'Header',   premium: false, color: '#0284c7' },
  { id: 'elegant',  name: 'Elegant',  premium: true,  color: '#92400e' },
  { id: 'klassik',  name: 'Klassik',  premium: true,  color: '#374151' },
  { id: 'executive',name: 'Executive',premium: true,  color: '#1e2a3a' },
];

function KompaktThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="76" fill="#f0f0f8"/>
      <rect x="5" y="5" width="12" height="12" rx="3" fill="#c7c4f0"/>
      <rect x="4" y="21" width="14" height="2.5" rx="1" fill="#4f46e5"/>
      <rect x="4" y="25" width="10" height="1.5" rx="1" fill="#a0a0c8"/>
      <rect x="4" y="31" width="14" height="1.2" rx="0.6" fill="#c7c4f0"/>
      <rect x="4" y="33.5" width="11" height="1.2" rx="0.6" fill="#c7c4f0"/>
      <rect x="4" y="36" width="13" height="1.2" rx="0.6" fill="#c7c4f0"/>
      <rect x="4" y="42" width="6" height="3" rx="1.5" fill="#e0deff"/>
      <rect x="12" y="42" width="6" height="3" rx="1.5" fill="#e0deff"/>
      <rect x="4" y="46.5" width="8" height="3" rx="1.5" fill="#e0deff"/>
      <rect width="38" height="76" x="22" fill="#fff"/>
      <rect x="26" y="8" width="18" height="1.8" rx="0.9" fill="#4f46e5"/>
      <rect x="26" y="14" width="22" height="2" rx="1" fill="#1a1a2e"/>
      <rect x="26" y="17.5" width="16" height="1.5" rx="0.75" fill="#a0a0b8"/>
      <rect x="26" y="20.5" width="28" height="1.2" rx="0.6" fill="#d1d5db"/>
      <rect x="26" y="22.5" width="24" height="1.2" rx="0.6" fill="#d1d5db"/>
      <rect x="26" y="30" width="20" height="2" rx="1" fill="#1a1a2e"/>
      <rect x="26" y="33.5" width="14" height="1.5" rx="0.75" fill="#a0a0b8"/>
      <rect x="26" y="36.5" width="28" height="1.2" rx="0.6" fill="#d1d5db"/>
    </svg>
  );
}

function ModernThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="22" fill="#7C6EF8"/>
      <circle cx="50" cy="11" r="7" fill="rgba(255,255,255,0.25)"/>
      <circle cx="50" cy="11" r="4" fill="rgba(255,255,255,0.4)"/>
      <rect x="6" y="6" width="24" height="3" rx="1.5" fill="#fff"/>
      <rect x="6" y="11" width="16" height="1.8" rx="0.9" fill="rgba(255,255,255,0.7)"/>
      <rect x="6" y="15" width="20" height="1.4" rx="0.7" fill="rgba(255,255,255,0.5)"/>
      <rect width="60" height="54" y="22" fill="#fff"/>
      <rect x="6" y="27" width="20" height="1.8" rx="0.9" fill="#7C6EF8"/>
      <rect x="9" y="33" width="18" height="1.8" rx="0.9" fill="#1a1a2e"/>
      <rect x="9" y="36" width="12" height="1.3" rx="0.65" fill="#7C6EF8"/>
      <rect x="9" y="38.5" width="42" height="1.1" rx="0.55" fill="#d1d5db"/>
      <rect x="9" y="40.2" width="38" height="1.1" rx="0.55" fill="#d1d5db"/>
      <rect x="6" y="49" width="22" height="1.5" rx="0.75" fill="#7C6EF8"/>
      <rect x="6" y="54" width="15" height="1.5" rx="0.75" fill="#4b5563"/>
      <rect x="34" y="49" width="22" height="1.5" rx="0.75" fill="#7C6EF8"/>
      <rect x="34" y="54" width="8" height="3" rx="1.5" fill="#f0eeff"/>
      <rect x="43.5" y="54" width="8" height="3" rx="1.5" fill="#f0eeff"/>
    </svg>
  );
}

function MinimalThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="76" fill="#fff"/>
      <rect x="6" y="9" width="28" height="3.5" rx="1" fill="#111"/>
      <rect x="6" y="14" width="18" height="1.5" rx="0.75" fill="#6b7280"/>
      <rect x="6" y="17" width="36" height="1" rx="0.5" fill="#9ca3af"/>
      <rect x="6" y="20" width="48" height="0.5" fill="#d1d5db"/>
      <rect x="6" y="24" width="14" height="1.5" rx="0.75" fill="#9ca3af"/>
      <rect x="16" y="27" width="18" height="1.8" rx="0.9" fill="#111"/>
      <rect x="16" y="30" width="12" height="1.2" rx="0.6" fill="#6b7280"/>
      <rect x="16" y="32.5" width="36" height="1.1" rx="0.55" fill="#d1d5db"/>
      <rect x="16" y="34.2" width="30" height="1.1" rx="0.55" fill="#d1d5db"/>
      <rect x="16" y="38" width="16" height="1.8" rx="0.9" fill="#111"/>
      <rect x="6" y="50" width="14" height="1.5" rx="0.75" fill="#9ca3af"/>
      <rect x="6" y="53" width="20" height="1.5" rx="0.75" fill="#111"/>
      <rect x="34" y="50" width="14" height="1.5" rx="0.75" fill="#9ca3af"/>
      <rect x="34" y="53" width="10" height="1.2" rx="0.6" fill="#374151"/>
    </svg>
  );
}

function BoldThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="76" fill="#fff"/>
      <rect width="60" height="24" fill="#0a0a0a"/>
      <circle cx="50" cy="12" r="6" fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="0.8"/>
      <rect x="6" y="6" width="22" height="3.5" rx="1" fill="#fff"/>
      <rect x="6" y="11" width="18" height="3.5" rx="1" fill="#FFD60A"/>
      <rect x="6" y="29" width="20" height="2" rx="0.5" fill="#0a0a0a"/>
      <rect x="6" y="35" width="2" height="18" rx="1" fill="#FFD60A"/>
      <rect x="10" y="35" width="18" height="2" rx="1" fill="#0a0a0a"/>
      <rect x="10" y="38.5" width="12" height="1.5" rx="0.75" fill="#6b7280"/>
      <rect x="10" y="41" width="38" height="1.2" rx="0.6" fill="#d1d5db"/>
      <rect x="6" y="62" width="9" height="3.5" rx="1.5" fill="#FFD60A"/>
      <rect x="17" y="62" width="9" height="3.5" rx="1.5" fill="#FFD60A"/>
      <rect x="28" y="62" width="9" height="3.5" rx="1.5" fill="#FFD60A"/>
    </svg>
  );
}

function ElegantThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="76" fill="#fafaf8"/>
      <circle cx="30" cy="10" r="6" fill="#c8a97e" opacity="0.5"/>
      <circle cx="30" cy="10" r="3.5" fill="#c8a97e" opacity="0.8"/>
      <rect x="12" y="19" width="36" height="2.5" rx="1.25" fill="#1a1a1a"/>
      <rect x="18" y="23" width="24" height="1.5" rx="0.75" fill="#8a7f6a"/>
      <rect x="6" y="30" width="48" height="0.4" fill="#c8a97e"/>
      <rect x="27" y="33" width="0.4" height="40" fill="#d4cfc0"/>
      <rect x="6" y="34" width="14" height="1.5" rx="0.75" fill="#8a7f6a"/>
      <rect x="6" y="38.5" width="16" height="1.3" rx="0.65" fill="#3d2b1f"/>
      <rect x="31" y="34" width="16" height="1.5" rx="0.75" fill="#8a7f6a"/>
      <rect x="31" y="39" width="18" height="2" rx="1" fill="#2d2d2d"/>
    </svg>
  );
}

function KlassikThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="76" fill="#fff"/>
      <rect x="10" y="6" width="40" height="3.5" rx="1" fill="#111"/>
      <rect x="18" y="11" width="24" height="1.5" rx="0.75" fill="#444"/>
      <rect x="6" y="17" width="48" height="1.2" fill="#111"/>
      <rect x="6" y="28" width="26" height="1.5" rx="0.75" fill="#111"/>
      <rect x="6" y="30.5" width="48" height="0.6" fill="#aaa"/>
      <rect x="6" y="33" width="24" height="1.8" rx="0.9" fill="#111"/>
      <rect x="6" y="36" width="16" height="1.2" rx="0.6" fill="#6b7280"/>
      <rect x="6" y="38.5" width="46" height="1.1" rx="0.55" fill="#d1d5db"/>
      <rect x="6" y="47" width="18" height="1.5" rx="0.75" fill="#111"/>
      <rect x="6" y="49.5" width="24" height="0.6" fill="#aaa"/>
    </svg>
  );
}

function DesignerThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      {/* Left sidebar white */}
      <rect width="22" height="76" fill="#fff"/>
      {/* Photo area */}
      <rect x="2" y="3" width="18" height="16" rx="4" fill="#e8e6ff"/>
      <circle cx="11" cy="9" r="4" fill="#b8b0ff"/>
      {/* Name lines */}
      <rect x="2" y="22" width="16" height="2.5" rx="1" fill="#1a1a2e"/>
      <rect x="2" y="26" width="12" height="1.5" rx="0.75" fill="#6c63ff"/>
      {/* Contact icons */}
      <rect x="2" y="31" width="5" height="5" rx="1.5" fill="#f0eeff"/>
      <rect x="8.5" y="33" width="11" height="1" rx="0.5" fill="#d1d5db"/>
      <rect x="2" y="38" width="5" height="5" rx="1.5" fill="#f0eeff"/>
      <rect x="8.5" y="40" width="9" height="1" rx="0.5" fill="#d1d5db"/>
      <rect x="2" y="45" width="5" height="5" rx="1.5" fill="#f0eeff"/>
      <rect x="8.5" y="47" width="11" height="1" rx="0.5" fill="#d1d5db"/>
      {/* Right content area */}
      <rect x="22" width="38" height="76" fill="#f8f9ff"/>
      {/* Exp cards */}
      <rect x="24" y="4" width="34" height="14" rx="3" fill="#fff"/>
      <rect x="27" y="7" width="8" height="8" rx="2" fill="#e8e6ff"/>
      <rect x="37" y="7" width="14" height="2" rx="1" fill="#9ca3af"/>
      <rect x="37" y="11" width="10" height="2" rx="1" fill="#1a1a2e"/>
      <rect x="24" y="20" width="34" height="14" rx="3" fill="#fff"/>
      <rect x="27" y="23" width="8" height="8" rx="2" fill="#e8e6ff"/>
      <rect x="37" y="23" width="14" height="2" rx="1" fill="#9ca3af"/>
      <rect x="37" y="27" width="10" height="2" rx="1" fill="#1a1a2e"/>
      {/* Skill chips */}
      <rect x="24" y="38" width="34" height="8" rx="2" fill="#fff"/>
      <rect x="26" y="40" width="8" height="4" rx="2" fill="#e8e6ff"/>
      <rect x="36" y="40" width="8" height="4" rx="2" fill="#e8e6ff"/>
      <rect x="46" y="40" width="8" height="4" rx="2" fill="#e8e6ff"/>
      {/* Edu cards */}
      <rect x="24" y="49" width="15" height="12" rx="3" fill="#fff"/>
      <rect x="26" y="51" width="7" height="7" rx="2" fill="#e8e6ff"/>
      <rect x="24" y="63" width="15" height="1.5" rx="0.75" fill="#d1d5db"/>
      <rect x="41" y="49" width="15" height="12" rx="3" fill="#fff"/>
      <rect x="43" y="51" width="7" height="7" rx="2" fill="#e8e6ff"/>
    </svg>
  );
}

function ExecutiveThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="76" fill="#1e2a3a"/>
      <circle cx="10" cy="12" r="7" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
      <rect x="3" y="23" width="14" height="1.2" rx="0.6" fill="rgba(255,255,255,0.6)"/>
      <rect x="3" y="25.5" width="10" height="1" rx="0.5" fill="rgba(255,255,255,0.35)"/>
      <rect x="3" y="30" width="14" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
      <rect x="3" y="32" width="10" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
      <rect x="3" y="34" width="12" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
      <rect x="3" y="41" width="14" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
      <rect x="3" y="43" width="10" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
      <rect x="3" y="45" width="8" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
      <rect x="20" width="40" height="76" fill="#fff"/>
      <rect x="20" width="40" height="18" fill="#1e2a3a"/>
      <rect x="23" y="5" width="22" height="3" rx="1" fill="#fff"/>
      <rect x="23" y="10" width="14" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
      <rect x="23" y="22" width="34" height="0.8" fill="#1e2a3a"/>
      <circle cx="25" cy="28" r="3" fill="none" stroke="#1e2a3a" strokeWidth="1.2"/>
      <rect x="30" y="26" width="18" height="1.5" rx="0.75" fill="#1e2a3a"/>
      <rect x="30" y="29" width="12" height="1" rx="0.5" fill="#888"/>
      <rect x="30" y="32" width="22" height="1" rx="0.5" fill="#ccc"/>
      <circle cx="25" cy="40" r="3" fill="none" stroke="#1e2a3a" strokeWidth="1.2"/>
      <rect x="30" y="38" width="16" height="1.5" rx="0.75" fill="#1e2a3a"/>
      <rect x="30" y="41" width="10" height="1" rx="0.5" fill="#888"/>
      <rect x="30" y="44" width="22" height="1" rx="0.5" fill="#ccc"/>
      <circle cx="25" cy="52" r="3" fill="none" stroke="#1e2a3a" strokeWidth="1.2"/>
      <rect x="30" y="50" width="14" height="1.5" rx="0.75" fill="#1e2a3a"/>
      <rect x="30" y="53" width="10" height="1" rx="0.5" fill="#888"/>
    </svg>
  );
}

function HeaderThumb() {
  return (
    <svg viewBox="0 0 60 76" width="60" height="76" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="76" fill="#fff"/>
      <rect width="60" height="18" fill="#1a1a2e"/>
      <circle cx="11" cy="9" r="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
      <rect x="20" y="4" width="20" height="3" rx="1" fill="#fff"/>
      <rect x="20" y="9" width="13" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
      <rect x="3" y="20" width="54" height="6" fill="#f5f5f5"/>
      <rect x="5" y="22" width="12" height="1.2" rx="0.6" fill="#888"/>
      <rect x="22" y="22" width="14" height="1.2" rx="0.6" fill="#888"/>
      <rect x="41" y="22" width="12" height="1.2" rx="0.6" fill="#888"/>
      <rect x="3" y="27" width="23" height="49" fill="#fff"/>
      <rect x="26" y="27" width="34" height="49" fill="#fff"/>
      <rect x="26" y="27" width="0.8" height="49" fill="#e5e5e5"/>
      <rect x="5" y="31" width="12" height="1.2" rx="0.6" fill="#1a1a2e"/>
      <rect x="5" y="33.5" width="19" height="0.8" fill="#1a1a2e"/>
      <rect x="5" y="36" width="16" height="1.2" rx="0.6" fill="#555"/>
      <rect x="5" y="38" width="12" height="1" rx="0.5" fill="#888"/>
      <rect x="5" y="40" width="14" height="1" rx="0.5" fill="#888"/>
      <rect x="5" y="47" width="12" height="1.2" rx="0.6" fill="#1a1a2e"/>
      <rect x="5" y="49.5" width="19" height="0.8" fill="#1a1a2e"/>
      <rect x="5" y="52" width="10" height="1" rx="0.5" fill="#555"/>
      <rect x="5" y="54" width="12" height="1" rx="0.5" fill="#555"/>
      <rect x="5" y="56" width="8" height="1" rx="0.5" fill="#555"/>
      <rect x="28" y="31" width="13" height="1.2" rx="0.6" fill="#1a1a2e"/>
      <rect x="28" y="33.5" width="30" height="0.8" fill="#1a1a2e"/>
      <circle cx="30" cy="38" r="2.5" fill="none" stroke="#1a1a2e" strokeWidth="1"/>
      <rect x="35" y="36" width="16" height="1.5" rx="0.75" fill="#1a1a2e"/>
      <rect x="35" y="39" width="10" height="1" rx="0.5" fill="#888"/>
      <rect x="35" y="42" width="22" height="1" rx="0.5" fill="#ccc"/>
      <circle cx="30" cy="49" r="2.5" fill="none" stroke="#1a1a2e" strokeWidth="1"/>
      <rect x="35" y="47" width="14" height="1.5" rx="0.75" fill="#1a1a2e"/>
      <rect x="35" y="50" width="10" height="1" rx="0.5" fill="#888"/>
      <rect x="35" y="53" width="20" height="1" rx="0.5" fill="#ccc"/>
    </svg>
  );
}

const THUMBS: Record<TemplateId, React.FC> = {
  kompakt:  KompaktThumb,
  modern:   ModernThumb,
  minimal:  MinimalThumb,
  bold:     BoldThumb,
  elegant:  ElegantThumb,
  klassik:  KlassikThumb,
  designer:  DesignerThumb,
  executive: ExecutiveThumb,
  header:    HeaderThumb,
};

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate, user } = useCVStore();

  const [premiumModal, setPremiumModal] = React.useState(false);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', updateScrollState); ro.disconnect(); };
  }, [updateScrollState]);

  const scrollByCards = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  };

  const handleSelect = (tpl: typeof TEMPLATES[0]) => {
    if (tpl.premium && (!user || (user.plan !== 'premium' && user.plan !== 'admin'))) {
      setSelectedTemplate(tpl.id); // preview göstər
      setPremiumModal(true);        // modal aç
      return;
    }
    setSelectedTemplate(tpl.id);
  };

  return (
    <>
    <div style={{ position: 'relative' }}>
      {canScrollLeft && (
        <button
          aria-label="previous templates"
          onClick={() => scrollByCards(-1)}
          style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
            width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(17,17,24,0.85)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <ChevronLeft size={16} />
        </button>
      )}
      {canScrollRight && (
        <button
          aria-label="next templates"
          onClick={() => scrollByCards(1)}
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
            width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(17,17,24,0.85)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <ChevronRight size={16} />
        </button>
      )}
    <div ref={scrollerRef} style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 0 12px' }} className="scrollbar-hide">
      {TEMPLATES.map(tpl => {
        const Thumb = THUMBS[tpl.id];
        const active = selectedTemplate === tpl.id;
        const isDesigner = tpl.id === 'designer';
        return (
          <button
            key={tpl.id}
            onClick={() => handleSelect(tpl)}
            style={{
              flexShrink: 0, width: 82,
              border: active ? `2px solid ${tpl.color}` : isDesigner ? '1.5px solid rgba(108,99,255,0.3)' : '1.5px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              background: active ? `${tpl.color}18` : isDesigner ? 'rgba(108,99,255,0.05)' : 'rgba(255,255,255,0.03)',
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', padding: '8px 6px 7px', gap: 6,
              transition: 'all 0.18s', position: 'relative',
            }}
          >
            {tpl.premium && (
              <div style={{
                position: 'absolute', top: -7, right: -7,
                background: isDesigner ? 'linear-gradient(135deg,#6c63ff,#a89ef8)' : '#FFD60A',
                color: isDesigner ? '#fff' : '#0a0a0a',
                fontSize: 8, fontWeight: 800, padding: '2px 5px', borderRadius: 4, letterSpacing: 0.5
              }}>PRO</div>
            )}
            <div style={{
              border: active ? `1.5px solid ${tpl.color}` : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 5, overflow: 'hidden', lineHeight: 0,
              boxShadow: active ? `0 0 8px ${tpl.color}40` : '0 2px 6px rgba(0,0,0,0.3)',
              transition: 'all 0.18s',
            }}>
              <Thumb />
            </div>
            <span style={{
              fontSize: 11,
              color: active ? tpl.color : isDesigner ? 'rgba(108,99,255,0.8)' : 'rgba(255,255,255,0.55)',
              fontWeight: active ? 700 : 500,
            }}>{tpl.name}</span>
          </button>
        );
      })}
    </div>
    </div>

    {/* Premium Modal */}
    {premiumModal && (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, backdropFilter: 'blur(4px)'
      }} onClick={() => setPremiumModal(false)}>
        <div style={{
          background: '#111118', border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: 20, padding: '32px 28px', maxWidth: 340, width: '90%',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }} onClick={e => e.stopPropagation()}>
          {/* Crown icon */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}><Crown size={40} style={{ color: '#6c63ff' }} /></div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
              Premium Şablon
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Bu şablon önizlənə bilər, lakin yükləmək üçün Premium lazımdır.
            </div>
          </div>

          {/* Price */}
          <div style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 18, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#6c63ff' }}>20 AZN</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>/ aylıq • istənilən vaxt ləğv et</div>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {['Bütün Premium şablonlar', 'Limitsiz PDF yükləmə', 'LinkedIn inteqrasiyası', 'Prioritet dəstək'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: '#6c63ff', fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={() => {
              fetch('/api/subscribe', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user?.email || 'guest', plan: 'premium' }),
              }).catch(() => {});
              alert('Premium abunəlik üçün ödəniş səhifəsinə yönləndirilirsiniz – 20 AZN/ay');
            }}
            style={{
              width: '100%', background: 'linear-gradient(135deg,#6c63ff,#a89ef8)',
              border: 'none', borderRadius: 12, padding: '13px',
              color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}>
            <Crown size={16} /> Premium Al – 20 AZN/ay
          </button>
          <button onClick={() => setPremiumModal(false)} style={{
            width: '100%', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '11px',
            color: 'rgba(255,255,255,0.45)', fontSize: 13, cursor: 'pointer'
          }}>
            Bağla — Önizləməyə bax
          </button>
        </div>
      </div>
    )}
    </>
  );
}
