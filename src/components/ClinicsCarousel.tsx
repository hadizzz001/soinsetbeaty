"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import type { Clinic } from "@/lib/cms";
import { cldImage } from "@/lib/cloudinary";
import { site } from "@/lib/site";

export default function ClinicsCarousel({ clinics }: { clinics: Clinic[] }) {
  // useState initializer keeps one stable plugin instance without reading a ref in render
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: false }, [
    autoplay,
  ]);

  return (
    <div className="container-site overflow-hidden" ref={emblaRef}>
      <div className="flex -ml-8">
        {clinics.map((clinic) => (
          <div
            key={clinic.key}
            className="min-w-0 shrink-0 grow-0 basis-[68%] pl-8 sm:basis-[38%] lg:basis-[24%]"
          >
            <div className="flex flex-col">
              <div className="shape-media relative aspect-[3/4] w-full">
                <img
                  src={cldImage(clinic.image, 600)}
                  alt={`${clinic.name} at ${site.name}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div
                className="mt-4 flex flex-col gap-2 p-6"
                style={{ backgroundColor: "var(--color-body)" }}
              >
                <h3 className="font-serif text-xl">{clinic.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
