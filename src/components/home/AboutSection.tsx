import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
    return (
        <section className="relative w-full bg-black text-white lg:min-h-screen overflow-hidden flex items-center justify-center py-16 md:py-24">
            <div className="w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-4">
                    {/* Left Content Column */}
                    <div className="w-full lg:w-[55%] flex flex-col items-start text-left relative py-8 px-4 md:px-0">
                        {/* Background pattern - Strictly behind text area only */}
                        <div 
                            className="absolute inset-0 z-0 opacity-[0.08] lg:-left-[15%] lg:w-[130%]"
                            style={{
                                backgroundImage: 'url("/images/hero_2.png")',
                                backgroundSize: 'auto 200px',
                                backgroundRepeat: 'repeat-x',
                                backgroundPosition: 'left center',
                                filter: 'grayscale(1) brightness(0.8) contrast(1.2)'
                            }}
                        />

                        {/* Text Content */}
                        <div className="relative z-10 w-full">
                            <div className="w-full relative pt-8 md:pt-12 mb-6 md:mb-8 z-50">
                                <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[10%] md:ml-[15%]">
                                    WE ARE YAAAS
                                </h2>
                                <div className="w-[75%] md:w-[50%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                            </div>

                            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-normal max-w-2xl ml-[10%] md:ml-[20%] pr-6">
                                Welcome to Yaaas, We are a culture-forward creative agency committed to amplifying African creativity through tailored representation and strategic growth for a curated roster of African talent.
                            </p>
                        </div>
                    </div>

                    {/* Right Image Column */}
                    <div className="w-full lg:w-[45%] flex justify-center lg:justify-end px-6 lg:px-0 relative z-10">
                        <div className="relative w-full max-w-[600px] h-auto aspect-square lg:h-[600px]">
                            <Image
                                src="/images/about2.png"
                                alt="Golden Stool"
                                width={1000}
                                height={1000}
                                className="object-contain drop-shadow-[0_0_50px_rgba(253,218,47,0.15)]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;