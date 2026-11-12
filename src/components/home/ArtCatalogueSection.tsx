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
        <section id="catalogue-section" className="bg-[#F1EFE8] overflow-hidden relative py-14 md:py-20">
            <div className="mx-auto max-w-7xl w-full px-5 md:px-8">

                {/* Section Header */}
                <div className="w-full relative mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase text-[#171717] mb-2">
                        ART CATALOGUE
                    </h2>
                    <div className="w-20 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* The 3D rotating carousel */}
                <div className="flex items-center justify-center">
                    <ArtCatalogue initialArtworks={artworks} />
                </div>

                <Link
                    href={`/catalogue`}
                    className="group inline-flex items-center bg-[#171717] hover:bg-[#B59431] transition-colors px-6 py-3 rounded-md justify-center gap-3 mx-auto mt-4"
                >
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                        Explore Catalogue
                    </span>

                </Link>
            </div>
        </section>
    );
}

