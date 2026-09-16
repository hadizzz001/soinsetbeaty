import { site } from "@/lib/site";

// Meta Pixel helpers.
//
// The pixel itself is loaded once by <MetaPixel /> in the root layout, which
// also reports PageView on every navigation. Everything else goes through
// trackPixel(): safe to call from any client code — it is a no-op on the
// server or when the pixel is blocked by the browser.
//
//   trackPixel("ViewContent", { content_ids: ["hifu"], content_type: "product", value: 120, currency: "USD" });
//   trackPixel("AddToCart", { content_ids: ["hifu"], content_type: "product", value: 120, currency: "USD" });
//   trackPixel("InitiateCheckout", { contents: [{ id: "hifu", quantity: 1 }], value: 120, currency: "USD", num_items: 1 });
//   trackPixel("Purchase", { contents: [{ id: "hifu", quantity: 1 }], value: 120, currency: "USD" });
//
// Server components can't call trackPixel() directly: render <PixelEvent />
// (fires once on view) or <WhatsAppLink /> (fires on click) instead.

export const META_PIXEL_ID = site.metaPixelId;

/** Standard events Meta recognises for ads optimisation and reporting. */
export type PixelStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToWishlist"
  | "AddToCart"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "Contact"
  | "Schedule"
  | "CompleteRegistration"
  | "Subscribe"
  | "FindLocation";

/** Standard parameters. `value` + `currency` are required for Purchase. */
export type PixelParams = {
  content_name?: string;
  content_category?: string;
  content_ids?: (string | number)[];
  /** "product" or "product_group" when `content_ids` map to a Meta catalog. */
  content_type?: string;
  contents?: { id: string | number; quantity: number; item_price?: number }[];
  currency?: string;
  value?: number;
  num_items?: number;
  search_string?: string;
  status?: boolean | string;
  predicted_ltv?: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackPixel(event: PixelStandardEvent, params?: PixelParams) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}

/** For anything outside the standard list (e.g. "NewsletterSignup"). */
export function trackPixelCustom(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, params);
}
