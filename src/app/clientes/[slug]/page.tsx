import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import ClientGallery from "@/components/ClientGallery";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { clients, getClient } from "@/lib/clients";

export function generateStaticParams() {
  return clients.map((client) => ({ slug: client.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) return { title: "Cliente no encontrado" };

  return {
    title: client.name,
    description: `${client.name} — ${client.tagline}. ${client.description}`,
  };
}

export default async function ClientPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = getClient(slug);

  if (!client) notFound();

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/10 bg-night-soft">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
          <Link
            href="/#clientes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" /> Todos los clientes
          </Link>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={72}
                  height={72}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="font-display text-3xl font-bold text-gradient">
                  {client.name.charAt(0)}
                </span>
              )}
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {client.tagline}
              </span>
              <h1 className="font-display mt-2 text-4xl font-bold tracking-tight md:text-6xl">
                {client.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
            {client.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {client.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <ClientGallery categories={client.categories} />
        </div>
      </section>

      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
