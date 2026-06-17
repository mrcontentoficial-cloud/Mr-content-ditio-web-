const services = [
  "Sitios web",
  "Identidad de marca",
  "Redes sociales",
  "Creación de contenido",
  "Automatización de WhatsApp",
  "Publicidad en Meta Ads",
];

export default function BrandStrip() {
  // se duplica para un loop continuo (la animación va de 0 a -50%)
  const track = [...services, ...services];

  return (
    <section className="relative border-y border-white/10 bg-night-soft py-10 md:py-14">
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.22em] text-accent">
        Lo que hacemos por tu marca
      </p>

      <div className="group relative flex overflow-hidden">
        <div className="flex shrink-0 items-center gap-x-10 pr-10 animate-[marquee_32s_linear_infinite]">
          {track.map((service, i) => (
            <span key={i} className="flex items-center gap-x-10">
              <span className="font-bebas whitespace-nowrap text-4xl font-bold uppercase leading-none tracking-wide text-white md:text-6xl">
                {service}
              </span>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      {/* difuminados laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night-soft to-transparent" />
    </section>
  );
}
