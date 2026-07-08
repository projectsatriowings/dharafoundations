import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-admin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dharafoundations.in"),
  title: "Admin Portal | Dhara Foundations",
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: "/logo-icon-only.png?v=4", type: "image/png" }],
    shortcut: ["/logo-icon-only.png?v=4"],
    apple: [{ url: "/logo-icon-only.png?v=4", type: "image/png" }],
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable}`}>
      <head>
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body suppressHydrationWarning className="bg-[#fbf9f4] text-[#1b1c19] font-sans antialiased selection:bg-[#f49b33] selection:text-[#633800]">
        {children}
      </body>
    </html>
  );
}
