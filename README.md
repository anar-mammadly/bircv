# bircv

CV/rezyume yaratma platforması — istifadəçilər hazır şablonlar əsasında CV qurur, istəyə görə Groq AI ilə məzmun generasiyası əldə edir və nəticəni PDF olaraq yükləyir.

## Xüsusiyyətlər

- 4 hazır CV şablonu: Bold, Kompakt, Minimal, Modern (`app/components/templates`)
- AI dəstəkli məzmun generasiyası (Groq SDK)
- OTP (bir dəfəlik kod) ilə istifadəçi doğrulaması
- Abunəlik/pricing axını və e-poçt bildirişləri (Resend / Nodemailer)
- CV-ni PDF kimi endirmə (`jspdf`, `html2canvas`)
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

## Struktur

- `app/create` — CV yaratma axını
- `app/templates`, `app/components/templates` — şablonlar
- `app/pricing` — abunəlik/qiymət səhifəsi
- `app/admin` — admin panel
- `app/api/*` — auth, OTP, AI generasiya, abunəlik, CV endirmə endpoint-ləri
- `lib/` — köməkçi funksiyalar

## Əlaqə

Sual və təkliflər üçün repo sahibi ilə əlaqə saxlayın.
