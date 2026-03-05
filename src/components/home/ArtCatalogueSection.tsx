"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Eye, Ear } from "lucide-react";
import ArtCatalogue from "./ArtCatalogue";



export default function ArtCatalogueSection() {
    return (
        <section id="catalogue-section" className="py-8 md:py-12 bg-black max-h-[100vh] overflow-hidden flex flex-col">
            <div className="flex flex-col h-full w-full mx-auto">

                {/* Section Header */}
                <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        THE YAAAS ART CATALOGUE
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                <ArtCatalogue />
                <div className="flex justify-center">
                    <Link href="/catalogue">
                        <button className="bg-[#FFF] cursor-pointer uppercase text-black px-4 py-2 rounded-md">View Catalogue</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
