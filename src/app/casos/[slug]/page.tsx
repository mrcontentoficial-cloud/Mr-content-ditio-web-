import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { cases, getCase } from "@/lib/cases";
import { waLink } from "@/lib/site";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Caso de éxito" };
  return {
    title: `${c.name} | Casos de éxito`,
    description: c.intro,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/10 bg-night">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[150px]"
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-32 md:px-8 md:pt-36">
          <Link
            href="/#casos"
            className="group inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-accent"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all group-hover:-translate-x-0.5 group-hover:border-accent group-hover:text-accent">
              <ArrowLeft className="size-5" />
            </span>
            Volver a casos
          </Link>

          <div className="mt-10 flex flex-col items-center text-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/15 bg-white/5 p-6 ring-1 ring-accent/30">
              <Image
                src={c.logo}
                alt={c.name}
                width={140}
                height={140}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {c.category}
            </span>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              {c.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              {c.intro}
            </p>
          </div>

          {/* Resultados */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {c.results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="font-bebas text-5xl font-bold tracking-wide text-gradient md:text-6xl">
                  {r.value}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué hicimos */}
      <section className="bg-night-soft">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Qué hicimos
          </h2>
          <ul className="mt-8 space-y-4">
            {c.work.map((w) => (
              <li key={w} className="flex items-start gap-3 text-white/90">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-start gap-3">
            <p className="font-display text-xl font-bold md:text-2xl">
              ¿Quieres resultados así para tu marca?
            </p>
            <ShimmerButton
              href={waLink(
                `Hola Mister Content, vi el caso de ${c.name} y quiero algo así para mi negocio.`
              )}
            >
              Quiero lo mismo para mi negocio
            </ShimmerButton>
          </div>
        </div>
      </section>

      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
