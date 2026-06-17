"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  external = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  }
  function reset() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold";

  const styles =
    variant === "ghost"
      ? "border border-white/20 text-white hover:border-accent hover:text-accent"
      : "text-black shadow-[0_8px_30px_rgba(155,127,212,0.35)] hover:shadow-[0_8px_50px_rgba(155,127,212,0.65)]";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 12, mass: 0.3 }}
      className={`${base} ${styles} ${className}`}
      style={
        variant === "primary"
          ? { background: "linear-gradient(110deg, #b89dee 0%, #9b7fd4 45%, #c77dff 100%)" }
          : undefined
      }
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
