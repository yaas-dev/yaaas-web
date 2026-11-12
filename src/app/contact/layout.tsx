import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact YAAAS — Artist Representation & Partnerships",
  description:
    "Get in touch with YAAAS for artist representation, art acquisitions, creative partnerships, exhibitions and cultural programming.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
