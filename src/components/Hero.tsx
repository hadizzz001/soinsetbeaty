import { getBanner } from "@/lib/cms";

export default async function Hero() {
  // Banner images, texts and buttons come from the dashboard.
  const banner = await getBanner();

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <img
        src={banner.mobileImage}
        alt="Soins et Beauté — aesthetic clinic"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      />
      <img
        src={banner.image}
        alt="Soins et Beauté — aesthetic clinic"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />

      <div aria-hidden className="hero-white-spot" />

      <div className="container-site relative z-10 flex h-full flex-col items-start justify-end pb-20 md:pb-28">
        {banner.eyebrow && (
          <p className="animate-fade-up eyebrow relative text-white/80 opacity-100">
            {banner.eyebrow}
          </p>
        )}
        {banner.title && (
          <h1 className="animate-fade-up relative mt-4 w-full max-w-2xl font-serif text-4xl leading-[1.1] text-white md:text-6xl">
            {banner.title}
          </h1>
        )}
        {banner.description && (
          <p
            className="animate-fade-up body-text-hero relative mt-5 w-full max-w-lg"
            style={{ color: "#4D4D4D" }}
          >
            {banner.description}
          </p>
        )}
        {banner.subtitle && (
          <p
            className="animate-fade-up relative mt-3 w-full max-w-xl text-sm font-semibold leading-relaxed md:text-base"
            style={{ color: "#4D4D4D" }}
          >
            {banner.subtitle}
          </p>
        )}
        <div className="animate-fade-up hero-btn-row relative mt-8 flex w-full flex-wrap gap-4">
          {banner.primaryLabel && (
            <a
              href={banner.primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {banner.primaryLabel}
            </a>
          )}
          {banner.secondaryLabel && (
            <a href={banner.secondaryLink} className="btn btn-ghost">
              <span className="hidden sm:inline">{banner.secondaryLabel}</span>
              <span className="sm:hidden">Treatments</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
