// Mərkəzi konfiqurasiya — bütün layihə bu dəyərlərdən istifadə edir.
export const WA_NUMBER = '994515600625'; // WhatsApp nömrəsi (ölkə kodu ilə, + olmadan)
export const SUPPORT_EMAIL = 'support@bircv.az';

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
