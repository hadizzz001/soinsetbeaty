/**
 * Reads the dynamic content managed from the dashboard (the `dash` app).
 *
 * The data is read straight from MongoDB (see `src/app/api/*` for the matching
 * HTTP routes) — no Prisma and no cross-app HTTP call, so a dashboard that is
 * offline can never slow the website down.
 *
 * Every getter still falls back to the static content in `site.ts` when the
 * database is unreachable or empty, so the site always renders.
 */
import { Collections, findAll, getDb, serialize } from "./mongodb";
import {
  about as staticAbout,
  blogPosts as staticBlogPosts,
  footerNav,
  services,
  site,
  testimonials as staticTestimonials,
  treatments as staticTreatments,
  type BlogPost,
} from "./site";

const API_COLLECTIONS: Record<string, string> = {
  "/api/offer-text": Collections.offerText,
  "/api/banner": Collections.banner,
  "/api/clinic": Collections.clinic,
  "/api/blog": Collections.blogPost,
  "/api/concern": Collections.concern,
  "/api/treatment": Collections.treatment,
  "/api/review": Collections.review,
};

async function getJson<T>(path: string): Promise<T | null> {
  try {
    if (path === "/api/about") {
      const db = await getDb();
      const doc = await db.collection(Collections.about).findOne({});
      return serialize(doc) as T | null;
    }

    const collection = API_COLLECTIONS[path];
    if (!collection) return null;
    return (await findAll(collection)) as T;
  } catch {
    // Database down / not configured — callers fall back to static content.
    return null;
  }
}

const isActive = (row: { active?: boolean | null }) => row.active !== false;

const byOrder = (a: { order?: number | null }, b: { order?: number | null }) =>
  (a.order ?? 0) - (b.order ?? 0);

/* ------------------------------------------------------------------ */
/* Announcement bar (offer texts)                                      */
/* ------------------------------------------------------------------ */

export type OfferText = { text: string; icon: string };

type ApiOfferText = {
  id: string;
  text: string;
  icon?: string | null;
  order?: number | null;
  active?: boolean | null;
};

export async function getOfferTexts(): Promise<OfferText[] | null> {
  const rows = await getJson<ApiOfferText[]>("/api/offer-text");
  if (!Array.isArray(rows)) return null;

  const offers = rows
    .filter(isActive)
    .sort(byOrder)
    .map((row) => ({ text: row.text, icon: row.icon || "" }))
    .filter((offer) => offer.text);

  return offers.length ? offers : null;
}

/* ------------------------------------------------------------------ */
/* Hero banner                                                         */
/* ------------------------------------------------------------------ */

export type Banner = {
  image: string;
  mobileImage: string;
  eyebrow: string;
  title: string;
  description: string;
  subtitle: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel: string;
  secondaryLink: string;
};

type ApiBanner = Partial<Banner> & {
  id: string;
  image: string;
  order?: number | null;
  active?: boolean | null;
};

export const fallbackBanner: Banner = {
  image:
    "https://res.cloudinary.com/seukwo8g/image/upload/v1787016050/056a0e05-72ed-4292-9c40-d15d0d1a1ca9_wk6fdy.jpg",
  mobileImage:
    "https://res.cloudinary.com/seukwo8g/image/upload/v1787016004/6271dff7-86e4-44b0-b7ab-771c271e32b0_bpg7tz.jpg",
  eyebrow: site.name,
  title: "Reveal your most beautiful self.",
  description: "Expert care, personalized treatments & visible results.",
  subtitle:
    "Facial Lifting • Tattoo • Microblading • Laser Hair Removal • Body Contouring • Slimming • Skincare • Make Up • Nails",
  primaryLabel: "BOOK YOUR TREATMENT",
  primaryLink: site.waLink,
  secondaryLabel: "Discover our treatments",
  secondaryLink: "#treatments",
};

export async function getBanner(): Promise<Banner> {
  const rows = await getJson<ApiBanner[]>("/api/banner");
  if (!Array.isArray(rows)) return fallbackBanner;

  const banner = rows.filter(isActive).sort(byOrder).find((row) => row.image);
  if (!banner) return fallbackBanner;

  return {
    image: banner.image,
    mobileImage: banner.mobileImage || banner.image,
    eyebrow: banner.eyebrow || "",
    title: banner.title || "",
    description: banner.description || "",
    subtitle: banner.subtitle || "",
    primaryLabel: banner.primaryLabel || "",
    primaryLink: banner.primaryLink || site.waLink,
    secondaryLabel: banner.secondaryLabel || "",
    secondaryLink: banner.secondaryLink || "#treatments",
  };
}

/* ------------------------------------------------------------------ */
/* Clinics                                                             */
/* ------------------------------------------------------------------ */

export type Clinic = {
  key: string;
  title: string;
  name: string;
  image: string;
  description: string;
  points: string[];
};

type ApiClinic = {
  id: string;
  title: string;
  name?: string | null;
  image?: string | null;
  description?: string | null;
  points?: string[] | null;
  order?: number | null;
  active?: boolean | null;
};

const fallbackClinics: Clinic[] = services.map((s) => ({
  key: s.key,
  title: s.title,
  name: s.name,
  image: s.image,
  description: s.description,
  points: s.points,
}));

export async function getClinics(): Promise<Clinic[]> {
  const rows = await getJson<ApiClinic[]>("/api/clinic");
  if (!Array.isArray(rows)) return fallbackClinics;

  const clinics = rows
    .filter(isActive)
    .sort(byOrder)
    .map((row) => ({
      key: row.id,
      title: row.title || "",
      name: row.name || row.title || "",
      image: row.image || "",
      description: row.description || "",
      points: Array.isArray(row.points) ? row.points.filter(Boolean) : [],
    }))
    .filter((clinic) => clinic.title && clinic.image);

  return clinics.length ? clinics : fallbackClinics;
}

/* ------------------------------------------------------------------ */
/* Blog posts                                                          */
/* ------------------------------------------------------------------ */

type ApiBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  category?: string | null;
  readTime?: string | null;
  image?: string | null;
  content?: { heading?: string; text?: string }[] | null;
  published?: boolean | null;
  order?: number | null;
  publishedAt?: string | null;
};

const formatDate = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  // format in UTC so the calendar day never shifts with the server timezone
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await getJson<ApiBlogPost[]>("/api/blog");
  if (!Array.isArray(rows)) return staticBlogPosts;

  const posts = rows
    .filter((row) => row.published !== false)
    .sort(byOrder)
    .map((row) => ({
      id: row.slug,
      title: row.title,
      excerpt: row.excerpt || "",
      date: formatDate(row.publishedAt),
      readTime: row.readTime || "",
      category: row.category || "",
      // never render an empty src if an editor forgot the cover image
      image: row.image || site.ogImage,
      content: Array.isArray(row.content)
        ? row.content
            .map((block) => ({
              heading: block?.heading || undefined,
              text: block?.text || "",
            }))
            .filter((block) => block.heading || block.text)
        : [],
    }))
    .filter((post) => post.id && post.title);

  return posts.length ? posts : staticBlogPosts;
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.id === id);
}

/* ------------------------------------------------------------------ */
/* About page                                                          */
/* ------------------------------------------------------------------ */

export type About = typeof staticAbout;

type ApiAbout = {
  id: string;
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroDescription?: string | null;
  heroImage?: string | null;
  storyEyebrow?: string | null;
  storyTitle?: string | null;
  storyDescription?: string | null;
  storyImage?: string | null;
  values?: { title?: string; text?: string }[] | null;
  stats?: { value?: string; label?: string }[] | null;
};

export async function getAbout(): Promise<About> {
  const row = await getJson<ApiAbout | null>("/api/about");
  if (!row || !row.id) return staticAbout;

  const values = (row.values || [])
    .map((v) => ({ title: v?.title || "", text: v?.text || "" }))
    .filter((v) => v.title || v.text);

  const stats = (row.stats || [])
    .map((s) => ({ value: s?.value || "", label: s?.label || "" }))
    .filter((s) => s.value || s.label);

  return {
    hero: {
      eyebrow: row.heroEyebrow || staticAbout.hero.eyebrow,
      title: row.heroTitle || staticAbout.hero.title,
      description: row.heroDescription || staticAbout.hero.description,
      image: row.heroImage || staticAbout.hero.image,
    },
    story: {
      eyebrow: row.storyEyebrow || staticAbout.story.eyebrow,
      title: row.storyTitle || staticAbout.story.title,
      description: row.storyDescription || staticAbout.story.description,
      image: row.storyImage || staticAbout.story.image,
    },
    values: values.length ? values : staticAbout.values,
    stats: stats.length ? stats : staticAbout.stats,
  };
}

/* ------------------------------------------------------------------ */
/* Footer concerns                                                     */
/* ------------------------------------------------------------------ */

type ApiConcern = {
  id: string;
  name: string;
  order?: number | null;
  active?: boolean | null;
};

export async function getConcerns(): Promise<string[]> {
  const rows = await getJson<ApiConcern[]>("/api/concern");
  if (!Array.isArray(rows)) return footerNav.domaines;

  const concerns = rows
    .filter(isActive)
    .sort(byOrder)
    .map((row) => row.name)
    .filter(Boolean);

  return concerns.length ? concerns : footerNav.domaines;
}

/* ------------------------------------------------------------------ */
/* Treatments list                                                     */
/* ------------------------------------------------------------------ */

type ApiTreatment = {
  id: string;
  name: string;
  order?: number | null;
  active?: boolean | null;
};

export async function getTreatments(): Promise<string[]> {
  const rows = await getJson<ApiTreatment[]>("/api/treatment");
  if (!Array.isArray(rows)) return staticTreatments;

  const names = rows
    .filter(isActive)
    .sort(byOrder)
    .map((row) => row.name)
    .filter(Boolean);

  return names.length ? names : staticTreatments;
}

/* ------------------------------------------------------------------ */
/* Reviews / testimonials                                              */
/* ------------------------------------------------------------------ */

export type Testimonial = { name: string; source: string; text: string };

type ApiReview = {
  id: string;
  name: string;
  description?: string | null;
  source?: string | null;
  order?: number | null;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await getJson<ApiReview[]>("/api/review");
  if (!Array.isArray(rows)) return staticTestimonials;

  const reviews = rows
    .sort(byOrder)
    .map((row) => ({
      name: row.name || "",
      source: row.source || "",
      text: row.description || "",
    }))
    .filter((review) => review.name && review.text);

  return reviews.length ? reviews : staticTestimonials;
}
