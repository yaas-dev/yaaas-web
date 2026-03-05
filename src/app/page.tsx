"use client";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import TalentsPreview from "@/components/home/TalentsPreview";
import ArtCatalogue from "@/components/home/ArtCatalogue";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ContactSection from "@/components/home/ContactSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectGallery from "@/components/home/ProjectGallery";
import ArtCatalogueSection from "@/components/home/ArtCatalogueSection";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <AboutSection />
      <Services />
      <TalentsPreview />

      <ProjectGallery />
      <ArtCatalogueSection />
      <ContactSection />
    </div>
  );
}
