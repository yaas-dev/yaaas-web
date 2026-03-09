import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/components/Modal";
import PageTransition from "@/components/PageTransition";
import Providers from "@/components/Providers";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "YAAAS | Creative Agency",
  description: "YAAAS is a creative agency representing visual and sonic artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Providers>
          <ModalProvider>
            <Header />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}

