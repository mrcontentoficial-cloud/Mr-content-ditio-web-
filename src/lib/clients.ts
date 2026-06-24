// =============================================================================
//  CLIENTES — Mister Content
// -----------------------------------------------------------------------------
//  Aquí defines cada cliente y su contenido audiovisual (diseños, reels, etc.).
//
//  CÓMO SUBIR CONTENIDO NUEVO:
//  1. Coloca el archivo dentro de  public/clientes/<slug-del-cliente>/
//        - Imágenes/diseños:  .jpg, .png, .webp
//        - Reels/videos:      .mp4, .webm  (idealmente vertical 9:16)
//  2. Agrega una entrada en el arreglo "items" de la categoría correspondiente.
//        - La ruta SIEMPRE empieza con "/clientes/..." (sin "public").
//        - Para videos puedes añadir un "poster" (imagen de portada).
//
//  Ejemplo:
//    { type: "image", src: "/clientes/dml-medica/disenos/post-01.jpg", title: "Campaña de invierno" }
//    { type: "video", src: "/clientes/dml-medica/reels/reel-01.mp4", poster: "/clientes/dml-medica/reels/reel-01.jpg", title: "Reel: nuevo tratamiento" }
// =============================================================================

export type MediaItem = {
  type: "image" | "video";
  /** Ruta dentro de /public, p. ej. "/clientes/dml-medica/disenos/post-01.jpg" */
  src: string;
  /** Título corto opcional que se muestra al pasar el cursor o en el visor. */
  title?: string;
  /** Imagen de portada para videos (opcional pero recomendado). */
  poster?: string;
};

export type ClientCategory = {
  /** Identificador interno, sin espacios. */
  id: string;
  /** Etiqueta visible, p. ej. "Diseños" o "Reels". */
  label: string;
  items: MediaItem[];
};

export type Client = {
  /** Parte de la URL: /clientes/<slug> */
  slug: string;
  name: string;
  /** Frase corta bajo el nombre. */
  tagline: string;
  /** Descripción del trabajo realizado. */
  description: string;
  /** Logo dentro de /public (opcional). */
  logo?: string;
  /** Servicios o etiquetas mostradas como chips. */
  tags: string[];
  categories: ClientCategory[];
};

export const clients: Client[] = [
  {
    slug: "dml-medica",
    name: "DML Médica",
    tagline: "Branding + Redes sociales",
    description:
      "Posicionamiento de marca y crecimiento sostenido de comunidad: presencia constante que se traduce en confianza y pacientes.",
    logo: "/dml-medica.png",
    tags: ["Identidad de marca", "Redes sociales", "Contenido"],
    categories: [
      {
        id: "disenos",
        label: "Diseños",
        // Sube tus imágenes a public/clientes/dml-medica/disenos/ y agrégalas aquí.
        items: [],
      },
      {
        id: "reels",
        label: "Reels",
        // Sube tus videos a public/clientes/dml-medica/reels/ y agrégalos aquí.
        items: [],
      },
    ],
  },
  {
    slug: "emjo",
    name: "EMJO Consulting",
    tagline: "Identidad + Automatización",
    description:
      "Identidad de marca completa y automatización de WhatsApp: una firma que se ve profesional y responde a sus clientes a cualquier hora.",
    logo: "/emjo.png",
    tags: ["Identidad de marca", "Automatización", "Contenido"],
    categories: [
      {
        id: "disenos",
        label: "Diseños",
        items: [],
      },
      {
        id: "reels",
        label: "Reels",
        items: [],
      },
    ],
  },
  {
    slug: "dr-jorge",
    name: "Dr. Jorge",
    tagline: "Contenido + Redes sociales",
    description:
      "Producción de contenido audiovisual y manejo de redes para fortalecer la presencia profesional y conectar con más pacientes.",
    tags: ["Contenido", "Redes sociales", "Reels"],
    categories: [
      {
        id: "disenos",
        label: "Diseños",
        items: [],
      },
      {
        id: "reels",
        label: "Reels",
        items: [],
      },
    ],
  },
];

export function getClient(slug: string): Client | undefined {
  return clients.find((c) => c.slug === slug);
}
