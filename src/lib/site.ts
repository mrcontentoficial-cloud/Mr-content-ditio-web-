export const SITE = {
  name: "Mister Content",
  handle: "@mrcontentoficial",
  tagline: "Imaginamos, creamos, transformamos.",
  email: "hola@mistercontent.mx",
  url: "https://mistercontent.studio",
  whatsappNumber: "524791507070", // 479 150 7070 (México, formato wa.me sin "+")
  social: {
    instagram: "https://instagram.com/mrcontentoficial",
    facebook: "https://facebook.com/mrcontentoficial",
    tiktok: "https://tiktok.com/@mrcontentoficial",
  },
} as const;

export function waLink(
  message = "Hola Mister, vi su página y quiero que mi negocio empiece a conectar y vender más."
) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
