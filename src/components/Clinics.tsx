"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { services, site } from "@/lib/site";

export default function Clinics() {
  const autoplay = useRef(
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: false }, [
    autoplay.current,
  ]);

  return (
    <section
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
          <p className="max-w-lg text-sm leading-relaxed opacity-75">
            Soins et Beauté is a place people choose. Because they want the
            best. The safest. The most professional. We offer a wide range of
            skincare and aesthetic treatments for every need.
          </p>
        </div>
      </div>

      <div className="mt-14 w-full">
        <div className="container-site overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-8">
            {services.map((s) => (
              <div
                key={s.key}
                className="min-w-0 shrink-0 grow-0 basis-[68%] pl-8 sm:basis-[38%] lg:basis-[24%]"
              >
                <div className="flex flex-col">
                  <div className="shape-media relative aspect-[3/4] w-full">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className="mt-4 flex flex-col gap-2 p-6"
                    style={{ backgroundColor: "var(--color-body)" }}
                  >
                    <h3 className="font-serif text-xl">{s.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site">
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[var(--color-line)] pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="star-row text-lg">★★★★★</div>
            <p className="mt-1 text-sm opacity-75">
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
