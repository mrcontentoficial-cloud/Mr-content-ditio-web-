type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export default function ShimmerButton({
  href,
  children,
  variant = "primary",
  external = true,
  className = "",
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold transition-shadow duration-300";

  if (variant === "ghost") {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${base} border border-white/20 text-white hover:border-accent hover:text-accent ${className}`}
      >
        {/* brillo metálico que cruza */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)] transition-transform duration-700 group-hover:translate-x-full"
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} cta-pulse animate-[gradient-pan_5s_ease_infinite] text-black ${className}`}
      style={{
        background:
          "linear-gradient(110deg, #b89dee 0%, #9b7fd4 35%, #c77dff 65%, #9b7fd4 100%)",
      }}
    >
      {/* brillo metálico que cruza */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.6),transparent)] transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
