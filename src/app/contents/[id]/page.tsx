import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/actions/projectActions";
import ShareButtons from "@/components/contents/ShareButtons";

export default async function SingleContentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const content = await getProjectById(id);

    if (!content) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#080807] text-white selection:bg-[#B59431] selection:text-black pb-24">
            {/* Header Navigation Space (Accounts for fixed Navbar) */}
            <div className="h-24 md:h-32 w-full bg-black/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/5 flex items-center px-6 md:px-12">
                <Link
                    href="/contents"
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">Back to Contents</span>
                </Link>
            </div>

            {/* Hero Image Section */}
            <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                <Image
                    src={content.mainImage}
                    alt={content.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-black/40 to-black/10" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-[#B59431] text-black px-3 py-1 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                            {content.category}
                        </span>
                        {content.date && (
                            <span className="text-gray-300 text-xs md:text-sm uppercase tracking-widest font-medium">
                                {content.date}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight uppercase tracking-wider">
                        {content.title}
                    </h1>
                </div>
            </section>

            {/* Content Details Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Main Description */}
                <div className="lg:col-span-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-8 text-white/90">
                        Content Overview
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg tracking-wide leading-relaxed mb-12 font-light whitespace-pre-wrap">
                        {content.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {content.galleryImages?.map((img: string, idx: number) => (
                            <div key={idx} className="relative aspect-[4/5] w-full rounded-xl overflow-hidden shadow-2xl border border-white/5">
                                <Image
                                    src={img}
                                    alt={`${content.title} gallery image ${idx + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="lg:col-span-4">
                    <div className="bg-[#111] p-8 md:p-10 rounded-2xl border border-white/5 sticky top-40">
                        <h3 className="text-[#B59431] text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-6">
                            Key Details
                        </h3>
                        {content.details && content.details.length > 0 && content.details[0] !== '' ? (
                            <ul className="flex flex-col gap-6">
                                {content.details.map((detail: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#B59431] mt-2 shrink-0" />
                                        <span className="text-gray-300 text-sm md:text-base tracking-wide flex-1">
                                            {detail}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm italic">No specific details listed.</p>
                        )}

                        <div className="mt-12 pt-8 border-t border-white/10">
                            <h3 className="text-[#B59431] text-xs uppercase tracking-[0.2em] font-bold mb-4">
                                Share Content
                            </h3>
                            <ShareButtons title={content.title} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
