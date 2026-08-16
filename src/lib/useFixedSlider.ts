"use client";

import { useEffect, useRef, useState } from "react";

type FixedSliderOptions = {
  intervalMs: number;
  mobileStep: number;
  desktopStep: number;
  breakpoint?: number;
};

/**
 * A seamless "one by one" infinite slider driven by fixed, known card widths
 * (matching the Tailwind width/gap classes used on the cards) instead of
 * measuring the DOM at runtime. This avoids race conditions with
 * ResizeObserver / getBoundingClientRect returning 0 or stale values before
 * layout/images finish loading, which was causing visible glitches.
 */
export function useFixedSlider<T>(items: T[], options: FixedSliderOptions) {
  const { intervalMs, mobileStep, desktopStep, breakpoint = 640 } = options;
  const extended = [...items, items[0]];
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [step, setStep] = useState(mobileStep);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    function apply() {
      setStep(mq.matches ? desktopStep : mobileStep);
    }
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mobileStep, desktopStep, breakpoint]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    if (index === items.length) {
      setWithTransition(false);
      setIndex(0);
    }
  }

  return { extended, index, step, withTransition, trackRef, handleTransitionEnd };
}
