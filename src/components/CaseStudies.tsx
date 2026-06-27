"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { ShaderAnimation } from "./ui/shader-lines";
import { LazyVisible } from "./ui/LazyVisible";
import { cases } from "@/lib/cases";

export default function CaseStudies() {
  return (
    <section id="casos" className="relative overflow-hidden border-t border-white/10 bg-night">
      <LazyVisible className="pointer-events-none z-0 opacity-30">
        <ShaderAnimation />
      </LazyVisible>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-night/65" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Casos de éxito
          </span>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Marcas que ya <span className="text-gradient">venden con nosotros</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/90">
            Toca una marca para ver qué hicimos por ella.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-start justify-center gap-x-12 gap-y-12 sm:gap-x-20">
          {cases.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Link href={`/casos/${c.slug}`} className="group flex flex-col items-center">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-3 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-white/5 p-7 ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/60 group-hover:ring-accent/40 md:h-48 md:w-48">
                    <Image
                      src={c.logo}
                      alt={c.name}
                      width={150}
                      height={150}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <span className="font-display mt-6 text-xl font-bold tracking-tight text-white">
                  {c.name}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-all duration-300 group-hover:gap-2 group-hover:opacity-100">
                  Ver caso <ArrowRight className="size-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
