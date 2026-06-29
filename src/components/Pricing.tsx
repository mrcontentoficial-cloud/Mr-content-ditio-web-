"use client";

import { motion } from "framer-motion";
import { Check, X, Calculator, MoveHorizontal } from "lucide-react";
import { AuroraShaderBackground } from "./ui/aurora-shader";
import { LazyVisible } from "./ui/LazyVisible";
import { waLink } from "@/lib/site";

type Benefit = { text: string; checked: boolean };

type Plan = {
  tier: string;
  price: string;
  period: string;
  bestFor: string;
  popular?: boolean;
  benefits: Benefit[];
};

const plans: Plan[] = [
  {
    tier: "Esencial",
    price: "$4,900",
    period: "/mes",
    bestFor: "Para empezar con presencia profesional",
    benefits: [
      { text: "Gestión de 1 red social", checked: true },
      { text: "Diseño de contenido y stories", checked: true },
      { text: "Reporte mensual de resultados", checked: true },
      { text: "Reels y video mensual", checked: false },
      { text: "Sitio web o landing page", checked: false },
      { text: "Campañas de Meta Ads", checked: false },
      { text: "Automatización de WhatsApp", checked: false },
    ],
  },
  {
    tier: "Crecimiento",
    price: "$9,900",
    period: "/mes",
    bestFor: "Para marcas que quieren vender más",
    popular: true,
    benefits: [
      { text: "Gestión de 2 redes sociales", checked: true },
      { text: "Diseño de contenido y stories", checked: true },
      { text: "Reels y video mensual", checked: true },
      { text: "Sitio web o landing page", checked: true },
      { text: "Campañas de Meta Ads", checked: true },
      { text: "Reporte mensual de resultados", checked: true },
      { text: "Automatización de WhatsApp", checked: false },
    ],
  },
  {
    tier: "Dominio",
    price: "$18,900",
    period: "/mes",
    bestFor: "Para dominar tu mercado de punta a punta",
    benefits: [
      { text: "Gestión de 3 redes sociales", checked: true },
      { text: "Contenido premium + sesión de fotos/video", checked: true },
      { text: "Reels y video mensual", checked: true },
      { text: "Sitio web a medida", checked: true },
      { text: "Campañas de Meta Ads con embudo", checked: true },
      { text: "Automatización de WhatsApp 24/7", checked: true },
      { text: "Atención y soporte prioritario", checked: true },
    ],
  },
];

function BenefitRow({ text, checked }: Benefit) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid size-5 shrink-0 place-content-center rounded-full ${
          checked ? "bg-accent text-black" : "bg-white/10 text-white/40"
        }`}
      >
        {checked ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" />}
      </span>
      <span className={checked ? "text-sm text-white/90" : "text-sm text-white/90"}>
        {text}
      </span>
    </div>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const msg = `Hola Mister Content, me interesa el paquete ${plan.tier} (${plan.price}${plan.period}). ¿Me das más información?`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative flex h-full flex-col rounded-2xl border p-7 ${
        plan.popular
          ? "border-accent/60 bg-gradient-to-br from-accent/10 to-night-card shadow-[0_8px_50px_rgba(155,127,212,0.18)]"
          : "border-white/10 bg-night-card"
      }`}
    >
      {plan.popular && (
        <span className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
          Más popular
        </span>
      )}

      <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
        {plan.tier}
      </span>

      <div className="mt-4 flex items-end gap-1">
        <span className="font-display text-5xl font-bold text-white">{plan.price}</span>
        <span className="mb-1.5 text-sm text-white/90">{plan.period}</span>
      </div>
      <span className="mt-2 block text-sm text-accent-bright">{plan.bestFor}</span>

      <div className="my-7 space-y-3.5 border-y border-white/10 py-7">
        {plan.benefits.map((b, i) => (
          <BenefitRow key={i} {...b} />
        ))}
      </div>

      <a
        href={waLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative mt-auto inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
          plan.popular
            ? "text-black hover:shadow-[0_0_30px_rgba(155,127,212,0.55)]"
            : "border border-white/20 text-white hover:border-accent hover:text-accent"
        }`}
        style={
          plan.popular
            ? { background: "linear-gradient(110deg, #b89dee 0%, #9b7fd4 50%, #c77dff 100%)" }
            : undefined
        }
      >
        {plan.popular && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 group-hover:translate-x-full"
          />
        )}
        <span className="relative">Quiero este paquete</span>
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="precios" className="relative overflow-hidden border-t border-white/10 bg-night">
      <LazyVisible className="z-0 opacity-60">
        <AuroraShaderBackground />
      </LazyVisible>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-night/55" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-accent"
          >
            Planes y precios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl"
          >
            Planes que <span className="text-gradient">se pagan solos</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Elige el plan que va con tu negocio hoy. Crece cuando quieras, sin
            amarres.
          </p>
        </div>

        {/* Leyenda solo en móvil */}
        <p className="mb-5 flex items-center justify-center gap-2 text-sm font-semibold text-accent md:hidden">
          Desliza para ver los planes
          <MoveHorizontal className="size-4 animate-pulse" />
        </p>

        <div className="-mx-5 flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {plans.map((plan, i) => (
            <div
              key={plan.tier}
              className="min-w-[80%] shrink-0 snap-center sm:min-w-[55%] md:min-w-0 md:shrink"
            >
              <PlanCard plan={plan} index={i} />
            </div>
          ))}
        </div>

        {/* Cotización personalizada */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-white/90">
            ¿Tu negocio necesita algo distinto? Calcula tu plan a la medida en segundos.
          </p>
          <a
            href="https://mrcontentoficial-cloud.github.io/CALCULADORA-CLIENTES/"
            className="cta-pulse animate-[gradient-pan_5s_ease_infinite] group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-10 py-5 text-lg font-bold text-black"
            style={{
              background:
                "linear-gradient(110deg, #b89dee 0%, #9b7fd4 35%, #c77dff 65%, #9b7fd4 100%)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.6),transparent)] transition-transform duration-700 group-hover:translate-x-full"
            />
            <Calculator className="relative size-5" />
            <span className="relative">Calcula tu cotización</span>
          </a>
          <p className="mt-2 text-xs text-white/90">
            Precios en pesos mexicanos más IVA. La inversión publicitaria en Meta
            se cotiza por separado.
          </p>
        </div>
      </div>
    </section>
  );
}
