import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section-y" style={{ backgroundColor: "var(--color-body)" }}>
      <div className="container-site">
        <p className="eyebrow">Error 404</p>
        <h1 className="font-serif mt-4 max-w-2xl text-4xl leading-[1.1] md:text-6xl">
          This page could not be found.
        </h1>
        <p className="body-text mt-5 max-w-lg">
          The link may be broken or the page may have moved. Discover our
          treatments, read the blog or message us directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/blog" className="btn btn-outline">
            Read the blog
          </Link>
          <WhatsAppLink content="404 page" className="btn btn-outline">
            Message us on WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
