import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { clients } from "@/lib/clients";

export default function Clients() {
  return (
    <section
      id="clientes"
      className="relative overflow-hidden border-t border-white/10 bg-night-soft"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Nuestros clientes
          </span>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Marcas que <span className="text-gradient">confían en nosotros</span>
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            Entra a cada cliente para ver sus diseños, reels y todo el contenido
            que creamos para ellos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <Reveal key={client.slug} delay={i * 0.08}>
              <Link
                href={`/clientes/${client.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-night-card to-night p-8 transition-colors duration-300 hover:border-accent/50"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/10 opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 p-2.5 ring-1 ring-white/10">
                    {client.logo ? (
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="font-display text-2xl font-bold text-gradient">
                        {client.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display mt-6 text-2xl font-bold tracking-tight">
                    {client.name}
                  </h3>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent-bright">
                    {client.tagline}
                  </span>

                  <p className="mt-4 flex-1 leading-relaxed text-white/80">
                    {client.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3 group-hover:text-accent-bright">
                    Ver su contenido <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
