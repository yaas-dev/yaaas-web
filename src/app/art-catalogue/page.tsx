"use client";

import Carousel from "@/components/Carousel";
import { useModal } from "@/components/Modal";
import InquiryForm from "@/components/art/InquiryForm";
import { motion } from "framer-motion";

const artworks = [
    {
        id: 1,
        title: "Celestial Echo",
        artist: "Marcus Thorne",
        price: "$12,400",
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Gilded Silence",
        artist: "Elena Vance",
        price: "$8,900",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Primal Rhythm",
        artist: "Julian Kross",
        price: "$15,200",
        image: "https://images.unsplash.com/photo-1515405299443-f71bb798399e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Digital Soul No. 4",
        artist: "Aria Nova",
        price: "$6,500",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 5,
        title: "Fractured Light",
        artist: "Liam Rivers",
        price: "$11,000",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 6,
        title: "Void Symphony",
        artist: "Silas Moon",
        price: "$19,800",
        image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800",
    },
];

const sliderImages = [
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1514349159574-1b09d9d9aba2?auto=format&fit=crop&q=80&w=1600",
];

export default function ArtCatalogue() {
    const { openModal } = useModal();

    const heroSlides = sliderImages.map((img, i) => (
        <div key={i} className="w-full h-full relative">
            <img src={img} alt="Art Slider" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
    ));

    return (
        <div className="pt-32 pb-12 container mx-auto px-4">
            <div className="section-title mb-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">Art Catalogue</h1>
            </div>
            <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl mb-16">
                A curated selection of works from our world-class artists. Explore
                the intersection of visual and sonic arts.
            </p>

            {/* Hero Slider */}
            <section className="h-[50vh] md:h-[60vh] w-full relative overflow-hidden mb-24 border border-white/5">
                <Carousel items={heroSlides} showArrows={false} showDots={true} interval={4000} />
            </section>

            {/* Listing Grid */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <div className="section-title mb-16">
                        <h2 className="text-2xl font-bold tracking-[0.2em]">AVAILABLE WORKS</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {artworks.map((art, index) => (
                            <motion.div
                                key={art.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                                className="group cursor-pointer bg-secondary/30 border border-white/5"
                                onClick={() => openModal(<InquiryForm artworkTitle={art.title} />)}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                    <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
                                        <button className="w-full bg-primary text-black font-bold uppercase tracking-widest py-3 text-[10px]">
                                            INQUIRE TO PURCHASE
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-3">{art.artist}</p>
                                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2 group-hover:text-primary transition-colors italic font-serif">
                                        {art.title}
                                    </h3>
                                    <p className="text-[#666666] text-xs uppercase tracking-widest font-bold">{art.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
        .pt-32 { padding-top: 8rem; }
        .bg-gradient-to-t {
          background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
        }
        .container { max-width: 1400px; margin: 0 auto; }
        .grid { display: grid; }
        .aspect-\[3\/4\] { aspect-ratio: 3 / 4; }
      `}</style>
        </div>
    );
}
