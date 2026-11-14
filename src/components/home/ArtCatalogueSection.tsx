"use client";

import Link from "next/link";
import ArtCatalogue from "./ArtCatalogue";

interface ArtCatalogueSectionProps {
    artworks?: any[];
    settings?: any;
}

export default function ArtCatalogueSection({ artworks = [], settings }: ArtCatalogueSectionProps) {
    const copy = settings?.homepageContent || {};
    return (
        <section id="catalogue-section" className="bg-[#F1EFE8] overflow-hidden relative py-14 md:py-20">
            <div className="mx-auto max-w-7xl w-full px-5 md:px-8">
                <div className="w-full relative mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase text-[#171717] mb-2">{copy.catalogueTitle || 'ART CATALOGUE'}</h2>
                    <div className="w-20 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>
                <div className="flex items-center justify-center"><ArtCatalogue initialArtworks={artworks} /></div>
                <Link href={copy.catalogueCtaLink || "/catalogue"} className="group inline-flex items-center bg-[#171717] hover:bg-[#B59431] transition-colors px-6 py-3 rounded-md justify-center gap-3 mx-auto mt-4">
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">{copy.catalogueCta || 'Explore Catalogue'}</span>
                </Link>
            </div>
        </section>
    );
}
