"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import ShimmerButton from "./ui/ShimmerButton";
import { waLink } from "@/lib/site";

const faqs = [
  {
    q: "¿Cuánto tardan en entregar?",
    a: "Depende del proyecto. Una landing page o identidad de marca suele tomar de 1 a 2 semanas. La gestión de redes y la automatización arrancan en cuestión de días. En tu diagnóstico te damos tiempos exactos.",
  },
  {
    q: "¿Tienen permanencia o contratos forzosos?",
    a: "No. Nuestros planes son mes con mes. Te quedas porque ves resultados, no porque un contrato te obligue.",
  },
  {
    q: "¿La inversión en publicidad va incluida?",
    a: "No. Nosotros cobramos por la estrategia y la gestión de las campañas. La inversión que se le da a Meta (Facebook e Instagram) se cotiza aparte y la decides tú según tus metas.",
  },
  {
    q: "¿Trabajan con negocios de cualquier ciudad?",
    a: "Sí. Trabajamos de forma remota con emprendedores y marcas de cualquier parte. Todo lo coordinamos por WhatsApp y llamadas.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Solo las ganas de crecer. Nos escribes por WhatsApp, hacemos un diagnóstico gratis de tu presencia digital y te armamos una propuesta clara con precio y alcances.",
  },
  {
    q: "¿Por qué Mister Content y no otra agencia?",
    a: "Porque juntamos estrategia, contenido y tecnología en un solo lugar, te hablamos claro y entregamos calidad de agencia grande a precio de aliado. Lo que imaginamos, lo creamos, y lo que creamos, vende.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-accent"
      >
        <span className="font-display text-lg font-bold tracking-tight md:text-xl">
          {q}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 leading-relaxed text-white/90">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="border-t border-white/10 bg-night-soft">
      <div className="mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Preguntas frecuentes
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Lo que todos <span className="text-gradient">nos preguntan</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            {faqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-white/90">¿Te quedó otra duda? Pregúntanos directo.</p>
            <ShimmerButton href={waLink("Hola Mister, tengo una duda sobre sus servicios.")}>
              Resolver mi duda por WhatsApp
            </ShimmerButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
