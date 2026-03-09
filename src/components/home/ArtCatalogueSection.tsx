"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Eye, Ear } from "lucide-react";
import ArtCatalogue from "./ArtCatalogue";

interface ArtCatalogueSectionProps {
    artworks?: any[];
}

export default function ArtCatalogueSection({ artworks = [] }: ArtCatalogueSectionProps) {
    return (
        <section id="catalogue-section" className="min-h-screen bg-black overflow-hidden flex flex-col justify-center">
            <div className="flex flex-col h-full w-full mx-auto">

                {/* Section Header */}
                <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        THE YAAAS ART CATALOGUE
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* We pass the dynamic artworks to the 3D rotating component */}
                <ArtCatalogue initialArtworks={artworks} />

                <div className="flex justify-center mt-8">
                    <Link href="/catalogue">
                        <button className="bg-white hover:bg-[#B59431] transition-colors cursor-pointer uppercase text-black font-bold tracking-widest text-xs px-10 py-4 rounded-sm shadow-xl">
                            View Full Collection
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

