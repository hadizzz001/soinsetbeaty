"use client";

import { useEffect, useRef } from "react";
import {
  trackPixel,
  type PixelParams,
  type PixelStandardEvent,
} from "@/lib/pixel";

type Props = {
  event: PixelStandardEvent;
  params?: PixelParams;
};

/**
 * Reports a pixel event once when the page it sits on is shown. Renders
 * nothing, so server components can drop it anywhere:
 *
 *   <PixelEvent event="ViewContent" params={{ content_ids: [id], content_type: "product" }} />
 */
export default function PixelEvent({ event, params }: Props) {
  const signature = `${event}:${JSON.stringify(params ?? {})}`;
  const fired = useRef<string | null>(null);

  useEffect(() => {
    if (fired.current === signature) return;
    fired.current = signature;
    trackPixel(event, params);
  }, [signature, event, params]);

  return null;
}
