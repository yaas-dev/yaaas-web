"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, RotateCcw } from "lucide-react";
import { updateSettings } from "@/actions/settingsActions";

const GROUPS = [
    {
        title: "Hero",
        description: "The first thing visitors see when they land on the site.",
        fields: [
            { key: "heroEyebrow", label: "Eyebrow", fallback: "YAH AH-SAHN-TEH-WAH" },
            { key: "heroTitle", label: "Main title", fallback: "YAA ASANTEWAA" },
            { key: "heroDescription", label: "Description", fallback: "Connecting African talent with new audiences, opportunities and ideas.", multiline: true },
            { key: "heroPrimaryCta", label: "Primary button", fallback: "Meet Our Artists" },
            { key: "heroSecondaryCta", label: "Secondary button", fallback: "Explore Our Work" },
        ],
    },
    {
        title: "About & Services",
        description: "The introduction and services heading directly below the hero.",
        fields: [
            { key: "aboutEyebrow", label: "About eyebrow", fallback: "Who We Are" },
            { key: "aboutTitle", label: "About title", fallback: "WE ARE YAAAS" },
            { key: "aboutDescription", label: "About paragraph", fallback: "YAAAS is an independent African creative agency working across contemporary art, artist representation and cultural programming. We represent visual and sonic artists, build creative brands, and develop exhibitions, cultural experiences and partnerships that connect African talent with audiences and opportunities across the continent and diaspora.", multiline: true },
            { key: "servicesEyebrow", label: "Services eyebrow", fallback: "How We Work" },
            { key: "servicesTitle", label: "Services title", fallback: "OUR SERVICES" },
            { key: "servicesCta", label: "Services link", fallback: "Explore All Services" },
        ],
    },
    {
        title: "Artists",
        description: "The heading above the visual and sonic artist cards.",
        fields: [{ key: "talentsTitle", label: "Section title", fallback: "YAAAS CREATIVES" }],
    },
    {
        title: "Selected Projects",
        description: "The projects carousel heading and link.",
        fields: [
            { key: "projectsTitle", label: "Section title", fallback: "SELECTED PROJECTS" },
            { key: "projectsCta", label: "Link text", fallback: "View All Projects" },
        ],
    },
    {
        title: "Art Catalogue",
        description: "The catalogue section heading and button.",
        fields: [
            { key: "catalogueTitle", label: "Section title", fallback: "ART CATALOGUE" },
            { key: "catalogueCta", label: "Button text", fallback: "Explore Catalogue" },
        ],
    },
    {
        title: "Journal",
        description: "The news and journal section heading and link.",
        fields: [
            { key: "journalTitle", label: "Section title", fallback: "BLOG" },
            { key: "journalCta", label: "Link text", fallback: "View All Blogs" },
        ],
    },
    {
        title: "Contact",
        description: "The contact introduction and form call to action.",
        fields: [
            { key: "contactTitle", label: "Section title", fallback: "CONTACT US" },
            { key: "contactDescription", label: "Intro paragraph", fallback: "Whether you are looking for representation, a new addition to your collection, or a creative partnership, we are here to connect. Reach out and let's start the conversation.", multiline: true },
            { key: "contactEnquiriesLabel", label: "Enquiries label", fallback: "General Inquiries" },
            { key: "contactSubmitCta", label: "Submit button", fallback: "Submit" },
        ],
    },
];

export default function HomepageContentForm({ initialData }: { initialData: Record<string, string> }) {
    const router = useRouter();
    const [values, setValues] = useState<Record<string, string>>(initialData || {});
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const setValue = (key: string, value: string) => {
        setValues(current => ({ ...current, [key]: value }));
        setSaved(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSaving(true);
        try {
            await updateSettings({ homepageContent: values });
            router.refresh();
            setSaved(true);
        } catch (error) {
            console.error("Failed to save homepage content:", error);
            alert("Could not save homepage content. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const resetDraft = () => {
        const defaults: Record<string, string> = {};
        GROUPS.forEach(group => group.fields.forEach(field => { defaults[field.key] = ""; }));
        setValues(defaults);
        setSaved(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                <div>
                    <p className="text-[#B59431] text-[10px] uppercase tracking-[0.25em] font-bold mb-3">Website content</p>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">Homepage Editor</h1>
                    <p className="text-white/40 text-sm mt-3 max-w-2xl">Edit the words visitors see across the homepage. Leave a field empty to use its original default copy.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button type="button" onClick={resetDraft} className="inline-flex items-center gap-2 border border-white/10 text-white/60 px-4 py-3 text-[10px] uppercase tracking-widest font-bold hover:border-white/30 hover:text-white transition-colors">
                        <RotateCcw size={14} /> Reset draft
                    </button>
                    <button type="submit" disabled={isSaving} className="inline-flex items-center gap-3 bg-[#B59431] text-black px-7 py-3 font-extrabold text-[10px] tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50">
                        {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {saved && <p role="status" className="text-emerald-400 text-xs tracking-wide">Homepage content saved.</p>}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {GROUPS.map(group => (
                    <section key={group.title} className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-sm flex flex-col gap-6">
                        <div className="border-b border-white/10 pb-4">
                            <h2 className="text-[#B59431] text-xs uppercase tracking-[0.2em] font-bold">{group.title}</h2>
                            <p className="text-white/35 text-xs mt-2">{group.description}</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            {group.fields.map(field => (
                                <label key={field.key} className="flex flex-col gap-2">
                                    <span className="text-white/55 text-[10px] uppercase tracking-widest font-bold">{field.label}</span>
                                    {"multiline" in field && field.multiline ? (
                                        <textarea
                                            value={values[field.key] ?? ""}
                                            onChange={event => setValue(field.key, event.target.value)}
                                            placeholder={field.fallback}
                                            rows={4}
                                            className="w-full bg-black border border-white/10 p-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#B59431] transition-colors resize-y"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={values[field.key] ?? ""}
                                            onChange={event => setValue(field.key, event.target.value)}
                                            placeholder={field.fallback}
                                            className="w-full bg-black border border-white/10 p-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#B59431] transition-colors"
                                        />
                                    )}
                                </label>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
            <div className="flex justify-end border-t border-white/10 pt-6">
                <button type="submit" disabled={isSaving} className="inline-flex items-center gap-3 bg-[#B59431] text-black px-9 py-4 font-extrabold text-[10px] tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50">
                    {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                    {isSaving ? "Saving..." : "Save Homepage"}
                </button>
            </div>
        </form>
    );
}
