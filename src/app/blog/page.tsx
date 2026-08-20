import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ConsultationCta from "@/components/ConsultationCta";
import { site } from "@/lib/site";
import { getBlogPosts } from "@/lib/cms";

const intro =
  "Tips, advice and honest information on skin and body care, written by the team that performs the treatments.";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getBlogPosts();

  return {
    title: "Blog",
    description: intro,
    alternates: { canonical: `${site.url}/blog` },
    openGraph: {
      title: `Blog — ${site.name}`,
      description: intro,
      url: `${site.url}/blog`,
      images: posts[0]
        ? [{ url: posts[0].image, width: 1200, height: 630, alt: site.name }]
        : undefined,
    },
  };
}

export default async function BlogPage() {
  // Posts are managed from the dashboard.
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  if (!featured) return null;

  return (
    <>
      <PageHero
        eyebrow="Our blog"
        title="Skin, body and everything in between."
        description={intro}
        image="https://res.cloudinary.com/seukwo8g/image/upload/v1787016004/6271dff7-86e4-44b0-b7ab-771c271e32b0_bpg7tz.jpg"
      />

      <section className="section-y" style={{ backgroundColor: "var(--color-body)" }}>
        <div className="container-site">
          <Link
            href={`/blog/${featured.id}`}
            className="group grid gap-10 lg:grid-cols-2 lg:items-center"
          >
            <div className="shape-media relative aspect-[4/3] w-full">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="eyebrow">
                {featured.category} — {featured.readTime}
              </p>
              <h2 className="font-serif mt-4 text-3xl leading-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="body-text mt-5 max-w-lg">{featured.excerpt}</p>
              <span className="btn btn-primary mt-8">Read the article</span>
            </div>
          </Link>

          <div className="mt-20 grid gap-x-8 gap-y-14 border-t border-[var(--color-line)] pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col">
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
                <h3 className="font-serif mt-3 text-xl leading-snug">
                  {post.title}
                </h3>
                <p className="body-text-sm mt-3">{post.excerpt}</p>
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] opacity-70 transition-opacity group-hover:opacity-100">
                  Read more
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
