import Hero from "@/components/Hero";
import Clinics from "@/components/Clinics";
import FeatureSection from "@/components/FeatureSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import BlogSection from "@/components/BlogSection";

// Content comes from MongoDB and can change at any time from the dashboard,
// so this page must never be captured as a build-time snapshot.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <>
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
