import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { getBlogPost, getBlogPosts } from "@/lib/cms";

// Articles are created/deleted from the dashboard: always render on request
// instead of pre-building the list of slugs.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata(
  props: PageProps<"/blog/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const post = await getBlogPost(id);

  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.id}`,
      type: "article",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[id]">) {
  const { id } = await props.params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) notFound();

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={post.image}
        meta={`${post.date} — ${post.readTime}`}
      />

      <article className="section-y" style={{ backgroundColor: "var(--color-body)" }}>
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            {post.content.map((block, i) => (
              <div key={i} className={i === 0 ? "" : "mt-9"}>
                {block.heading && (
                  <h2 className="font-serif mb-3 text-2xl leading-snug md:text-[1.75rem]">
                    {block.heading}
                  </h2>
                )}
                <p className="body-text">{block.text}</p>
              </div>
            ))}

            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-[var(--color-line)] pt-10">
              <a
                href={site.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book on WhatsApp
              </a>
              <Link href="/blog" className="btn btn-outline">
                All articles
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section
        className="section-y"
        style={{ backgroundColor: "var(--color-section)" }}
      >
        <div className="container-site">
          <p className="eyebrow">Keep reading</p>
          <h2 className="font-serif mt-3 text-3xl leading-tight md:text-[2.4rem]">
            More from the blog
          </h2>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} className="group flex flex-col">
                <div className="shape-media relative aspect-[3/4] w-full">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-5">
                  {p.category} — {p.readTime}
                </p>
                <h3 className="font-serif mt-3 text-xl leading-snug">{p.title}</h3>
                <p className="body-text-sm mt-3">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
