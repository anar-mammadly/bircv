import type { CVLayout } from '@/app/components/CVDocument';
import { renderPdf } from '@/lib/pdf/domToPdf';

export function cvFilename(first: string, last: string) {
  const base = [first.trim(), last.trim()].filter(Boolean).join('-').replace(/[\\/:*?"<>|\s]+/g, '-');
  return `${base || 'CV'}-bircv.az.pdf`;
}

const frame = () => new Promise<void>(r => requestAnimationFrame(() => r()));

/** Waits for fonts + a settled layout, renders the vector PDF and hands it to the browser as a download. */
export async function exportCvPdf(layout: CVLayout, filename: string): Promise<Blob> {
  if ('fonts' in document) await document.fonts.ready;
  await frame(); await frame();
  const blob = await renderPdf(layout, filename.replace(/\.pdf$/, ''));
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
  return blob;
}
