import Reveal from "./Reveal";
import ShimmerButton from "./ui/ShimmerButton";
import { WarpBackground } from "./ui/warp-shader";
import { waLink } from "@/lib/site";

export default function ValueProp() {
  return (
    <section id="propuesta" className="relative overflow-hidden bg-night">
      <WarpBackground className="z-0 opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-night/55" />
      <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            La verdad incómoda
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display mt-5 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Tu presencia digital{" "}
            <span className="text-gradient">o vende o estorba.</span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Cada error en tu marca, tu sitio o tus redes le está costando dinero
            y clientes a tu negocio. Combinamos estrategia, contenido y
            desarrollo para que cada punto de contacto trabaje por ti: que te
            encuentren, que te crean y que te compren.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex justify-center">
            <ShimmerButton href={waLink("Hola Mister Content, quiero que mi negocio venda más en digital.")}>
              Quiero que mi negocio venda
            </ShimmerButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
