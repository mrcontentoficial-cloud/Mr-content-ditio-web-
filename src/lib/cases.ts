export type CaseStudy = {
  slug: string;
  name: string;
  logo: string;
  circleBg: string;
  category: string;
  intro: string;
  work: string[];
  results: { value: string; label: string }[];
  gallery?: string[];
  mapEmbed?: string;
  address?: string;
  mapUrl?: string;
  socials?: { type: "facebook" | "instagram" | "tiktok"; url: string }[];
};

export const cases: CaseStudy[] = [
  {
    slug: "emjo-consulting",
    name: "EMJO Consulting",
    logo: "/emjo.png",
    circleBg: "#19212d",
    category: "Identidad de marca",
    intro:
      "EMJO es un despacho ubicado en León, Gto. Le creamos su identidad de marca desde cero: logo y tarjeta de presentación para que tuviera una presencia profesional y memorable.",
    work: [
      "Diseño de logo y línea gráfica de la marca.",
      "Tarjeta de presentación lista para imprimir.",
      "Identidad visual coherente para proyectar seriedad.",
    ],
    results: [
      { value: "100%", label: "identidad desde cero" },
      { value: "Logo", label: "y papelería de marca" },
    ],
    gallery: ["/emjo-tarjetas.jpg", "/emjo-tarjeta-bolsillo.jpg"],
    mapEmbed:
      "https://www.google.com/maps?q=21.105038,-101.6666413&z=16&output=embed",
    address: "C. Beethoven 511, León Moderno, 37480 León de los Aldama, Gto.",
    mapUrl:
      "https://www.google.com/maps/place/C.+Beethoven+511,+Le%C3%B3n+Moderno,+37480+Le%C3%B3n+de+los+Aldama,+Gto./@21.105038,-101.6666413,17z",
  },
  {
    slug: "dml-medica",
    name: "DML Médica",
    logo: "/dml-medica.png",
    circleBg: "#ffffff",
    category: "Creación de contenido y comunidad",
    intro:
      "A DML Médica le creamos contenido y le dimos presencia entre la comunidad de rescate, paramédicos y hospitalaria, conectando su marca con la gente correcta.",
    work: [
      "Creación de contenido para la empresa.",
      "Estrategia para conectar con la comunidad de rescate y paramédica.",
      "Presencia constante en Facebook, Instagram y TikTok.",
      "Diseño de publicaciones, stories y reels.",
    ],
    results: [
      { value: "+10K", label: "comunidad alcanzada" },
      { value: "100%", label: "presencia constante" },
    ],
    socials: [
      { type: "facebook", url: "https://www.facebook.com/share/18g2QTgkJx/?mibextid=wwXIfr" },
      { type: "instagram", url: "https://www.instagram.com/dmlmedica?igsh=MW55bmV0d2U1NDB2dQ==" },
      { type: "tiktok", url: "https://www.tiktok.com/@dml_medica?_r=1&_t=ZS-97ZGM6KyAaK" },
    ],
    mapEmbed:
      "https://www.google.com/maps?q=21.1069811,-101.6221212&z=16&output=embed",
    address: "Distribuidora Médica de León, León, Gto.",
    mapUrl: "https://maps.app.goo.gl/z5fk49wuBiETfQHS7",
  },
  {
    slug: "clinica-lasser",
    name: "Clínica Lásser",
    logo: "/lasser.png",
    circleBg: "#ffffff",
    category: "Presencia digital",
    intro:
      "Le construimos a Clínica Lásser una presencia digital profesional para que sus pacientes la encuentren, le crean y agenden con confianza.",
    work: [
      "Sitio web profesional y optimizado para móvil.",
      "Identidad visual coherente en todos sus canales.",
      "Estrategia de contenido para posicionar la clínica.",
    ],
    results: [
      { value: "24/7", label: "presencia en línea" },
      { value: "100%", label: "enfocado en pacientes" },
    ],
  },
  {
    slug: "antojo-crunch",
    name: "Antojo & Crunch",
    logo: "/antojo-crunch-icono.jpg",
    circleBg: "#ffffff",
    category: "Identidad de marca",
    intro:
      "Antojo & Crunch vende botanas y chilaquiles sin tienda física, así que su marca es su mejor escaparate. Le creamos un logo con personalidad y una tipografía propia para que se antoje desde el primer vistazo.",
    work: [
      "Diseño de logo con carácter y mucho sabor.",
      "Tipografía propia para la marca.",
      "Línea gráfica lista para redes y empaques.",
    ],
    results: [
      { value: "100%", label: "identidad desde cero" },
      { value: "Logo", label: "y tipografía propia" },
    ],
    gallery: ["/antojo-crunch-logo.jpg", "/antojo-crunch-texto.jpg"],
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
