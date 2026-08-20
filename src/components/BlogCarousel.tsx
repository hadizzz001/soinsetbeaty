"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/site";

export default function BlogCarousel({ posts }: { posts: BlogPost[] }) {
  // useState initializer keeps one stable plugin instance without reading a ref in render
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: false }, [
    autoplay,
  ]);

  return (
    <div className="container-site overflow-hidden" ref={emblaRef}>
      <div className="flex -ml-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="min-w-0 shrink-0 grow-0 basis-[68%] pl-8 sm:basis-[38%] lg:basis-[24%]"
          >
            <Link href={`/blog/${post.id}`} className="group flex flex-col">
              <div className="shape-media relative aspect-[3/4] w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-5">
                {post.category} — {post.readTime}
              </p>
              <h3 className="font-serif mt-2 text-lg leading-snug">
                {post.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
