export type CaseStudy = {
  slug: string;
  name: string;
  logo: string;
  category: string;
  intro: string;
  work: string[];
  results: { value: string; label: string }[];
};

export const cases: CaseStudy[] = [
  {
    slug: "emjo-consulting",
    name: "EMJO Consulting",
    logo: "/emjo.png",
    category: "Identidad de marca y automatización",
    intro:
      "EMJO Consulting necesitaba verse a la altura de su servicio y dejar de perder mensajes de clientes. Construimos una marca sólida y un sistema que responde por ellos las 24 horas.",
    work: [
      "Diseño de identidad de marca completa: logo, paleta y tipografías.",
      "Manual de marca para mantener todo consistente.",
      "Chatbot de WhatsApp que responde, informa y filtra clientes automáticamente.",
      "Flujos de atención para no perder ningún mensaje.",
    ],
    results: [
      { value: "24/7", label: "atención automatizada" },
      { value: "0", label: "mensajes perdidos" },
    ],
  },
  {
    slug: "dml-medica",
    name: "DML Médica",
    logo: "/dml-medica.png",
    category: "Branding y redes sociales",
    intro:
      "DML Médica tenía presencia, pero sin rumbo. Le dimos una estrategia de marca y contenido que convirtió sus redes en una comunidad real y constante.",
    work: [
      "Posicionamiento y línea gráfica de marca.",
      "Estrategia de contenido mensual para Instagram y Facebook.",
      "Diseño de publicaciones, stories y reels.",
      "Gestión de comunidad para crecer con seguidores reales.",
    ],
    results: [
      { value: "+10K", label: "seguidores alcanzados" },
      { value: "100%", label: "presencia constante" },
    ],
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
