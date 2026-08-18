import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <img
        src="https://res.cloudinary.com/seukwo8g/image/upload/v1787016004/6271dff7-86e4-44b0-b7ab-771c271e32b0_bpg7tz.jpg"
        alt="Soins et Beauté — aesthetic clinic"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      />
      <img
        src="https://res.cloudinary.com/seukwo8g/image/upload/v1787016050/056a0e05-72ed-4292-9c40-d15d0d1a1ca9_wk6fdy.jpg"
        alt="Soins et Beauté — aesthetic clinic"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />

      <div aria-hidden className="hero-white-spot" />

      <div className="container-site relative z-10 flex h-full flex-col items-start justify-end pb-20 md:pb-28">
        <p className="animate-fade-up eyebrow relative text-white/80 opacity-100">
          Soins et Beauté
        </p>
        <h1 className="animate-fade-up relative mt-4 w-full max-w-2xl font-serif text-4xl leading-[1.1] text-white md:text-6xl">
          Reveal your most beautiful self.
        </h1>
        <p
          className="animate-fade-up relative mt-5 w-full max-w-lg text-sm leading-relaxed md:text-base"
          style={{ color: "#4D4D4D" }}
        >
          Expert care, personalized treatments &amp; visible results.
        </p>
        <p
          className="animate-fade-up relative mt-3 w-full max-w-xl text-xs leading-relaxed md:text-sm"
          style={{ color: "#4D4D4D" }}
        >
          Facial Lifting • Tattoo • Microblading • Laser Hair Removal • Body
          Contouring • Slimming • Skincare • Make Up • Nails
        </p>
        <div className="animate-fade-up hero-btn-row relative mt-8 flex w-full flex-wrap gap-4">
          <a
            href={site.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            BOOK YOUR TREATMENT
          </a>
          <a href="#treatments" className="btn btn-ghost">
            <span className="hidden sm:inline">Discover our treatments</span>
            <span className="sm:hidden">Treatments</span>
          </a>
        </div>
      </div>
    </section>
  );
}
