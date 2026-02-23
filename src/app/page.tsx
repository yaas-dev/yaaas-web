"use client";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import TalentsPreview from "@/components/home/TalentsPreview";
import ProjectGallery from "@/components/home/ProjectGallery";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Services />
      <TalentsPreview />
      <ProjectGallery />
      <ContactSection />
    </div>
  );
}
