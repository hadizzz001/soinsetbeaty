/**
 * Search-engine helpers: per-page metadata and schema.org structured data.
 *
 * Next.js merges metadata shallowly, so a page that sets `openGraph` replaces
 * the root layout's object entirely. `pageMetadata()` rebuilds the full set
 * (canonical, Open Graph, keywords) so no page loses `og:site_name` or the
 * locale. Twitter cards are filled from Open Graph by Next.js, which is why
 * the root layout only sets the card type.
 */
import type { Metadata } from "next";
import { cldSocialImage, isCloudinary } from "./cloudinary";
import { site, type BlogPost } from "./site";

/** Absolute URL of a site path, matching the canonical URLs Next.js renders. */
export function absoluteUrl(path = "/") {
  return path === "/" ? site.url : new URL(path, site.url).href;
}

/** Open Graph image; Cloudinary images are served as an exact 1200×630 crop. */
export function socialImage(url: string, alt: string) {
  return isCloudinary(url)
    ? { url: cldSocialImage(url), width: 1200, height: 630, alt }
    : { url, alt };
}

type PageSeo = {
  /** A string goes through the root title template (adds the brand). */
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  /** Turns the page into an Open Graph article. */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
  };
};

export function pageMetadata({
  title,
  description,
  path,
  image = site.ogImage,
  imageAlt,
  keywords,
  article,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    typeof title === "string" ? `${title} — ${site.name}` : title.absolute;
  const shared = {
    url,
    siteName: site.name,
    locale: "en_US",
    title: fullTitle,
    description,
    images: [socialImage(image, imageAlt ?? fullTitle)],
  };

  return {
    title,
    description,
    // an explicit `undefined` would wipe the root layout's keywords
    ...(keywords && { keywords }),
    alternates: { canonical: url },
    openGraph: article
      ? { ...shared, type: "article", ...article, authors: [site.name] }
      : { ...shared, type: "website" },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                           */
/* ------------------------------------------------------------------ */

const businessId = `${site.url}/#business`;
const websiteId = `${site.url}/#website`;

const organization = {
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", url: site.logo },
};

/** Wraps nodes in one schema.org graph so they can reference each other by @id. */
export function jsonLdGraph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    alternateName: "Soins et Beaute",
    inLanguage: "en",
    publisher: { "@id": businessId },
  };
}

/** The clinic as a local business, with the treatments shown on the page. */
export function businessJsonLd(
  services: { name: string; description?: string }[]
) {
  return {
    "@type": "BeautySalon",
    "@id": businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    logo: site.logo,
    image: [site.ogImage, cldSocialImage(site.ogImage)],
    telephone: site.phone.replace(/\s/g, ""),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.locality,
      addressCountry: site.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Hazmieh" },
      { "@type": "City", name: "Beirut" },
      { "@type": "Country", name: "Lebanon" },
    ],
    sameAs: [site.instagram, site.facebook],
    hasOfferCatalog: services.length
      ? {
          "@type": "OfferCatalog",
          name: "Beauty & aesthetic treatments",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description || undefined,
            },
          })),
        }
      : undefined,
  };
}

/** Home is added automatically as the first crumb. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })
    ),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.id}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.excerpt || undefined,
    image: isCloudinary(post.image)
      ? [post.image, cldSocialImage(post.image)]
      : [post.image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    articleSection: post.category || undefined,
    inLanguage: "en",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: organization,
  };
}
