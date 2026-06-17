import {
  Monitor,
  Palette,
  Share2,
  Clapperboard,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import Reveal from "./Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import { DitheringBackground } from "./ui/dithering-shader";
import ShimmerButton from "./ui/ShimmerButton";
import { waLink } from "@/lib/site";

const services = [
  {
    icon: Monitor,
    title: "Creación de sitios web",
    description:
      "Landing pages, páginas de servicios, catálogos y micrositios. Diseño a medida, rápidos, optimizados para móvil y pensados para convertir visitas en clientes por WhatsApp.",
  },
  {
    icon: Palette,
    title: "Identidad de marca",
    description:
      "Logo, paleta, tipografías y manual de marca. Que tu negocio se vea serio y memorable desde el primer vistazo.",
  },
  {
    icon: Share2,
    title: "Gestión de redes sociales",
    description:
      "Manejo mensual de Instagram, Facebook y TikTok: estrategia, calendario, contenido y comunidad. El motor de presencia constante para tu negocio.",
  },
  {
    icon: Clapperboard,
    title: "Creación de contenido",
    description:
      "Reels, carruseles y fotografía/video de producto con calidad de estudio. Contenido que detiene el scroll y posiciona tu marca.",
  },
  {
    icon: MessageCircle,
    title: "Automatización de WhatsApp",
    description:
      "Chatbots y flujos automáticos que responden, cotizan y atienden clientes 24/7. Menos mensajes perdidos, más ventas cerradas.",
  },
  {
    icon: TrendingUp,
    title: "Estrategia digital y publicidad",
    description:
      "Campañas en Meta Ads con embudo Anuncio → WhatsApp → cotización → venta. Inversión que se traduce en clientes reales, no en likes vacíos.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden border-t border-white/10 bg-night">
      <DitheringBackground className="z-0 opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-night/60" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Servicios
          </span>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Todo lo que tu negocio necesita para{" "}
            <span className="text-gradient">vender en digital</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <SpotlightCard
              key={service.title}
              delay={(i % 3) * 0.1}
              href={waLink(
                `Hola Mister Content, quiero información sobre ${service.title.toLowerCase()}.`
              )}
              className="p-7 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(155,127,212,0.18)]"
            >
              {/* Número fantasma */}
              <span className="font-display pointer-events-none absolute -right-2 -top-6 text-8xl font-bold text-accent/20 transition-colors duration-300 group-hover:text-accent/30">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex h-full flex-col">
                <div className="mb-5 inline-flex w-fit rounded-xl border border-accent/30 bg-accent/10 p-3.5 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-black">
                  <service.icon size={32} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/90">
                  {service.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Cotizar por WhatsApp →
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="font-display text-xl font-bold md:text-2xl">
              Deja de perder clientes. <span className="text-gradient">Empieza hoy.</span>
            </p>
            <ShimmerButton href="/#precios" external={false}>
              Ver planes y precios
            </ShimmerButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
