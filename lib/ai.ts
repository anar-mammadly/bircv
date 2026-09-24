// Client helper for /api/generate (streamed plain text).
export type AiResult = 'ok' | 'login_required' | 'limit_reached' | 'error';

export async function streamGenerate(body: Record<string, unknown>, onText: (text: string) => void): Promise<AiResult> {
  try {
    const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.status === 401) return 'login_required';
    if (res.status === 429) return 'limit_reached';
    if (!res.ok || !res.body) return 'error';
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      onText(acc);
    }
    return 'ok';
  } catch {
    return 'error';
  }
}

export const AI_MESSAGES = {
  az: { login_required: 'AI istifadə etmək üçün daxil olun', limit_reached: 'Pulsuz AI limiti (5 sorğu) bitdi. Premium-a keçin.', error: 'Xəta baş verdi, yenidən cəhd edin' },
  en: { login_required: 'Please log in to use AI', limit_reached: 'Free AI limit (5 requests) reached. Upgrade to Premium.', error: 'Something went wrong, please try again' },
} as const;
