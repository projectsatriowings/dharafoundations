import type { Metadata } from "next";
import { Roboto_Slab, Montserrat } from "next/font/google";
import "../globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import RingCursor from "@/components/RingCursor/RingCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  title: "Dhara Foundations - Transforming Lives, Preserving Traditions",
  description: "A non-profit organization dedicated to cultural revival, compassionate service, and spiritual awareness.",
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
    <html lang="en" suppressHydrationWarning className={`${robotoSlab.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-background text-on-background font-body antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
        <RingCursor />
        <LenisProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
