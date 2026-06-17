import { Quote, Star } from "lucide-react";
import Reveal from "./Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import { ShaderAnimation } from "./ui/shader-lines";
import ShimmerButton from "./ui/ShimmerButton";
import { waLink } from "@/lib/site";

const testimonials = [
  {
    quote:
      "Nos entregaron una marca con la que por fin nos sentimos serios frente a nuestros clientes. El chatbot de WhatsApp nos quitó horas de responder lo mismo todos los días.",
    name: "EMJO Consulting",
    role: "Consultoría",
    initials: "EM",
  },
  {
    quote:
      "Pasamos de publicar sin rumbo a tener una comunidad real de más de 10 mil personas. Hoy la gente nos encuentra y nos escribe sola.",
    name: "DML Médica",
    role: "Sector salud",
    initials: "DM",
  },
  {
    quote:
      "Entienden al emprendedor mexicano. Te hablan claro, te dicen qué sirve y qué no, y entregan con una calidad que parece de agencia grande.",
    name: "Cliente Mister Content",
    role: "Pequeña empresa",
    initials: "MC",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-night">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <ShaderAnimation />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-night/65" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Lo que dicen
          </span>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Marcas que ya{" "}
            <span className="text-gradient">confiaron en nosotros</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <SpotlightCard key={t.name} delay={i * 0.1} className="p-7">
              <div className="flex h-full flex-col">
                <Quote size={28} className="text-accent/50" />
                <div className="mt-3 flex">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={15} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-white/90">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 font-display font-bold text-accent">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-white/90">{t.role}</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="font-display text-xl font-bold md:text-2xl">
              Únete a las marcas que ya <span className="text-gradient">venden con nosotros.</span>
            </p>
            <ShimmerButton
              href={waLink(
                "Hola Mister Content, quiero que mi marca venda como las que ya trabajan con ustedes."
              )}
            >
              Quiero esos resultados
            </ShimmerButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
