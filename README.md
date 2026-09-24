# bircv

CV/rezyume yaratma platforması — istifadəçilər hazır şablonlar əsasında CV qurur, istəyə görə Groq AI ilə məzmun generasiyası əldə edir və nəticəni PDF olaraq yükləyir.

## Xüsusiyyətlər

- 15 CV şablonu (`app/components/templates`, `app/components/CVPreview.tsx`); meta-məlumat: `lib/cv/templates.ts`
- Canlı şrift seçimi (Poppins, Bricolage Grotesque, Inter, Manrope, Plus Jakarta Sans) — CV-yə və PDF-ə dərhal tətbiq olunur
- Dəqiq A4 səhifələmə mühərriki (`lib/cv/paginate.ts`): başlıq tək qalmır, bloklar yarıya bölünmür
- AI dəstəkli məzmun generasiyası (Groq SDK, `openai/gpt-oss-20b`); pulsuz plan üçün 5 sorğu limiti
- OTP (bir dəfəlik kod) ilə istifadəçi doğrulaması
- Abunəlik/pricing axını və e-poçt bildirişləri (Resend / Nodemailer)
- Vektor PDF: real, seçilə bilən mətn və embed edilmiş şriftlər (`lib/pdf/domToPdf.ts`, `jspdf`)
- Admin panel

## Texnologiya stack-i

- Next.js 14 (App Router), React 18
- Supabase (verilənlər bazası / auth)
- Groq SDK (AI generasiya)
- Resend + Nodemailer (e-poçt)
- Cloudflare Workers üzərində deploy (`@opennextjs/cloudflare`, `wrangler`)
- TailwindCSS

## Quraşdırma

```bash
npm install
```

Layihənin kökündə `.env.local` faylı yaradın və aşağıdakı dəyişənləri təyin edin (dəqiq adlar üçün kod bazasındakı istifadəyə baxın — `app/api/generate`, `app/api/otp`, `app/api/subscribe`, `app/store`):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GROQ_API_KEY=
RESEND_API_KEY=
```

## İşə salma

```bash
npm run dev
```

Brauzerdə [http://localhost:3000](http://localhost:3000) açın.

## Cloudflare-ə deploy

```bash
npm run deploy
```

## CV mühərriki (necə işləyir)

1. Şablon **bir dəfə**, tək hündür sənəd kimi kanonik A4 enində render olunur (`app/components/CVDocument.tsx`).
2. `lib/cv/paginate.ts` bölünməməli "atom"ları (sətir, bənd, kart) tapır və səhifə sərhədinə düşənləri növbəti səhifəyə itələyir. Bu real layout-dur.
3. Önizləmə səhifələri həmin DOM-un snapshot-ıdır; PDF isə eyni DOM-dan oxunur (`lib/pdf/domToPdf.ts`) — mətn, düzbucaqlılar, gradientlər, şəkillər vektor/raster primitivlərinə çevrilir. Önizləmə ilə PDF eyni layout-dan gəldiyi üçün fərqlənə bilməz.
4. Şriftlər `public/fonts/cv/*.ttf` — brauzer (`app/cv-fonts.css`) və PDF eyni faylı istifadə edir. Faylları `scripts/build-cv-fonts.py` yaradır (Latin + Azərbaycan hərfləri; ə/Ə olmayan şriftlərə əlavə olunur).

Yeni şablon əlavə etmək: komponenti yaz → `CVPreview.tsx`-də `renderTemplate`-ə əlavə et → `TemplateId` (`app/types/cv.ts`) və `lib/cv/templates.ts`-ə yaz. Test üçün: `npm run dev`, sonra `/dev/lab?tpl=<id>&fx=long&font=inter` (yalnız development).

## Struktur

- `app/create` — CV redaktoru (Məzmun / Dizayn / Önizləmə)
- `supabase/` — `schema.sql` (sıfırdan qurulum, cədvəlləri silir!) və nömrəli dəyişiklik faylları (`002_*.sql` …)
- `app/templates`, `app/components/templates` — şablonlar
- `app/pricing` — abunəlik/qiymət səhifəsi
- `app/admin` — admin panel
- `app/api/*` — auth, OTP, AI generasiya, abunəlik, CV endirmə endpoint-ləri
- `lib/` — köməkçi funksiyalar

## Əlaqə

Sual və təkliflər üçün repo sahibi ilə əlaqə saxlayın.
