export const SITE = {
  name: "Mister Content",
  handle: "@mrcontentoficial",
  tagline: "Imaginamos, creamos, transformamos.",
  email: "hola@mistercontent.mx",
  url: "https://mistercontent.mx",
  whatsappNumber: "52XXXXXXXXXX", // TODO: reemplazar con el número real (formato wa.me, sin "+")
  social: {
    instagram: "https://instagram.com/mrcontentoficial",
    facebook: "https://facebook.com/mrcontentoficial",
    tiktok: "https://tiktok.com/@mrcontentoficial",
  },
} as const;

export function waLink(
  message = "Hola Mister Content, quiero información sobre sus servicios."
) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
