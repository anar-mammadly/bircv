import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:420 }}>
        <div style={{ fontSize:80, fontWeight:900, color:'#7C6EF8', lineHeight:1, marginBottom:16, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>404</div>
        <h1 style={{ fontSize:24, fontWeight:800, color:'#fff', margin:'0 0 10px', fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>Səhifə tapılmadı</h1>
        <p style={{ fontSize:15, color:'rgba(255,255,255,0.45)', margin:'0 0 28px', lineHeight:1.6, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
          Axtardığınız səhifə mövcud deyil və ya köçürülüb.
        </p>
        <Link href="/" style={{ display:'inline-block', background:'#7C6EF8', color:'#fff', textDecoration:'none', borderRadius:10, padding:'12px 28px', fontSize:14, fontWeight:700, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}
