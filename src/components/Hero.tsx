"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "@/lib/site";
import ShimmerButton from "./ui/ShimmerButton";
import { SilkBackground } from "./ui/silk-background-animation";

const rotating = [
  "VENDA.",
  "CONVIERTA.",
  "DESTAQUE.",
  "FACTURE.",
  "CREZCA.",
  "ENAMORE.",
  "DOMINE.",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="inicio" className="relative h-svh w-full overflow-hidden bg-night">
      {/* Fondo silk animado */}
      <SilkBackground className="z-0" />

      {/* Velo para legibilidad del texto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_55%_at_center,rgba(0,0,0,0.55),rgba(0,0,0,0.15)_60%,transparent)]"
      />

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
        className="pointer-events-none absolute inset-0 z-20 flex w-full flex-col items-center justify-center px-6 text-center"
      >
        <Image
          src="/logo-mr-content.png"
          alt="Mister Content"
          width={420}
          height={420}
          priority
          className="mb-4 h-52 w-52 animate-float object-contain md:h-72 md:w-72"
        />
        <span className="mb-7 text-sm font-bold uppercase tracking-[0.22em] text-accent-bright">
          Agencia creativa
        </span>

        <h1 className="font-display font-black tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
          <span className="font-coolvetica mb-3 block text-4xl font-bold tracking-[0.06em] text-white md:text-6xl">
            Hacemos que tu negocio
          </span>
          <span className="relative block text-6xl leading-[0.9] md:text-8xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -28, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
                className="inline-block uppercase text-gradient"
              >
                {rotating[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-xl">
          Estrategia, contenido y tecnología que hacen que tu negocio venda.
        </p>

        <div className="pointer-events-auto mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <ShimmerButton href={waLink()} className="px-10 py-5 text-lg">
            Hablemos por WhatsApp
          </ShimmerButton>
          <ShimmerButton
            href="#servicios"
            variant="ghost"
            external={false}
            className="px-10 py-5 text-lg"
          >
            Ver lo que hacemos
          </ShimmerButton>
        </div>
      </motion.div>

      {/* indicador de scroll */}
      <a
        href="#propuesta"
        aria-label="Bajar"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/90 transition-colors hover:text-accent"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce"
        >
          <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </a>
    </section>
  );
}
