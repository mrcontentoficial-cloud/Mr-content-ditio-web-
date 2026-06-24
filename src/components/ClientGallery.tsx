"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import type { ClientCategory, MediaItem } from "@/lib/clients";

export default function ClientGallery({
  categories,
}: {
  categories: ClientCategory[];
}) {
  // Solo mostramos las categorías que tienen contenido.
  const filled = categories.filter((c) => c.items.length > 0);
  const [active, setActive] = useState<string>("todos");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  if (filled.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-night-card/50 px-6 py-20 text-center">
        <p className="font-display text-xl font-bold text-white">
          Muy pronto
        </p>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/70">
          Estamos preparando el contenido de este cliente. Vuelve pronto para
          ver sus diseños y reels.
        </p>
      </div>
    );
  }

  const tabs = [{ id: "todos", label: "Todos" }, ...filled.map((c) => ({ id: c.id, label: c.label }))];

  const visible: MediaItem[] =
    active === "todos"
      ? filled.flatMap((c) => c.items)
      : filled.find((c) => c.id === active)?.items ?? [];

  return (
    <div>
      {/* Filtros por categoría */}
      {tabs.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active === tab.id
                  ? "bg-accent text-black"
                  : "border border-white/15 text-white/80 hover:border-accent hover:text-accent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Galería tipo mosaico */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item, i) => (
          <motion.button
            key={item.src + i}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
            onClick={() => setLightbox(item)}
            className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-night-card focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {item.type === "video" ? (
              <>
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt={item.title ?? "Reel"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="size-5 translate-x-0.5 fill-white text-white" />
                  </span>
                </span>
              </>
            ) : (
              <Image
                src={item.src}
                alt={item.title ?? "Diseño"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {item.title && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.title}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Visor / lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-auto max-w-[92vw]"
            >
              {lightbox.type === "video" ? (
                <video
                  src={lightbox.src}
                  poster={lightbox.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[88vh] w-auto rounded-2xl"
                />
              ) : (
                <Image
                  src={lightbox.src}
                  alt={lightbox.title ?? "Diseño"}
                  width={1200}
                  height={1600}
                  className="max-h-[88vh] w-auto rounded-2xl object-contain"
                />
              )}
              {lightbox.title && (
                <p className="mt-3 text-center text-sm font-medium text-white/90">
                  {lightbox.title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
