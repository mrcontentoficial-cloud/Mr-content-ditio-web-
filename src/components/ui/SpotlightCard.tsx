"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  delay?: number;
};

export default function SpotlightCard({
  children,
  className = "",
  href,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [active, setActive] = useState(false);

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const inner = (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-night-card transition-colors duration-300 hover:border-accent/50 ${className}`}
    >
      {/* spotlight que sigue el cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(155,127,212,0.18), transparent 42%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="h-full"
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}
