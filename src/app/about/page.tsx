import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FeatureSection from "@/components/FeatureSection";
import TreatmentsAndReviews from "@/components/TreatmentsAndReviews";
import ConsultationCta from "@/components/ConsultationCta";
import { site } from "@/lib/site";
import { getAbout } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();

  return {
    title: "About us",
    description: about.hero.description,
    alternates: { canonical: `${site.url}/about` },
    openGraph: {
      title: `About us — ${site.name}`,
      description: about.hero.description,
      url: `${site.url}/about`,
      images: [{ url: about.hero.image, width: 1200, height: 630, alt: site.name }],
    },
  };
}

export default async function AboutPage() {
  // Page content is managed from the dashboard.
  const about = await getAbout();

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        description={about.hero.description}
        image={about.hero.image}
      />

      <FeatureSection
        eyebrow={about.story.eyebrow}
        title={about.story.title}
        description={about.story.description}
        cta="Talk to us on WhatsApp"
        image={about.story.image}
      />

      <section
        className="section-y"
        style={{ backgroundColor: "var(--color-section)" }}
      >
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">What we stand for</p>
              <h2 className="font-serif mt-3 text-3xl leading-tight md:text-[2.6rem]">
                The way we work
              </h2>
            </div>
            <p className="body-text max-w-lg">
              Four principles shape every consultation, every treatment plan and
              every follow-up call we make.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {about.values.map((value) => (
              <div
                key={value.title}
                className="border-t border-[var(--color-line)] pt-6"
              >
                <h3 className="font-serif text-xl">{value.title}</h3>
                <p className="body-text mt-3">{value.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 border-t border-[var(--color-line)] pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl md:text-5xl">{stat.value}</p>
                <p className="body-text-sm mt-2 max-w-[14rem]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TreatmentsAndReviews />

      <ConsultationCta />
    </>
  );
}
