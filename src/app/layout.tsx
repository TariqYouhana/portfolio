import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { getSiteSettings } from "@/lib/content";

const fontDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const fontAccent = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tariq Youhana Leon · Data & Software Engineering",
  description:
    "Personal portfolio of Tariq Youhana Leon. Data systems, distributed architectures, visual journals, and technical research.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Tariq Youhana Leon · Portfolio",
    description: "Data and software engineering, photography, history, and technical experiments.",
    url: "https://tariqleon.com",
    siteName: "Tariq Youhana Leon Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121211",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let displayName = "TARIQ YOUHANA LEON";
  try {
    const settings = await getSiteSettings();
    if (settings.display_name) {
      displayName = settings.display_name;
    }
  } catch (e) {
    console.warn("Could not load settings in RootLayout, using fallback:", e);
  }

  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontAccent.variable} ${fontMono.variable} ${fontBody.variable}`}
    >
      <body className="bg-bg text-text selection:bg-signal selection:text-text font-body relative min-h-screen flex flex-col">
        <SkipToContent />
        <NoiseOverlay />
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col pt-24 sm:pt-28">
          {children}
        </main>
        <Footer displayName={displayName} />
      </body>
    </html>
  );
}
