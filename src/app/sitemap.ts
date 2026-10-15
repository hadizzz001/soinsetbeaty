import type { MetadataRoute } from "next";
import { getAbout, getBanner, getBlogPosts, getClinics } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

// Articles are published from the dashboard: list them on every request.
export const dynamic = "force-dynamic";

// Next.js writes these values into the XML verbatim.
const xml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const images = (urls: string[]) => [...new Set(urls.filter(Boolean))].map(xml);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, clinics, banner, about] = await Promise.all([
    getBlogPosts(),
    getClinics(),
    getBanner(),
    getAbout(),
  ]);

  const postDate = (post: (typeof posts)[number]) =>
    post.updatedAt ?? post.publishedAt;
  const latestPost = posts
    .map(postDate)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  return [
    {
      url: xml(absoluteUrl("/")),
      changeFrequency: "weekly",
      priority: 1,
      images: images([banner.image, ...clinics.map((clinic) => clinic.image)]),
    },
    {
      url: xml(absoluteUrl("/about")),
      changeFrequency: "monthly",
      priority: 0.8,
      images: images([about.hero.image, about.story.image]),
    },
    {
      url: xml(absoluteUrl("/blog")),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: xml(absoluteUrl(`/blog/${post.id}`)),
      lastModified: postDate(post),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: images([post.image]),
    })),
  ];
}
