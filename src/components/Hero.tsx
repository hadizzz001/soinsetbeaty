import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <img
        src="https://res.cloudinary.com/seukwo8g/image/upload/v1786887798/6bb72c8f-4908-44a8-beb4-0e2264817db3_1_zctabm.jpg"
        alt="Soins et Beauté — aesthetic clinic"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div aria-hidden className="hero-white-spot" />

      <div className="container-site relative z-10 flex h-full flex-col items-start justify-end pb-20 md:pb-28">
        <p className="animate-fade-up eyebrow relative text-white/80 opacity-100">
          Soins et Beauté
        </p>
        <h1 className="animate-fade-up relative mt-4 max-w-2xl font-serif text-4xl leading-[1.1] text-white md:text-6xl">
          Reveal your most beautiful skin
        </h1>
        <p
          className="animate-fade-up relative mt-5 max-w-lg text-sm leading-relaxed md:text-base"
          style={{ color: "#4D4D4D" }}
        >
          An expert team, tailor-made protocols and visible results.
          Discover a new approach to aesthetic care.
        </p>
        <div className="animate-fade-up hero-btn-row relative mt-8 flex flex-wrap gap-4">
          <a
            href={site.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book an appointment
          </a>
          <a href="#treatments" className="btn btn-ghost">
            Discover our treatments
          </a>
        </div>
      </div>
    </section>
  );
}
