"use client";

import Link from "next/link";
import Image from "next/image";
import ContactSection from "@/components/home/ContactSection";

interface ServicesClientProps {
    services: any[];
    settings?: any;
    featuredProjects?: any[];
}

export default function ServicesClient({ services = [], settings, featuredProjects = [] }: ServicesClientProps) {
    const headerBg = settings?.servicesHeaderImage;
    const getServiceDescription = (service: any) => service.description || "";

    return (
        <main className="bg-[#F1EFE8] text-[#171717]">
            <section className="relative isolate overflow-hidden min-h-[340px] md:min-h-[440px] flex items-end">
                {headerBg && <Image src={headerBg} alt="" fill priority sizes="100vw" className="object-cover -z-20" />}
                <div className={`absolute inset-0 -z-10 ${headerBg ? "bg-black/55" : "bg-[#E8E3D8]"}`} />
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-36 pb-14 md:pb-20">
                    <p className={`text-[10px] md:text-xs uppercase tracking-[0.28em] font-bold mb-5 ${headerBg ? "text-[#D2B65C]" : "text-[#9A7622]"}`}>What we do</p>
                    <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.98] max-w-4xl ${headerBg ? "text-white" : "text-[#171717]"}`}>Creative work.<br className="hidden sm:block"/> Cultural impact.</h1>
                    <p className={`mt-6 max-w-2xl text-sm md:text-lg leading-relaxed ${headerBg ? "text-white/80" : "text-[#55534E]"}`}>We bring strategy, talent and cultural programming together to create opportunities for African creativity to travel further.</p>
                </div>
            </section>

            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-14">
                    <div>
                        <p className="text-[#9A7622] text-[10px] uppercase tracking-[0.28em] font-bold mb-3">Our expertise</p>
                        <h2 className="font-serif text-3xl md:text-5xl">How we work.</h2>
                    </div>
                    <p className="text-[#666158] text-sm leading-relaxed max-w-md">Three connected areas of work, shaped around the needs of artists, brands and cultural partners.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service: any, index: number) => (
                        <article key={service._id || service.id || index} className="bg-white/65 border border-black/10 flex flex-col">
                            <div className="relative aspect-[16/10] bg-[#DED8CC] overflow-hidden">
                                {service.image && <Image src={service.image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />}
                                <span className="absolute top-4 left-4 text-white text-[10px] tracking-[0.2em] bg-black/55 px-3 py-2">{String(index + 1).padStart(2, "0")}</span>
                            </div>
                            <div className="p-6 md:p-7 flex-1">
                                <h3 className="font-serif text-2xl md:text-3xl leading-tight">{service.title}</h3>
                                <p className="text-[#5D5951] text-sm leading-relaxed mt-4">{getServiceDescription(service)}</p>
                            </div>
                        </article>
                    ))}
                </div>
                {services.length === 0 && <p className="text-[#666158] text-sm">Our services are being updated. Please check back soon.</p>}
            </section>

            {featuredProjects.length > 0 && (
                <section className="bg-[#E8E3D8] py-16 md:py-24">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                        <div className="flex items-end justify-between gap-6 mb-10">
                            <div>
                                <p className="text-[#9A7622] text-[10px] uppercase tracking-[0.28em] font-bold mb-3">Selected work</p>
                                <h2 className="font-serif text-4xl md:text-6xl">Ideas in action.</h2>
                            </div>
                            <Link href="/contents" className="hidden sm:inline-flex text-[#9A7622] text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#9A7622]/50 pb-2 hover:text-[#171717] transition-colors">View all work</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProjects.map((project: any) => (
                                <Link href={`/contents/${project._id}`} key={project._id} className="group block">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#292929] mb-5">
                                        {project.mainImage && <Image src={project.mainImage} alt={project.title || "YAAAS project"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
                                    </div>
                                    <p className="text-[#77746D] text-[10px] uppercase tracking-[0.2em] mb-3">{project.category}</p>
                                    <h3 className="font-serif text-2xl md:text-3xl group-hover:text-[#9A7622] transition-colors">{project.title}</h3>
                                    <p className="text-[#55534E] text-sm leading-relaxed mt-3 line-clamp-3">{project.description}</p>
                                    <span className="inline-flex items-center gap-3 text-[#9A7622] text-[10px] uppercase tracking-[0.2em] font-bold mt-6">Explore case study <span className="w-7 h-px bg-[#9A7622] group-hover:w-12 transition-all"/></span>
                                </Link>
                            ))}
                        </div>
                        <div className="sm:hidden mt-8"><Link href="/contents" className="text-[#9A7622] text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#9A7622]/50 pb-2">View all work</Link></div>
                    </div>
                </section>
            )}

            <ContactSection />
        </main>
    );
}
