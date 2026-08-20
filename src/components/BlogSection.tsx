import Link from "next/link";
import { getBlogPosts } from "@/lib/cms";
import BlogCarousel from "./BlogCarousel";

export default async function BlogSection() {
  // Posts come from the dashboard.
  const posts = await getBlogPosts();

  if (!posts.length) return null;

  return (
    <section
      className="section-y overflow-hidden"
      style={{ backgroundColor: "var(--color-body)" }}
    >
      <div className="container-site">
        <div>
          <p className="eyebrow">Our blog</p>
          <h2 className="font-serif mt-3 text-3xl leading-tight md:text-[2.4rem]">
            Latest from the blog
          </h2>
          <p className="body-text mt-4 max-w-md">
            Stay informed with our tips, advice and useful information on
            skin and body care.
          </p>
          <Link href="/blog" className="btn btn-primary mt-8">
            Read all articles
          </Link>
        </div>
      </div>

      <div className="mt-12 w-full">
        <BlogCarousel posts={posts} />
      </div>
    </section>
  );
}
