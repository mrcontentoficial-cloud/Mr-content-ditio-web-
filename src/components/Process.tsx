"use client";

import { motion } from "framer-motion";
import { Search, FileText, Wand2, Rocket } from "lucide-react";
import ShimmerButton from "./ui/ShimmerButton";
import { waLink } from "@/lib/site";

const steps = [
  {
    icon: Search,
    title: "Diagnóstico",
    description:
      "Analizamos tu presencia digital actual y detectamos exactamente dónde estás perdiendo clientes.",
  },
  {
    icon: FileText,
    title: "Propuesta",
    description:
      "Te presentamos un plan claro, con alcances y precio definidos. Sin letras chiquitas ni sorpresas.",
  },
  {
    icon: Wand2,
    title: "Creación",
    description:
      "Diseñamos y construimos: marca, sitio, contenido o automatización, con revisiones contigo en cada etapa.",
  },
  {
    icon: Rocket,
    title: "Lanzamiento",
    description:
      "Publicamos, medimos y ajustamos para que tu inversión se convierta en clientes reales.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="border-t border-white/10 bg-night-soft">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Proceso
          </span>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Así trabajamos <span className="text-gradient">contigo</span>
          </h2>
        </motion.div>

        <div className="relative mt-16">
          {/* línea base */}
          <div
            aria-hidden
            className="absolute left-0 top-7 hidden h-px w-full bg-white/10 lg:block"
          />
          {/* línea animada */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 top-7 hidden h-px w-full bg-gradient-to-r from-accent via-accent-magenta to-accent lg:block"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-night text-accent shadow-[0_0_24px_rgba(155,127,212,0.25)]">
                  <step.icon size={24} strokeWidth={1.8} />
                  <span className="font-display absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/90">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-col items-center gap-3 text-center"
        >
          <p className="font-display text-xl font-bold md:text-2xl">
            Tu diagnóstico es <span className="text-gradient">gratis.</span> Empecemos hoy.
          </p>
          <ShimmerButton
            href={waLink(
              "Hola Mister Content, quiero mi diagnóstico gratis para empezar."
            )}
          >
            Empezar mi diagnóstico
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  );
}
