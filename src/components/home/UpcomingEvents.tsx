"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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

type Props = {
    settings?: { homepageContent?: Record<string, string> } | null;
    events: EventItem[];
};

export default function UpcomingEvents({ settings, events }: Props) {
    const upcoming = (events || [])
        .filter(event => event.published && new Date(event.date).getTime() >= Date.now())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcoming.length === 0) return null;

    const content = settings?.homepageContent ?? {};
    const eyebrow = content.eventsEyebrow || "What's On";
    const title = content.eventsTitle || "UPCOMING EVENTS";
    const description = content.eventsDescription || "";
    const cta = content.eventsCta || "VIEW FULL GALLERY";
    const href = content.eventsCtaLink || "/gallery";

    return (
        <section className="bg-black text-white py-24 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-8">
                    <p className="text-[#B59431] text-[10px] uppercase tracking-[0.25em] font-bold mb-3">{eyebrow}</p>
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase mb-4 md:mb-6">{title}</h2>
                    <div className="w-64 md:w-80 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {description && <p className="mb-12 md:mb-16 text-[15px] md:text-[17px] font-medium tracking-wide text-gray-100">{description}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {upcoming.map((event, index) => {
                        const card = (
                            <motion.article
                                key={event._id}
                                className="group flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {event.image && <div className="w-full aspect-[4/3] overflow-hidden bg-white/5"><img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>}
                                <div className="pt-5">
                                    <p className="text-[#B59431] text-[10px] uppercase tracking-[0.2em] font-bold">{new Date(event.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</p>
                                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mt-2">{event.title}</h3>
                                    {event.location && <p className="text-white/55 text-xs uppercase tracking-widest mt-2">{event.location}</p>}
                                    {event.description && <p className="text-white/70 text-sm leading-relaxed mt-3 max-w-2xl">{event.description}</p>}
                                    {event.link && <span className="inline-block text-[#B59431] text-[10px] uppercase tracking-widest font-bold mt-5">More details ↗</span>}
                                </div>
                            </motion.article>
                        );
                        return event.link ? <a key={event._id} href={event.link} target="_blank" rel="noopener noreferrer" className="block">{card}</a> : <React.Fragment key={event._id}>{card}</React.Fragment>;
                    })}
                </div>

                <div className="flex justify-center">
                    <Link href={href} className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded font-extrabold text-[12px] md:text-[14px] tracking-[0.15em] hover:bg-gray-200 transition-all uppercase shadow-lg text-center">{cta}</Link>
                </div>
            </div>
        </section>
    );
}
