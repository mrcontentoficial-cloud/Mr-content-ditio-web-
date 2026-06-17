type Props = {
  items: string[];
  reverse?: boolean;
};

export default function Marquee({ items, reverse = false }: Props) {
  const row = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-[marquee-rev_38s_linear_infinite]" : "animate-[marquee_38s_linear_infinite]"
        } group-hover:[animation-play-state:paused]`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-bold text-white/30 md:text-3xl"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
