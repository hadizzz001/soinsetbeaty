import { site } from "@/lib/site";
import { getTestimonials, getTreatments } from "@/lib/cms";

export default async function TreatmentsAndReviews() {
  // Both lists are managed from the dashboard.
  const [treatments, testimonials] = await Promise.all([
    getTreatments(),
    getTestimonials(),
  ]);

  return (
    <section
      id="treatments"
      className="section-y"
      style={{ backgroundColor: "var(--color-section)" }}
    >
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Our treatments</p>
            <h2 className="font-serif mt-3 text-3xl leading-tight md:text-[2.4rem]">
              Skincare &amp; aesthetic treatments
            </h2>
            <p className="body-text mt-5 max-w-md">
              Our team has broad expertise across many fields to ensure you
              receive the treatment that actually works and helps you achieve
              your goals.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {treatments.map((t) => (
                <li
                  key={t}
                  className="body-text-sm border-b border-[var(--color-line)] pb-3 tracking-wide"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={site.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-2">Reviews</p>
            <div className="star-row mb-6 text-lg">★★★★★</div>
            <div className="flex flex-col divide-y divide-[var(--color-line)]">
              {testimonials.map((t) => (
                <div key={t.name} className="py-6 first:pt-0">
                  <div className="star-row mb-3 text-xs">★★★★★</div>
                  <p className="body-text-sm">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em]">
                    {t.name}{" "}
                    <span className="font-normal normal-case opacity-60">
                      — {t.source}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
