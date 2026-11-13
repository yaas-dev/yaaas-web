"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Loader2, Plus, Save, Trash2, Eye, EyeOff } from "lucide-react";
import { createEvent, updateEvent, deleteEvent } from "@/actions/eventActions";
import ImageUpload from "@/components/admin/ImageUpload";

type EventItem = {
    _id: string;
    title: string;
    date: string;
    location?: string;
    description?: string;
    image?: string;
    link?: string;
    published: boolean;
};

const emptyEvent = {
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
    link: "",
    published: true,
};

export default function EventsManager({ initialEvents }: { initialEvents: EventItem[] }) {
    const router = useRouter();
    const [events, setEvents] = useState(initialEvents || []);
    const [draft, setDraft] = useState(emptyEvent);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const reset = () => {
        setDraft(emptyEvent);
        setEditingId(null);
    };

    const edit = (event: EventItem) => {
        setEditingId(event._id);
        setDraft({
            title: event.title || "",
            date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
            location: event.location || "",
            description: event.description || "",
            image: event.image || "",
            link: event.link || "",
            published: event.published !== false,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft.title.trim() || !draft.date) {
            alert("Please add an event title and date.");
            return;
        }
        setSaving(true);
        try {
            const payload = { ...draft, date: new Date(draft.date).toISOString() };
            if (editingId) await updateEvent(editingId, payload);
            else await createEvent(payload);
            const refreshed = events.filter(item => item._id !== editingId);
            setEvents([...refreshed, { ...payload, _id: editingId || "new-" + Date.now() } as EventItem].sort((a,b) => a.date.localeCompare(b.date)));
            reset();
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Could not save this event. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const remove = async (id: string) => {
        if (!confirm("Delete this event?")) return;
        await deleteEvent(id);
        setEvents(current => current.filter(event => event._id !== id));
        if (editingId === id) reset();
        router.refresh();
    };

    const togglePublished = async (event: EventItem) => {
        const updated = { ...event, published: !event.published };
        await updateEvent(event._id, updated);
        setEvents(current => current.map(item => item._id === event._id ? updated : item));
        router.refresh();
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <p className="text-[#B59431] text-[10px] uppercase tracking-[0.25em] font-bold mb-3">Website content</p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">Upcoming Events</h1>
                <p className="text-white/40 text-sm mt-3 max-w-2xl">Add the events you want visitors to see. Only published events with a future date appear on the homepage.</p>
            </div>

            <form onSubmit={save} className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-[#B59431] text-xs uppercase tracking-[0.2em] font-bold">{editingId ? "Edit event" : "Add an event"}</h2>
                    {editingId && <button type="button" onClick={reset} className="text-white/50 text-xs hover:text-white">Cancel edit</button>}
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2"><span className="text-white/55 text-[10px] uppercase tracking-widest font-bold">Event title *</span><input required value={draft.title} onChange={e => setDraft({...draft,title:e.target.value})} className="bg-black border border-white/10 p-3 text-sm text-white outline-none focus:border-[#B59431]" /></label>
                    <label className="flex flex-col gap-2"><span className="text-white/55 text-[10px] uppercase tracking-widest font-bold">Date and time *</span><input required type="datetime-local" value={draft.date} onChange={e => setDraft({...draft,date:e.target.value})} className="bg-black border border-white/10 p-3 text-sm text-white outline-none focus:border-[#B59431]" /></label>
                    <label className="flex flex-col gap-2"><span className="text-white/55 text-[10px] uppercase tracking-widest font-bold">Location</span><input value={draft.location} onChange={e => setDraft({...draft,location:e.target.value})} placeholder="City, venue" className="bg-black border border-white/10 p-3 text-sm text-white outline-none focus:border-[#B59431]" /></label>
                    <label className="flex flex-col gap-2"><span className="text-white/55 text-[10px] uppercase tracking-widest font-bold">Event link</span><input type="url" value={draft.link} onChange={e => setDraft({...draft,link:e.target.value})} placeholder="https://" className="bg-black border border-white/10 p-3 text-sm text-white outline-none focus:border-[#B59431]" /></label>
                </div>
                <label className="flex flex-col gap-2"><span className="text-white/55 text-[10px] uppercase tracking-widest font-bold">Short description</span><textarea rows={3} value={draft.description} onChange={e => setDraft({...draft,description:e.target.value})} className="bg-black border border-white/10 p-3 text-sm text-white outline-none focus:border-[#B59431]" /></label>
                <div className="max-w-md"><ImageUpload value={draft.image} onChange={image => setDraft({...draft,image})} label="Event image" folder="yaaas/events" /></div>
                <label className="flex items-center gap-3 text-white/60 text-xs"><input type="checkbox" checked={draft.published} onChange={e => setDraft({...draft,published:e.target.checked})} className="accent-[#B59431]" /> Publish on homepage when the event date is upcoming</label>
                <div className="flex justify-end"><button disabled={saving} className="inline-flex items-center gap-2 bg-[#B59431] text-black px-7 py-3 text-[10px] uppercase tracking-widest font-extrabold disabled:opacity-50">{saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}{saving ? "Saving..." : editingId ? "Update Event" : "Add Event"}</button></div>
            </form>

            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between"><h2 className="text-white font-bold uppercase tracking-widest text-xs">Your events</h2><span className="text-white/35 text-xs">{events.length} listed</span></div>
                {events.length === 0 ? <div className="border border-dashed border-white/10 p-10 text-center text-white/35 text-sm">No events added yet. Add your first event above.</div> : events.map(event => (
                    <article key={event._id} className="bg-[#0a0a0a] border border-white/10 p-5 flex flex-col md:flex-row md:items-center gap-5">
                        {event.image ? <img src={event.image} alt="" className="w-full md:w-36 aspect-video object-cover" /> : <div className="w-full md:w-36 aspect-video bg-white/5 flex items-center justify-center"><CalendarDays className="text-white/20" /></div>}
                        <div className="flex-1 min-w-0"><h3 className="text-white font-bold">{event.title}</h3><p className="text-[#B59431] text-xs mt-1">{new Date(event.date).toLocaleString()}</p>{event.location && <p className="text-white/45 text-xs mt-1">{event.location}</p>}<p className="text-white/35 text-xs mt-2">{event.published ? "Published" : "Hidden"}</p></div>
                        <div className="flex items-center gap-2"><button type="button" onClick={() => togglePublished(event)} title={event.published ? "Hide event" : "Publish event"} className="p-3 border border-white/10 text-white/60 hover:text-[#B59431]">{event.published ? <Eye size={16}/> : <EyeOff size={16}/>}</button><button type="button" onClick={() => edit(event)} className="px-4 py-3 border border-white/10 text-white/70 text-[10px] uppercase tracking-widest hover:text-white">Edit</button><button type="button" onClick={() => remove(event._id)} className="p-3 border border-white/10 text-red-400 hover:bg-red-400/10"><Trash2 size={16}/></button></div>
                    </article>
                ))}
            </section>
        </div>
    );
}
