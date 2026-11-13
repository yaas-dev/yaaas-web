import { getEvents } from "@/actions/eventActions";
import EventsManager from "@/components/admin/EventsManager";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
    const events = await getEvents();
    return <EventsManager initialEvents={events} />;
}
