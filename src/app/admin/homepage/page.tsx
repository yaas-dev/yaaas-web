import { getSettings } from "@/actions/settingsActions";
import HomepageContentForm from "@/components/admin/HomepageContentForm";

export const dynamic = "force-dynamic";

export default async function HomepageEditorPage() {
    const settings = await getSettings();
    return <HomepageContentForm initialData={settings?.homepageContent || {}} />;
}
