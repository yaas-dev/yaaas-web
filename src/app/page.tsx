import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import TalentsPreview from "@/components/home/TalentsPreview";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ContactSection from "@/components/home/ContactSection";
import AboutSection from "@/components/home/AboutSection";
import ContentGallery from "@/components/home/ContentGallery";
import ArtCatalogueSection from "@/components/home/ArtCatalogueSection";
import BlogSection from "@/components/home/BlogSection";
import WelcomePopup from "@/components/shared/WelcomePopup";
import { getProjects } from "@/actions/projectActions";
import { getArtworks } from "@/actions/catalogueActions";
import { getNewsPosts } from "@/actions/newsActions";
import { getSettings } from "@/actions/settingsActions";
import { getServices } from "@/actions/serviceActions";
import { getTalents } from "@/actions/talentActions";

export default async function Home() {
  // Fetch live data from MongoDB
  const [contents, artworks, news, settings, services, talents] = await Promise.all([
    getProjects(),
    getArtworks(),
    getNewsPosts(),
    getSettings(),
    getServices(),
    getTalents()
  ]);

  return (
    <div className="">
      <Hero settings={settings} />
      <AboutSection />
      <Services services={services} />
      <TalentsPreview initialTalents={talents} />
      <ContentGallery contents={contents} />
      <ArtCatalogueSection artworks={artworks} />
      <BlogSection newsPosts={news} />
      <ContactSection />
      {/* <WelcomePopup /> */}
    </div>
  );
}
