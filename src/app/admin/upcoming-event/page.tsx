import { getSettings } from "@/actions/settingsActions";
import UpcomingEventsAdmin from "@/components/admin/UpcomingEventsAdmin";
export const dynamic = "force-dynamic";
export default async function UpcomingEventsAdminPage() {
    const settings = await getSettings();
    return <UpcomingEventsAdmin initialEvents={settings?.upcomingEvents || []} />;
}
