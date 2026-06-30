export const SITE = {
  name: "Mister Content",
  handle: "@mrcontentoficial",
  tagline: "Imaginamos, creamos, transformamos.",
  email: "mistercontentoficial@gmail.com",
  url: "https://mistercontent.studio",
  whatsappNumber: "524791507070", // 479 150 7070 (México, formato wa.me sin "+")
  social: {
    instagram: "https://www.instagram.com/mister_content_agencia/",
    facebook: "https://www.facebook.com/profile.php?id=61590457379278&locale=es_LA",
  },
} as const;

export function waLink(
  message = "Hola Mister, vi su página y quiero que mi negocio empiece a conectar y vender más."
) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
