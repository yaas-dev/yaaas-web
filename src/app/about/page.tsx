import type { Metadata } from "next";
import { getSettings } from "@/actions/settingsActions";
import AboutClient from "@/components/about/AboutClient";
export const metadata: Metadata = {
    title: "About YAAAS — African Creative Agency",
    description: "Meet YAAAS, an independent creative agency working across art, music and culture, representing artists and bringing cultural ideas to life.",
    alternates: { canonical: "/about" }
};
export const dynamic = "force-dynamic";
const DEFAULT_TEAM = [
    { id: "julie-rozand", name: "Julie Rozand", role: "Founder & Visual Arts Lead", bio: "Julie founded YAAAS to champion African creativity and build meaningful opportunities for artists across the continent and its diaspora.", image: "", visible: true },
    { id: "belly-ogunyemi", name: "Tayo ‘Belly’ Ogunyemi", role: "Co-founder & Sonic Arts Lead", bio: "Belly brings experience across PR, marketing communications and music, leading YAAAS’ sonic artist representation and music partnerships.", image: "", visible: true },
    { id: "temitayo-oladeji", name: "Temitayo Oladeji", role: "Marketing & Sales", bio: "Temitayo supports YAAAS’ marketing, sales and community engagement, helping connect artists and projects with wider audiences.", image: "", visible: true },
    { id: "valerie-fab-uche", name: "Valerie Fab-Uche", role: "Projects & Partnerships", bio: "Valerie works across project development, artist relations and partnerships, helping bring exhibitions and creative collaborations to life.", image: "", visible: true },
    { id: "tiisetso-skosana", name: "Tiisetso Skosana", role: "Marketing & Sales Support", bio: "Tiisetso works across artist presentation, collector outreach, catalogues and exhibition campaigns.", image: "", visible: true }
];
export default async function AboutPage() {
    const settings = await getSettings();
    return <AboutClient team={settings?.aboutTeam?.length ? settings.aboutTeam : DEFAULT_TEAM} intro={settings?.aboutIntro} />;
}