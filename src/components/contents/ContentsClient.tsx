"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowUpRight, Mail } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/newsletterActions";

type Props = { initialContents: any[]; newsPosts: any[] };

export default function ContentsClient({ initialContents, newsPosts }: Props) {
    const [query, setQuery] = useState("");
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState("");

    const term = query.trim().toLowerCase();
    const projects = useMemo(() => initialContents.filter(item =>
        !term || [item.title, item.category, item.description].some(value => String(value || "").toLowerCase().includes(term))
    ), [initialContents, term]);
    const articles = useMemo(() => newsPosts.filter(item =>
        !term || [item.title, item.category, item.contentBlurb, item.fullContent, item.date].some(value => String(value || "").toLowerCase().includes(term))
    ), [newsPosts, term]);

    async function joinNewsletter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        setNewsletterMessage("");
        try {
            const result = await subscribeToNewsletter({ email, firstName: "", consent, website: "" });
            setNewsletterMessage(result.success
                ? (result.alreadySubscribed ? "You're already on the list." : "You're on the list. Thanks for joining us.")
                : (result.error || "Please try again."));
            if (result.success) setEmail("");
        } catch {
            setNewsletterMessage("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#F1EFE8] text-[#171717] pt-32 pb-24">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-20">
                <section className="bg-[#171717] text-[#F1EFE8] px-7 py-12 md:px-14 md:py-16 grid md:grid-cols-[1fr_0.9fr] gap-10 items-center">
                    <div><p className="text-[#B59431] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Join the YAAAS community</p><h2 className="text-3xl md:text-4xl leading-tight">Stay close to African creativity.</h2><p className="text-white/65 text-sm leading-relaxed mt-5 max-w-xl">Get the latest art news, artist highlights, exhibitions, projects and creative ideas from across Africa and its diaspora, straight to your inbox.</p></div>
                    <form onSubmit={joinNewsletter} className="flex flex-col gap-4">
                        <label className="text-[10px] text-white/55 uppercase tracking-widest" htmlFor="journal-newsletter-email">Email address</label>
                        <div className="flex flex-col sm:flex-row gap-2"><input id="journal-newsletter-email" type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-white/5 border border-white/20 px-4 py-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#B59431]"/><button disabled={submitting} className="inline-flex items-center justify-center gap-2 bg-[#B59431] text-black px-6 py-4 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"><Mail size={14}/>{submitting ? "Joining..." : "Subscribe"}</button></div>
                        <label className="flex items-start gap-2 text-[10px] text-white/45 leading-relaxed"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required className="mt-0.5 accent-[#B59431]"/><span>I agree to receive occasional updates from YAAAS. I can unsubscribe at any time.</span></label>
                        {newsletterMessage && <p role="status" aria-live="polite" className="text-xs text-[#D9C58A]">{newsletterMessage}</p>}
                    </form>
                </section>
                <div className="relative w-full max-w-[720px] mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77746D]" size={18} />
                    <input aria-label="Search all YAAAS content" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="SEARCH NEWS, PROJECTS, ARTISTS, TOPICS..." className="w-full bg-white/70 border border-black/15 rounded-sm py-4 pl-12 pr-4 text-[#171717] text-xs tracking-widest outline-none focus:border-[#B59431] placeholder:text-[#77746D]" />
                    <p className="text-[10px] text-[#77746D] tracking-widest uppercase mt-3">{articles.length} articles · {projects.length} case studies</p>
                </div>
                <section aria-labelledby="journal-heading" className="space-y-9">
                    <div className="flex items-center gap-5"><div><p className="text-[#B59431] text-[10px] tracking-[0.25em] uppercase font-bold mb-2">From the YAAAS team</p><h2 id="journal-heading" className="text-2xl md:text-3xl uppercase tracking-[0.18em]">News, Stories & Insights</h2></div><div className="h-px bg-black/10 flex-1 mt-5"/></div>
                    {articles.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map(post => <Link href={`/news/${post._id}`} key={post._id} className="group flex flex-col">
                            <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-[#E4DED0] border border-black/10">
                                {post.image && <Image src={post.image} alt={post.title || "YAAAS journal article"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"/>}
                            </div>
                            <p className="text-[#77746D] text-[10px] tracking-[0.2em] uppercase mb-3">{post.category || "News"}{post.date ? ` · ${post.date}` : ""}</p>
                            <h3 className="text-xl font-bold text-[#171717] leading-snug mb-4 group-hover:text-[#9A7622]">{post.title}</h3>
                            <p className="text-[#55534E] text-sm leading-relaxed line-clamp-4">{post.contentBlurb}</p>
                            <span className="mt-5 flex items-center gap-2 text-[#9A7622] text-[10px] uppercase tracking-[0.2em] font-bold">Read story <ArrowUpRight size={14}/></span>
                        </Link>)}
                    </div> : <p className="text-sm text-[#77746D] py-8">{term ? "No articles match your search." : "New stories coming soon."}</p>}
                    {term && projects.length === 0 && articles.length === 0 && <p className="text-sm text-[#77746D]">Try another keyword or search by artist, exhibition, project or topic.</p>}
                </section>
                <section aria-labelledby="case-studies-heading" className="space-y-9">
                    <div className="flex items-center gap-5"><div><p className="text-[#B59431] text-[10px] tracking-[0.25em] uppercase font-bold mb-2">What we make happen</p><h2 id="case-studies-heading" className="text-2xl md:text-3xl uppercase tracking-[0.18em]">Case Studies & Projects</h2></div><div className="h-px bg-black/10 flex-1 mt-5"/></div>
                    {projects.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((item, index) => <Link href={`/contents/${item._id}`} key={item._id} className="group flex flex-col bg-white/60 border border-black/10 p-5 hover:border-[#B59431]/50 transition-colors">
                            <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[#E4DED0]">
                                {item.mainImage && <Image src={item.mainImage} alt={item.title || "YAAAS creative project"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"/>}
                            </div>
                            <p className="text-[#77746D] text-[10px] tracking-[0.2em] uppercase mb-3">{item.category || "Project"}</p>
                            <h3 className="text-xl font-bold text-[#171717] mb-4 group-hover:text-[#9A7622]">{item.title}</h3>
                            <p className="text-[#55534E] text-sm leading-relaxed line-clamp-4">{item.description}</p>
                            <span className="mt-7 pt-5 border-t border-black/10 flex items-center gap-2 text-[#9A7622] text-[10px] uppercase tracking-[0.2em] font-bold">Explore project <ArrowUpRight size={14}/></span>
                        </Link>)}
                    </div> : <p className="text-sm text-[#77746D] py-8">{term ? "No projects match your search." : "New projects coming soon."}</p>}
                </section>
            </div>
        </main>
    );
}
