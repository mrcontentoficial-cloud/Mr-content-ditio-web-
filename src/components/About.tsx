import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

const points = [
  "Estrategia, contenido y desarrollo bajo un mismo techo",
  "Te hablamos claro, sin tecnicismos ni reportes que nadie lee",
  "Calidad de agencia grande a precio de aliado",
  "Pensado para el emprendedor mexicano que quiere crecer",
];

export default function About() {
  return (
    <section id="nosotros" className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-12 px-5 py-24 md:flex-row md:items-center md:px-8 md:py-32">
        <Reveal className="shrink-0">
          <div className="relative animate-float">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-accent/25 blur-3xl"
            />
            <Image
              src="/logo.png"
              alt="Mister Content"
              width={240}
              height={240}
              className="relative rounded-3xl border border-white/10"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Sobre Mister Content
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              No somos <span className="text-gradient">una agencia más</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              Somos {SITE.name} ({SITE.handle}), una agencia creativa digital.
              Nacimos para los emprendedores que quieren verse como los grandes
              sin pagar como los grandes. Lo que imaginamos, lo creamos. Y lo que
              creamos, transforma tu negocio.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/90">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
