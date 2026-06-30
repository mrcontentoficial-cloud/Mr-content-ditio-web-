import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7h2.4l.45-3H13.5V9.1c0-.87.28-1.6 1.65-1.6h1.35V4.85c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.04 1.48-4.04 4.16V11H7.5v3H10v7h3.5Z" />
    </svg>
  );
}

const socials = [
  { Icon: InstagramIcon, label: "Instagram", href: SITE.social.instagram },
  { Icon: FacebookIcon, label: "Facebook", href: SITE.social.facebook },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden border-t border-white/10">
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[150px] animate-aurora"
      />

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-5 py-28 md:px-8 md:py-36 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Columna izquierda: copy + datos */}
        <div>
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-bright">
              Respondemos rápido por WhatsApp
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              ¿Listo para que tu negocio{" "}
              <span className="text-gradient">se vea como debe?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
              Cuéntanos qué necesitas y te respondemos con una propuesta clara.
              Sin compromiso, sin rodeos.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-4 text-white/90">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <MessageCircle size={18} />
                </span>
                Atención directa por WhatsApp
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Clock size={18} />
                </span>
                Respuesta el mismo día hábil
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <MapPin size={18} />
                </span>
                Trabajamos contigo de forma remota
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full border border-white/15 p-3 text-white/90 transition-all hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  <s.Icon />
                </a>
              ))}
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Correo"
                className="rounded-full border border-white/15 p-3 text-white/90 transition-all hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                <Mail size={20} strokeWidth={1.8} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Columna derecha: formulario */}
        <ContactForm />
      </div>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-white/90 md:flex-row md:px-8">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span className="font-medium text-white/90">
            Nos vemos en la próxima 💜
          </span>
        </div>
      </footer>
    </section>
  );
}
