"use client";
import React from "react";
import Image from "next/image";
import ContactSection from "../home/ContactSection";
type TeamMember = { id: string; name: string; role: string; bio: string; image?: string; visible?: boolean };
export default function AboutClient({ team }: { team: TeamMember[] }) {
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
            <p className="text-[#B59431] text-[10px] md:text-xs uppercase tracking-[0.28em] font-bold mb-5">Yaa Asantewaa Agency</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-[0.95] tracking-tight max-w-5xl">Unleashing the power of <span className="text-[#B59431]">African creativity.</span></h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-24 items-end mt-12 md:mt-20">
                <div className="text-base md:text-xl leading-relaxed text-[#4D4A43] max-w-3xl">
                    <p>YAAAS is an independent creative agency working across art, music and culture. We represent artists, develop creative talent and bring cultural ideas to life.</p>
                    <p className="mt-6">Rooted in Africa and connected to its diaspora, we work with creatives, brands and cultural partners to build meaningful projects, create new opportunities and take African creative expression further.</p>
                </div>
                <div className="bg-[#171717] text-[#F1EFE8] min-h-[250px] md:min-h-[340px] flex flex-col justify-between p-8 md:p-10 relative overflow-hidden">
                    <span className="text-[#B59431] text-xs uppercase tracking-[0.25em]">YAAAS / The agency</span>
                    <div className="font-serif text-6xl md:text-8xl leading-none tracking-tight">YAA<span className="text-[#B59431]">AS</span></div>
                    <p className="text-white/60 text-sm max-w-xs leading-relaxed">A creative agency built around the people, ideas and culture shaping Africa and its diaspora.</p>
                    <div className="absolute -right-10 -top-16 w-56 h-56 rounded-full border border-[#B59431]/30 pointer-events-none"/>
                    <div className="absolute -right-2 -top-8 w-40 h-40 rounded-full border border-[#B59431]/20 pointer-events-none"/>
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
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <div><p className="text-[#B59431] text-[10px] uppercase tracking-[0.28em] font-bold mb-4">What we do</p><h2 className="font-serif text-4xl md:text-6xl leading-tight">Build talent.<br/>Shape ideas.<br/>Create culture.</h2></div>
            <div className="flex flex-col gap-7 text-[#4D4A43] text-base leading-relaxed">
                <p>From representing visual and sonic artists to developing creative strategies and producing cultural experiences, we bring the people, ideas and opportunities together to make things happen.</p>
                <div className="border-t border-black/15 pt-5"><h3 className="font-bold text-[#171717] mb-2">Brand & Creative Strategy</h3><p>Building identities, shaping narratives and developing ideas that connect.</p></div>
                <div className="border-t border-black/15 pt-5"><h3 className="font-bold text-[#171717] mb-2">Talent Development & Representation</h3><p>Helping artists build sustainable careers, find opportunities and reach new audiences.</p></div>
                <div className="border-t border-black/15 pt-5"><h3 className="font-bold text-[#171717] mb-2">Experiential & Cultural Programming</h3><p>Bringing creative ideas into the world through exhibitions, events, collaborations and cultural projects.</p></div>
            </div>
        </section>
        <section className="bg-[#E5DFD2] py-16 md:py-20"><div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div><p className="text-[#B59431] text-[10px] uppercase tracking-[0.28em] font-bold mb-4">Our approach</p><h2 className="font-serif text-4xl md:text-6xl">Culture is the starting point.</h2></div>
            <p className="text-[#4D4A43] leading-relaxed text-base md:text-lg">We believe in doing things with intention: understanding the people behind the work, recognising the value of cultural context and creating opportunities that go beyond a single project. We’re here to build relationships, open doors and contribute to a creative ecosystem where African talent can thrive on its own terms.</p>
        </div></section>
        <ContactSection />
    </main>;
}