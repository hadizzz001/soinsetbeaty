import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnnouncementBar from "@/components/AnnouncementBar";
import MetaPixel from "@/components/MetaPixel";
import { site } from "@/lib/site";
import { socialImage } from "@/lib/seo";
import { GoogleAnalytics } from "@next/third-parties/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Icons come from the file conventions in this folder (favicon.ico, icon.png,
// apple-icon.png). Canonical URLs are set per page, never here: a root
// canonical would be inherited by every page that forgets its own (404s
// included) and point them all at the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "beauty",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [socialImage(site.ogImage, site.name)],
    locale: "en_US",
    type: "website",
  },
  // Title, description and image are filled in from each page's Open Graph.
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFDFA",
};

// AnnouncementBar / Footer read live MongoDB content.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "var(--color-body)" }}
      >
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MetaPixel />
      </body>
      <GoogleAnalytics gaId={site.gaId} />
    </html>
  );
}
