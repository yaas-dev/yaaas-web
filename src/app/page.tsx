import Hero from "@/components/home/Hero";
import TalentsPreview from "@/components/home/TalentsPreview";
import ContactSection from "@/components/home/ContactSection";
import AboutSection from "@/components/home/AboutSection";
import ContentGallery from "@/components/home/ContentGallery";
import ArtCatalogueSection from "@/components/home/ArtCatalogueSection";
import BlogSection from "@/components/home/BlogSection";
import { getProjects } from "@/actions/projectActions";
import { getArtworks } from "@/actions/catalogueActions";
import { getNewsPosts } from "@/actions/newsActions";
import { getSettings } from "@/actions/settingsActions";
import { getServices } from "@/actions/serviceActions";
import { getTalents } from "@/actions/talentActions";

export default async function Home() {
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
      <AboutSection services={services} settings={settings} />
      <TalentsPreview initialTalents={talents} settings={settings} />
      <ContentGallery contents={contents} settings={settings} />
      <ArtCatalogueSection artworks={artworks} settings={settings} />
      <BlogSection newsPosts={news} settings={settings} />
      <ContactSection settings={settings} />
    </div>
  );
}
