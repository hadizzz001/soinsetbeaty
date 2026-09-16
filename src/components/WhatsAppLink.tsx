"use client";

import type { AnchorHTMLAttributes } from "react";
import { site } from "@/lib/site";
import { trackPixel } from "@/lib/pixel";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
> & {
  /** "Lead" for booking CTAs, "Contact" for plain chat links. */
  event?: "Lead" | "Contact";
  /** What the visitor was looking at when they tapped: a treatment, an article, a placement. */
  content: string;
};

/** Opens WhatsApp in a new tab and reports the tap to the Meta Pixel. */
export default function WhatsAppLink({
  event = "Contact",
  content,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href={site.waLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackPixel(event, { content_name: content, content_category: "WhatsApp" });
        onClick?.(e);
      }}
    />
  );
}
