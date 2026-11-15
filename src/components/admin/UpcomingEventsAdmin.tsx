"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock3, MapPin, Plus, Save, Trash2, Pencil, X } from "lucide-react";
import { updateSettings } from "@/actions/settingsActions";

type EventItem = { id: string; title: string; date: string; time?: string; location?: string; description?: string; link?: string };
const emptyEvent = (): EventItem => ({ id: `event-${Date.now()}`, title: "", date: "", time: "", location: "", description: "", link: "" });
const field = "w-full bg-black border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#B59431]";
const label = "text-[10px] uppercase tracking-widest font-bold text-white/50";

export default function UpcomingEventsAdmin({ initialEvents }: { initialEvents: EventItem[] }) {
    const router = useRouter();
    const [events, setEvents] = useState<EventItem[]>(initialEvents || []);
    const [draft, setDraft] = useState<EventItem | null>(null);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState("");
    const sorted = useMemo(() => [...events].sort((a,b) => a.date.localeCompare(b.date)), [events]);

    const saveEvent = () => {
        if (!draft || !draft.title.trim() || !draft.date) { setNotice("Please add at least an event title and date."); return; }
        setEvents(old => {
            const exists = old.some(item => item.id === draft.id);
            return exists ? old.map(item => item.id === draft.id ? draft : item) : [...old, draft];
        });
        setDraft(null);
        setNotice("Event added to the agenda. Save changes to publish it.");
    };
    const removeEvent = (id: string) => {
        setEvents(old => old.filter(item => item.id !== id));
        setNotice("Event removed from the draft. Save changes to publish the update.");
    };
    const saveAll = async () => {
        setSaving(true); setNotice("");
        try {
            await updateSettings({ upcomingEvents: events });
            router.refresh();
            setNotice("Upcoming events agenda saved.");
        } catch {
            setNotice("Could not save the agenda. Please try again.");
        } finally { setSaving(false); }
    };
    const updateDraft = (key: keyof EventItem, value: string) => setDraft(old => old ? { ...old, [key]: value } : old);

    return <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div><p className="text-[#B59431] text-[10px] uppercase tracking-[0.25em] font-bold mb-3">Homepage content</p><h1 className="text-3xl md:text-4xl font-bold text-white">Upcoming Events</h1><p className="text-white/40 text-sm mt-3 max-w-2xl">Manage the YAAAS agenda. Add an event with its date and details; upcoming events will automatically appear on the homepage in date order. Past events are hidden from the homepage.</p></div>
            <button type="button" onClick={() => setDraft(emptyEvent())} className="inline-flex items-center gap-2 border border-[#B59431]/50 text-[#B59431] px-5 py-3 text-xs font-bold uppercase tracking-widest"><Plus size={15}/> Add event</button>
        </div>

        {draft && <section className="bg-[#0a0a0a] border border-[#B59431]/30 p-6 md:p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between"><h2 className="text-[#B59431] text-xs uppercase tracking-widest font-bold">{events.some(item => item.id === draft.id) ? "Edit event" : "New event"}</h2><button type="button" onClick={() => setDraft(null)} aria-label="Close event editor" className="text-white/50"><X size={18}/></button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 md:col-span-2"><span className={label}>Event title *</span><input className={field} value={draft.title} onChange={e=>updateDraft("title",e.target.value)} placeholder="Exhibition opening, artist talk, festival..."/></label>
                <label className="flex flex-col gap-2"><span className={label}>Date *</span><input type="date" className={field} value={draft.date} onChange={e=>updateDraft("date",e.target.value)}/></label>
                <label className="flex flex-col gap-2"><span className={label}>Time</span><input type="text" className={field} value={draft.time || ""} onChange={e=>updateDraft("time",e.target.value)} placeholder="e.g. 6:00 PM – 9:00 PM"/></label>
                <label className="flex flex-col gap-2"><span className={label}>Location</span><input className={field} value={draft.location || ""} onChange={e=>updateDraft("location",e.target.value)} placeholder="Venue, city or online"/></label>
                <label className="flex flex-col gap-2"><span className={label}>Event link (optional)</span><input type="url" className={field} value={draft.link || ""} onChange={e=>updateDraft("link",e.target.value)} placeholder="https://..."/></label>
                <label className="flex flex-col gap-2 md:col-span-2"><span className={label}>Details</span><textarea rows={4} className={field} value={draft.description || ""} onChange={e=>updateDraft("description",e.target.value)} placeholder="What is happening? Add a short description for the homepage."/></label>
            </div>
            <div className="flex justify-end gap-3"><button type="button" onClick={()=>setDraft(null)} className="px-5 py-3 text-xs uppercase tracking-widest text-white/50">Cancel</button><button type="button" onClick={saveEvent} className="bg-[#B59431] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest">Add to agenda</button></div>
        </section>}

        <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59431]">Event agenda</h2><p className="text-white/35 text-xs mt-2">{events.length} event{events.length === 1 ? "" : "s"} in your agenda</p></div><button type="button" onClick={saveAll} disabled={saving} className="inline-flex items-center gap-2 bg-[#B59431] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-50"><Save size={15}/>{saving ? "Saving..." : "Save agenda"}</button></div>
        {sorted.length ? <div className="flex flex-col gap-3">{sorted.map(item => {
            const date = new Date(`${item.date}T12:00:00`);
            const past = item.date < new Date().toISOString().slice(0,10);
            return <article key={item.id} className="bg-[#0a0a0a] border border-white/10 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5">
                <div className="w-16 h-16 shrink-0 border border-[#B59431]/40 flex flex-col items-center justify-center"><span className="text-[#B59431] text-xl font-bold">{date.toLocaleDateString("en",{day:"2-digit"})}</span><span className="text-white/45 text-[9px] uppercase tracking-widest">{date.toLocaleDateString("en",{month:"short"})}</span></div>
                <div className="flex-1 min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-white font-semibold">{item.title}</h3><span className={`text-[9px] uppercase tracking-widest px-2 py-1 border ${past ? "border-white/10 text-white/35" : "border-emerald-500/20 text-emerald-400"}`}>{past ? "Past" : "Upcoming"}</span></div><p className="text-white/45 text-xs mt-2">{date.toLocaleDateString("en",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}{item.time ? ` · ${item.time}` : ""}{item.location ? ` · ${item.location}` : ""}</p>{item.description && <p className="text-white/55 text-sm mt-2 line-clamp-2">{item.description}</p>}</div>
                <div className="flex gap-2"><button type="button" onClick={()=>setDraft(item)} className="p-3 border border-white/10 text-white/60 hover:text-[#B59431]" aria-label={`Edit ${item.title}`}><Pencil size={15}/></button><button type="button" onClick={()=>removeEvent(item.id)} className="p-3 border border-white/10 text-red-400/70 hover:text-red-400" aria-label={`Remove ${item.title}`}><Trash2 size={15}/></button></div>
            </article>;
        })}</div> : <div className="border border-dashed border-white/15 p-12 text-center text-white/35 text-sm">No events added yet. Add your first event to start building the agenda.</div>}
        <div className="flex items-center justify-between border-t border-white/10 pt-6"><p role="status" className="text-xs text-white/50">{notice}</p><button type="button" onClick={saveAll} disabled={saving} className="inline-flex items-center gap-2 bg-[#B59431] text-black px-7 py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50"><Save size={15}/>{saving ? "Saving..." : "Save agenda"}</button></div>
    </div>;
}
