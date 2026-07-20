import type { Metadata } from "next";
import { Roboto_Slab, Montserrat } from "next/font/google";
import "../globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PwaRegistry } from "@/components/pwa/PwaRegistry";
import TreePreloader from "@/components/preloader/TreePreloader";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dharafoundations.in"),
  title: {
    default: "Dhara Foundation - Transforming Lives, Preserving Traditions",
    template: "%s | Dhara Foundation",
  },
  description: "A non-profit organization dedicated to cultural revival, compassionate service, and spiritual awareness across rural communities.",
  keywords: ["NGO", "Dhara Foundation", "Cultural Revival", "Compassionate Service", "Sanatana Dharma", "Charity India", "Rural Development"],
  openGraph: {
    title: "Dhara Foundation - Transforming Lives, Preserving Traditions",
    description: "A non-profit organization dedicated to cultural revival, compassionate service, and spiritual awareness across rural communities.",
    url: "https://dharafoundations.in",
    siteName: "Dhara Foundation",
    images: [
      {
        url: "/logo-icon-only.png?v=4",
        width: 800,
        height: 600,
        alt: "Dhara Foundation Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhara Foundation",
    description: "Dedicated to cultural revival and compassionate service.",
    images: ["/logo-icon-only.png?v=4"],
  },
  icons: {
    icon: [{ url: "/logo-icon-only.png?v=4", type: "image/png" }],
    shortcut: ["/logo-icon-only.png?v=4"],
    apple: [{ url: "/logo-icon-only.png?v=4", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${robotoSlab.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Dhara Foundation",
              url: "https://dharafoundations.in",
              logo: "https://dharafoundations.in/logo-icon-only.png?v=4",
              description: "A non-profit organization dedicated to cultural revival, compassionate service, and spiritual awareness across rural communities.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "techgeninvt@gmail.com",
                contactType: "customer service"
              }
            })
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00322B" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-background text-on-background font-body antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
        <LenisProvider>
          <TreePreloader />
          <PwaRegistry />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
