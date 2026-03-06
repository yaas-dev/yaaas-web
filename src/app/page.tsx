import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import TalentsPreview from "@/components/home/TalentsPreview";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ContactSection from "@/components/home/ContactSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectGallery from "@/components/home/ProjectGallery";
import ArtCatalogueSection from "@/components/home/ArtCatalogueSection";
import LatestNews from "@/components/home/LatestNews";
import { getProjects } from "@/actions/projectActions";
import { getArtworks } from "@/actions/catalogueActions";
import { getNewsPosts } from "@/actions/newsActions";

export default async function Home() {
  // Fetch live data from MongoDB
  const [projects, artworks, news] = await Promise.all([
    getProjects(),
    getArtworks(),
    getNewsPosts()
  ]);

  return (
    <div className="">
      <Hero />
      <AboutSection />
      <Services />
      <TalentsPreview />
      <ProjectGallery projects={projects} />
      <ArtCatalogueSection artworks={artworks} />
      <LatestNews newsPosts={news} />
      <ContactSection />
    </div>
  );
}
