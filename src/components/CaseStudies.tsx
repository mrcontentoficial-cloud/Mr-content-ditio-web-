"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import CountUp from "./ui/CountUp";
import ShimmerButton from "./ui/ShimmerButton";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { ShaderAnimation } from "./ui/shader-lines";
import { waLink } from "@/lib/site";

type CaseStudy = {
  logo: string;
  name: string;
  tag: string;
  metricPrefix: string;
  metric: number;
  metricSuffix: string;
  metricLabel: string;
  description: string;
};

const cases: CaseStudy[] = [
  {
    logo: "/emjo.png",
    name: "EMJO Consulting",
    tag: "Identidad + Automatización",
    metricPrefix: "",
    metric: 24,
    metricSuffix: "/7",
    metricLabel: "atención automatizada",
    description:
      "Identidad de marca completa y chatbot de WhatsApp funcional: una firma que se ve profesional y responde a sus clientes a cualquier hora, sin perder un solo mensaje.",
  },
  {
    logo: "/dml-medica.png",
    name: "DML Médica",
    tag: "Branding + Redes",
    metricPrefix: "+",
    metric: 10,
    metricSuffix: "K",
    metricLabel: "seguidores alcanzados",
    description:
      "Posicionamiento de marca y crecimiento sostenido de comunidad hasta superar los 10,000 seguidores: presencia constante que se traduce en confianza y pacientes.",
  },
];

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-night-card to-night p-8 transition-colors duration-300 hover:border-accent/50">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 p-2.5 ring-1 ring-white/10">
            <Image
              src={c.logo}
              alt={c.name}
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
            {c.tag}
          </span>
        </div>

        <h3 className="font-display mt-6 text-2xl font-bold tracking-tight">
          {c.name}
        </h3>

        <div className="mt-4">
          <span className="font-display text-5xl font-bold text-gradient">
            <CountUp to={c.metric} prefix={c.metricPrefix} suffix={c.metricSuffix} />
          </span>
          <span className="ml-3 text-sm font-medium uppercase tracking-wider text-white/90">
            {c.metricLabel}
          </span>
        </div>

        <p className="mt-5 flex-1 leading-relaxed text-white/90">{c.description}</p>

        <a
          href={waLink(
            `Hola Mister Content, vi el caso de ${c.name} y quiero resultados así para mi negocio.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3 hover:text-accent-bright"
        >
          Quiero resultados así <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}

function CtaCard() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 to-night-card p-8 text-center">
      <p className="font-display text-2xl font-bold leading-tight">
        El siguiente caso de éxito
      </p>
      <p className="font-display mt-1 text-3xl font-bold text-gradient">
        Tu negocio.
      </p>
      <p className="mt-4 text-sm text-white/90">
        Únete a las marcas que ya venden con nosotros.
      </p>
      <div className="mt-7">
        <ShimmerButton
          href={waLink(
            "Hola Mister Content, quiero ser el siguiente caso de éxito. ¿Cómo empezamos?"
          )}
        >
          Quiero ser el siguiente
        </ShimmerButton>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const slidesCount = cases.length + 1;

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <section id="casos" className="relative overflow-hidden border-t border-white/10 bg-night">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <ShaderAnimation />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-night/65" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Casos de éxito
            </span>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
              Resultados, <span className="text-gradient">no promesas</span>
            </h2>
          </Reveal>

          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              onClick={() => api?.scrollPrev()}
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              aria-label="Siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-6">
            {cases.map((c) => (
              <CarouselItem
                key={c.name}
                className="basis-[88%] pl-6 sm:basis-1/2 lg:basis-[42%]"
              >
                <CaseCard c={c} />
              </CarouselItem>
            ))}
            <CarouselItem className="basis-[88%] pl-6 sm:basis-1/2 lg:basis-[42%]">
              <CtaCard />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: slidesCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Ir a la tarjeta ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                current === i ? "w-6 bg-accent" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
