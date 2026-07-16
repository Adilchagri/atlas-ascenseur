export const BUSINESS_PHONE_DISPLAY = '+212666323055';
export const WHATSAPP_PHONE = '212666323055';

export function buildWhatsAppUrl(message = '') {
  const baseUrl = `https://wa.me/${WHATSAPP_PHONE}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}
