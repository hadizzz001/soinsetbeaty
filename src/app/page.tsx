import Hero from "@/components/Hero";
import Clinics from "@/components/Clinics";
import FeatureSection from "@/components/FeatureSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import BlogSection from "@/components/BlogSection";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { getClinics } from "@/lib/cms";
import {
  businessJsonLd,
  jsonLdGraph,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/seo";

// Content comes from MongoDB and can change at any time from the dashboard,
// so this page must never be captured as a build-time snapshot.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = pageMetadata({
  title: { absolute: site.title },
  description: site.description,
  path: "/",
  imageAlt: site.name,
});

// Its own async component so the read runs in parallel with the sections
// below (same cards as the carousel and showcase: one cached read).
async function StructuredData() {
  const clinics = await getClinics();

  return (
    <JsonLd
      data={jsonLdGraph(
        websiteJsonLd(),
        businessJsonLd(
          clinics.map((c) => ({ name: c.name, description: c.description }))
        )
      )}
    />
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />

      <Hero />

      <FeatureSection
        eyebrow="Open consultation"
        title="Struggling to choose your treatment? Go for the Open Consultation"
        description="With the Open Consultation at Soins et Beauté, you get a full treatment session — tailor-made for your skin, performed by an expert nurse or aesthetician."
        cta="Book on WhatsApp"
        video="https://res.cloudinary.com/seukwo8g/video/upload/v1787017236/WhatsApp_Video_2026-08-17_at_19.00.19_online-video-cutter.com_1_aol5sd.mp4"
      />

      <Clinics />

      <ServicesShowcase />

      <BlogSection />
    </>
  );
}
