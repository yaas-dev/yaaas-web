import { getSettings } from "@/actions/settingsActions";
import AboutIntroForm from "@/components/admin/AboutIntroForm";
export const dynamic = "force-dynamic";
export default async function AboutIntroAdminPage(){const settings=await getSettings();return <AboutIntroForm initialIntro={settings?.aboutIntro}/>}