import { getClinics } from "@/lib/cms";
import { site } from "@/lib/site";
import ClinicsCarousel from "./ClinicsCarousel";

export default async function Clinics() {
  // Cards come from the dashboard.
  const clinics = await getClinics();

  return (
    <section
      id="clinics"
      className="section-y overflow-hidden"
      style={{ backgroundColor: "var(--color-section)" }}
    >
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Our clinics</p>
            <h2 className="font-serif mt-3 text-3xl leading-tight md:text-[2.6rem]">
              Leading aesthetic clinics
            </h2>
          </div>
          <p className="body-text max-w-lg">
            Soins et Beauté is a place people choose. Because they want the
            best. The safest. The most professional. We offer a wide range of
            skincare and aesthetic treatments for every need.
          </p>
        </div>
      </div>

      <div className="mt-14 w-full">
        <ClinicsCarousel clinics={clinics} />
      </div>

      <div className="container-site">
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[var(--color-line)] pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="star-row text-lg">★★★★★</div>
            <p className="body-text-sm mt-1">
              5.0 on Google Reviews — over 10,000 treatments performed every
              year
            </p>
          </div>
          <a
            href={site.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book a treatment
          </a>
        </div>
      </div>
    </section>
  );
}
