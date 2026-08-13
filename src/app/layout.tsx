import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SplashScreen from "@/components/common/SplashScreen";
import WhatsAppFloatingButton from "@/components/common/WhatsAppFloatingButton";

const siteUrl = "https://precisioncraft.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CasstroDev | Software House Enterprise",
    template: "%s",
  },
  description:
    "Solusi perangkat lunak enterprise dengan rekayasa presisi tinggi. Kami membangun aplikasi web & design system berkinerja tinggi.",
  keywords:
    "software house indonesia, rekayasa perangkat lunak, web architecture, ui ux design system, enterprise software development",
  authors: [{ name: "CasstroDev" }],
  icons: {
    icon: "/images/Logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "CasstroDev",
    locale: "id_ID",
    images: [{ url: "/images/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CasstroDev",
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Sudirman No. 123",
      addressLocality: "Jakarta Pusat",
      addressRegion: "DKI Jakarta",
      postalCode: "10220",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
  };

  return (
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-surface text-on-surface">
        <SplashScreen />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}