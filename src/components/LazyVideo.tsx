"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Muted looping video that only starts downloading once it is partly on
 * screen, so it never competes with the hero image on page load (on phones
 * it sits right at the fold). The poster frame shows until then.
 */
export default function LazyVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
}
