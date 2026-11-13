import Hero from "@/components/home/Hero";
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
import { getEvents } from "@/actions/eventActions";

export default async function Home() {
  const [contents, artworks, news, settings, services, talents, events] = await Promise.all([
    getProjects(),
    getArtworks(),
    getNewsPosts(),
    getSettings(),
    getServices(),
    getTalents(),
    getEvents()
  ]);

  return (
    <div className="">
      <Hero settings={settings} />
      <AboutSection services={services} settings={settings} />
      <TalentsPreview initialTalents={talents} settings={settings} />
      <ContentGallery contents={contents} settings={settings} />
      <UpcomingEvents settings={settings} events={events} />
      <ArtCatalogueSection artworks={artworks} settings={settings} />
      <BlogSection newsPosts={news} settings={settings} />
      <ContactSection settings={settings} />
      {/* <WelcomePopup /> */}
    </div>
  );
}
