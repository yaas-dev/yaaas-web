"use client";
import React from "react";
import Image from "next/image";
import ContactSection from "../home/ContactSection";
type TeamMember = { id: string; name: string; role: string; bio: string; image?: string; visible?: boolean };
type AboutIntro = { eyebrow: string; headline: string; paragraphOne: string; paragraphTwo: string; image?: string };
const DEFAULT_INTRO: AboutIntro = { eyebrow: "Yaa Asantewaa Agency", headline: "Unleashing the power of African creativity.", paragraphOne: "YAAAS is an independent creative agency working across art, music and culture. We represent artists, develop creative talent and bring cultural ideas to life.", paragraphTwo: "Rooted in Africa and connected to its diaspora, we work with creatives, brands and cultural partners to build meaningful projects, create new opportunities and take African creative expression further.", image: "" };
export default function AboutClient({ team, intro }: { team: TeamMember[]; intro?: Partial<AboutIntro> }) {
    const copy = { ...DEFAULT_INTRO, ...(intro || {}) };
    const people = (team || []).filter(person => person.visible !== false && person.name?.trim());
    const founderIds = new Set(["julie-rozand", "belly-ogunyemi"]);
    const founders = people.filter(person => founderIds.has(person.id));
    const teamMembers = people.filter(person => !founderIds.has(person.id));
    const renderPeople = (members: TeamMember[], startIndex = 0) => members.map((person, index) => <article key={person.id || person.name} className="group">
        <div className="relative aspect-[4/5] bg-[#292929] overflow-hidden mb-5">
            {person.image ? <Image src={person.image} alt={person.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"/> : <div className="absolute inset-0 flex items-center justify-center"><span className="font-serif text-6xl text-[#B59431]/70">{person.name.split(" ").map(part => part[0]).slice(0,2).join("")}</span></div>}
            <span className="absolute top-4 left-4 text-[10px] tracking-widest text-white/60">0{startIndex + index + 1}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl">{person.name}</h3>
        <p className="text-[#B59431] text-[10px] uppercase tracking-[0.18em] font-bold mt-2">{person.role}</p>
        {person.bio && <p className="text-[#F1EFE8]/60 text-sm leading-relaxed mt-4 max-w-md">{person.bio}</p>}
    </article>);
    return <main className="min-h-screen bg-[#F1EFE8] text-[#171717] pt-24 pb-10">
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 md:pt-14 pb-16 md:pb-24">
            <p className="text-[#B59431] text-[10px] md:text-xs uppercase tracking-[0.28em] font-bold mb-5">{copy.eyebrow}</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-[0.95] tracking-tight max-w-5xl">{copy.headline}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-24 items-end mt-12 md:mt-20">
                <div className="text-base md:text-xl leading-relaxed text-[#4D4A43] max-w-3xl">
                    <p>{copy.paragraphOne}</p>
                    <p className="mt-6">{copy.paragraphTwo}</p>
                </div>
                <div className="relative aspect-[4/3] min-h-[250px] md:min-h-[340px] overflow-hidden bg-[#E4E0D6]">
                    {copy.image ? <Image src={copy.image} alt="YAAAS creative work" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover"/> : <div className="absolute inset-0 flex flex-col items-center justify-center border border-black/10 text-[#77746D]"><span className="text-[10px] uppercase tracking-[0.25em] font-bold">Image placeholder</span><span className="font-serif text-4xl mt-3 text-[#B59431]">YAAAS</span></div>}
                </div>
            </div>
        </section>
        <section className="bg-[#171717] text-[#F1EFE8] py-16 md:py-24">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12 md:mb-16">
                    <div><p className="text-[#B59431] text-[10px] uppercase tracking-[0.28em] font-bold mb-4">The people behind the work</p><h2 className="font-serif text-4xl md:text-6xl">Meet the team.</h2></div>
                    <p className="text-white/55 text-sm md:text-base max-w-md leading-relaxed">A team bringing together different experiences and perspectives, with a shared commitment to African creativity.</p>
                </div>
                {founders.length > 0 && <div className="mb-14 md:mb-20">
                    <div className="flex items-center gap-5 mb-7"><h3 className="text-[#B59431] text-[10px] uppercase tracking-[0.28em] font-bold">Founders</h3><div className="h-px bg-white/15 flex-1"/></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-12 max-w-[900px] mx-auto">{renderPeople(founders)}</div>
                </div>}
                {teamMembers.length > 0 && <div>
                    <div className="flex items-center gap-5 mb-7"><h3 className="text-[#B59431] text-[10px] uppercase tracking-[0.28em] font-bold">The team</h3><div className="h-px bg-white/15 flex-1"/></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">{renderPeople(teamMembers, founders.length)}</div>
                </div>}
            </div>
        </section>
        <ContactSection />
    </main>;
}