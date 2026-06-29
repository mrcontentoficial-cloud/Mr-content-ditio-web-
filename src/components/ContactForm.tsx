"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";

const serviceOptions = [
  "Creación de sitios web",
  "Identidad de marca",
  "Gestión de redes sociales",
  "Creación de contenido",
  "Automatización de WhatsApp",
  "Estrategia digital y publicidad",
  "Aún no lo sé / necesito asesoría",
];

const inputBase =
  "w-full rounded-xl border bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition-all focus:ring-2 focus:ring-accent/30";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    service: serviceOptions[0],
    message: "",
  });
  const [error, setError] = useState("");
  const [sentUrl, setSentUrl] = useState("");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Por favor dinos tu nombre para continuar.");
      return;
    }
    const text =
      `Hola Mister 👋\n\n` +
      `Me llamo *${form.name.trim()}*.\n` +
      (form.business.trim() ? `Negocio: ${form.business.trim()}\n` : "") +
      `Me interesa: ${form.service}\n` +
      (form.message.trim() ? `\nDetalles: ${form.message.trim()}` : "");
    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const nameError = !!error && !form.name.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-night-card p-7 text-left shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:p-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
      />

      <AnimatePresence mode="wait">
        {sentUrl ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 size={36} />
            </span>
            <h3 className="font-display mt-5 text-2xl font-bold tracking-tight">
              ¡Listo, {form.name.split(" ")[0]}!
            </h3>
            <p className="mt-2 max-w-sm text-white/90">
              Te abrimos WhatsApp con tu mensaje listo para enviar. Si no se abrió
              solo, toca el botón de abajo.
            </p>
            <a
              href={sentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-black shadow-[0_8px_30px_rgba(155,127,212,0.35)]"
              style={{ background: "linear-gradient(110deg, #b89dee 0%, #9b7fd4 50%, #c77dff 100%)" }}
            >
              Abrir WhatsApp <Send size={17} />
            </a>
            <button
              onClick={() => setSentUrl("")}
              className="mt-4 text-sm font-medium text-white/60 transition-colors hover:text-accent"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Cuéntanos de tu proyecto
            </h3>
            <p className="mt-2 text-sm text-white/90">
              Llena tus datos y te abrimos WhatsApp con tu mensaje listo para enviar.
            </p>

            <div className="mt-7 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                    <User size={15} className="text-accent" /> Nombre*
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Tu nombre"
                    className={`${inputBase} ${
                      nameError
                        ? "border-red-400/70 focus:border-red-400"
                        : "border-white/10 focus:border-accent"
                    }`}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                    <Building2 size={15} className="text-accent" /> Negocio
                  </span>
                  <input
                    type="text"
                    value={form.business}
                    onChange={(e) => update("business", e.target.value)}
                    placeholder="Nombre de tu negocio"
                    className={`${inputBase} border-white/10 focus:border-accent`}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/90">
                  ¿Qué necesitas?
                </span>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className={`${inputBase} appearance-none border-white/10 bg-[length:18px] bg-[right_1rem_center] bg-no-repeat focus:border-accent`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%239b7fd4' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-night text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                  <MessageSquare size={15} className="text-accent" /> Mensaje
                </span>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Cuéntanos qué tienes en mente…"
                  rows={4}
                  className={`${inputBase} resize-none border-white/10 focus:border-accent`}
                />
              </label>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-black shadow-[0_8px_30px_rgba(155,127,212,0.35)] transition-shadow hover:shadow-[0_8px_50px_rgba(155,127,212,0.6)]"
                style={{ background: "linear-gradient(110deg, #b89dee 0%, #9b7fd4 45%, #c77dff 100%)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative z-10 flex items-center gap-2">
                  Enviar por WhatsApp <Send size={17} />
                </span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
