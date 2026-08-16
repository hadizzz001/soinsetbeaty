import { services, site } from "@/lib/site";

export default function ServicesShowcase() {
  return (
    <>
      {services.map((s, i) => {
        const reverse = i % 2 === 1;
        const tint = i % 2 === 1;
        return (
          <section
            key={s.key}
            className="section-y"
            style={{
              backgroundColor: tint ? "var(--color-section)" : "var(--color-body)",
            }}
          >
            <div className="container-site">
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="shape-media relative mx-auto aspect-[3/4] w-full max-w-sm">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className={reverse ? "lg:pr-8" : "lg:pl-8"}>
                  <p className="eyebrow">{s.name}</p>
                  <h2 className="font-serif mt-4 text-3xl leading-tight md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed opacity-75">
                    {s.description}
                  </p>
                  <ul className="mt-7 flex flex-col gap-3">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-sm opacity-80"
                      >
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
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
