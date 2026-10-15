/**
 * Cloudinary delivery helpers.
 *
 * Every image and video on the site is hosted on Cloudinary, which resizes and
 * re-encodes on the fly from the URL. Dashboard uploads are often
 * multi-megabyte originals, so pages ask for a resized copy in the best format
 * the browser supports (WebP/AVIF) instead. URLs that are not Cloudinary
 * uploads (e.g. Unsplash) pass through untouched.
 */

const UPLOAD = /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/)/;

export const isCloudinary = (url: string) => UPLOAD.test(url);

const transform = (url: string, params: string) =>
  url.replace(UPLOAD, `$1${params}/`);

/** Image at most `width` px wide (never upscaled), auto format and quality. */
export function cldImage(url: string, width: number) {
  return transform(url, `f_auto,q_auto,c_limit,w_${width}`);
}

/** `srcSet` for a responsive image, or undefined when the URL can't be resized. */
export function cldSrcSet(url: string, widths: number[]) {
  if (!isCloudinary(url)) return undefined;
  return widths.map((w) => `${cldImage(url, w)} ${w}w`).join(", ");
}

/** 1200×630 JPEG crop (subject-aware) for Open Graph / Twitter cards. */
export function cldSocialImage(url: string) {
  return transform(url, "c_fill,g_auto,w_1200,h_630,q_auto,f_jpg");
}

/** Video re-encoded at most `width` px wide. */
export function cldVideo(url: string, width: number) {
  return transform(url, `q_auto,c_limit,w_${width}`);
}

/** First frame of a Cloudinary video as an image, for the `poster` attribute. */
export function cldVideoPoster(url: string, width: number) {
  if (!isCloudinary(url)) return undefined;
  // swap the video extension (or add one) so Cloudinary returns an image
  return transform(url, `so_0,f_auto,q_auto,c_limit,w_${width}`).replace(
    /(\.\w{2,4})?$/,
    ".jpg"
  );
}
