import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/components/Modal";
import PageTransition from "@/components/PageTransition";
import Providers from "@/components/Providers";
import NewsletterPopupController from "@/components/shared/NewsletterPopupController";

import { azonix, modernSans } from "./fonts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const siteUrl = "https://www.yaaas.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YAAAS Agency | African Art, Artists & Cultural Experiences",
    template: "%s | YAAAS Agency",
  },
  description:
    "YAAAS is an independent creative agency championing contemporary African and diasporic creativity through artist representation, brand strategy and cultural programming.",
  applicationName: "YAAAS Agency",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "YAAAS Agency",
    title: "YAAAS Agency | African Art, Artists & Cultural Experiences",
    description:
      "Discover contemporary African and diasporic artists, exhibitions and cultural projects with YAAAS, an independent creative agency.",
    images: [{ url: "/images/hero.png", width: 1200, height: 630, alt: "YAAAS Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YAAAS Agency | African Art, Artists & Cultural Experiences",
    description:
      "Artist representation, creative strategy and cultural programming across Africa and its diaspora.",
    images: ["/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${azonix.variable} ${modernSans.variable} font-sans`}>
        <Providers>
          <ModalProvider>
            <Header />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
            <NewsletterPopupController />
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
