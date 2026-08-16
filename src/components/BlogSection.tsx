"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { services } from "@/lib/site";

export default function BlogSection() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: false }, [
    autoplay.current,
  ]);

  return (
    <section
      className="section-y overflow-hidden"
      style={{ backgroundColor: "var(--color-body)" }}
    >
      <div className="container-site">
        <div>
          <p className="eyebrow">Our blog</p>
          <h2 className="font-serif mt-3 text-3xl leading-tight md:text-[2.4rem]">
            Latest from the blog
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed opacity-75">
            Stay informed with our tips, advice and useful information on
            skin and body care.
          </p>
        </div>
      </div>

      <div className="mt-12 w-full">
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
                  <h3 className="font-serif mt-5 text-lg leading-snug">
                    {s.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

