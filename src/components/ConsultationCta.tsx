import { site } from "@/lib/site";

const points = [
  "A treatment precisely tailored to your needs.",
  "The certainty that a treatment is right for you.",
  "The consultation fee is always refunded when you book a treatment.",
];

export default function ConsultationCta() {
  return (
    <section className="section-y" style={{ backgroundColor: "var(--color-body)" }}>
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Consultation</p>
            <h2 className="font-serif mt-4 text-3xl leading-tight md:text-4xl">
              Book a no-obligation consultation today
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed opacity-75">
              A consultation is essential to make sure you get the treatment
              that best matches your needs, your skin, your body and your
              overall situation. We take your health seriously.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1">✦</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <a
              href={site.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              Book on WhatsApp
            </a>
          </div>
          <div className="shape-media relative mx-auto aspect-[3/4] w-full max-w-sm">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop"
              alt="Soins et Beauté consultation"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
