type Partner = {
  name: string;
  logoSrc: string;
};

export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  const loop = [...partners, ...partners];

  return (
    <div className="relative mt-10 overflow-hidden" aria-label="Technology ecosystem">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-soft to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-soft to-transparent sm:w-24" />
      <div className="partner-marquee flex w-max items-center gap-8 py-3 sm:gap-12">
        {loop.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-24 w-52 shrink-0 items-center justify-center rounded-(--radius-media) border border-brand-navy/8 bg-white px-6 sm:h-28 sm:w-60"
          >
            <img
              src={partner.logoSrc}
              alt={partner.name}
              className="h-14 w-auto max-w-[12rem] object-contain sm:h-16 sm:max-w-[13.5rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
