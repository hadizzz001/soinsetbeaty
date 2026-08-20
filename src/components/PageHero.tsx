type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  meta?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  meta,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[58vh] w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div aria-hidden className="hero-white-spot" />

      <div className="container-site relative z-10 flex min-h-[58vh] flex-col items-start justify-end pb-16 pt-32 md:pb-20 md:pt-40">
        <p className="animate-fade-up eyebrow relative opacity-100">{eyebrow}</p>
        <h1 className="animate-fade-up relative mt-4 w-full max-w-3xl font-serif text-4xl leading-[1.1] md:text-6xl">
          {title}
        </h1>
        <p className="animate-fade-up body-text-hero relative mt-5 w-full max-w-xl">
          {description}
        </p>
        {meta && (
          <p className="animate-fade-up relative mt-5 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
            {meta}
          </p>
        )}
      </div>
    </section>
  );
}
