import Hero from "@/components/Hero";
import Clinics from "@/components/Clinics";
import FeatureSection from "@/components/FeatureSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <>
      <Hero />

      <FeatureSection
        eyebrow="Open consultation"
        title="Struggling to choose your treatment? Go for the Open Consultation"
        description="With the Open Consultation at Soins et Beauté, you get a full treatment session — tailor-made for your skin, performed by an expert nurse or aesthetician."
        cta="Book on WhatsApp"
        video="https://res.cloudinary.com/seukwo8g/video/upload/v1786886905/AQM7omTIXjvCz8bodSXoknhMC8o-vR0dA38wb5WViFaLdrgZrQT7_jHbpijcE8dckOLMYuPDl3jmdF1YWDJqOb9OuH_955GOeURz3LH_cg_1_r8ylz8.mp4"
      />

      <Clinics />

      <ServicesShowcase />

      <BlogSection />
    </>
  );
}
