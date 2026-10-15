import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PixelEvent from "@/components/PixelEvent";
import WhatsAppLink from "@/components/WhatsAppLink";
import JsonLd from "@/components/JsonLd";
import { site, type BlogPost } from "@/lib/site";
import { getBlogPost, getBlogPosts } from "@/lib/cms";
import { cldImage } from "@/lib/cloudinary";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  jsonLdGraph,
  pageMetadata,
} from "@/lib/seo";

// Articles are created/deleted from the dashboard: always render on request
// instead of pre-building the list of slugs.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

const brandSuffix = ` — ${site.name}`;

// Meta description when the editor left the excerpt empty.
function summary(post: BlogPost) {
  const text = post.content.find((block) => block.text)?.text ?? "";
  return text.length > 155 ? `${text.slice(0, 152).trimEnd()}…` : text;
}

export async function generateMetadata(
  props: PageProps<"/blog/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const post = await getBlogPost(id);

  // not-found.tsx supplies the 404 title and noindex.
  if (!post) notFound();

  return pageMetadata({
    // Long titles skip the brand suffix so search results don't cut them off.
    title:
      post.title.length + brandSuffix.length > 60
        ? { absolute: post.title }
        : post.title,
    description: post.excerpt || summary(post) || site.description,
    path: `/blog/${post.id}`,
    image: post.image,
    imageAlt: post.title,
    keywords: [
      post.category,
      "skincare tips",
      "beauty advice Lebanon",
      "aesthetic clinic Hazmieh",
      `${site.name} blog`,
    ].filter(Boolean),
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      section: post.category || undefined,
    },
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[id]">) {
  const { id } = await props.params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) notFound();

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.id}` },
          ])
        )}
      />
      <PixelEvent
        event="ViewContent"
        params={{
          content_ids: [post.id],
          content_name: post.title,
          content_category: post.category,
        }}
      />
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
              <WhatsAppLink
                event="Lead"
                content={`Blog — ${post.title}`}
                className="btn btn-primary"
              >
                Book on WhatsApp
              </WhatsAppLink>
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
                    src={cldImage(p.image, 800)}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
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
