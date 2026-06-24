"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { waLink } from "@/lib/site";

const links = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#casos", label: "Casos de éxito" },
  { href: "/#clientes", label: "Clientes" },
  { href: "/#precios", label: "Precios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-night-soft shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Mister Content"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-display text-lg font-bold tracking-tight">
            Mister<span className="text-accent"> Content</span>
          </span>
        </a>

        {/* Enlaces de texto */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* WhatsApp a la derecha */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hidden overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_24px_rgba(155,127,212,0.5)] md:inline-flex"
          style={{
            background:
              "linear-gradient(110deg, #b89dee 0%, #9b7fd4 50%, #c77dff 100%)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="relative">Hablemos por WhatsApp</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-white md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-night md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-full px-5 py-3 text-center text-base font-semibold text-black"
                style={{
                  background:
                    "linear-gradient(110deg, #b89dee 0%, #9b7fd4 50%, #c77dff 100%)",
                }}
              >
                Hablemos por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
