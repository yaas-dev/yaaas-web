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
        <section id="catalogue-section" className="h-[90vh] bg-black overflow-hidden flex flex-col justify-center relative py-6 md:py-10">
            <div className="flex flex-col h-full w-full mx-auto justify-between">

                {/* Section Header */}
                <div className="w-full relative pt-0 mb-4 md:mb-6 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-normal tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        ART CATALOGUE
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* The 3D rotating carousel */}
                <div className="flex-1 flex items-center justify-center">
                    <ArtCatalogue initialArtworks={artworks} />
                </div>

                <div className="flex justify-center mt-0 mb-4">
                    <Link href="/catalogue">
                        <button className="bg-white hover:bg-[#B59431] transition-colors cursor-pointer uppercase text-black font-bold tracking-widest text-xs px-10 py-4 rounded-sm shadow-xl">
                            View Catalogue
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

