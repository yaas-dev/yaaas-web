import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
    return (
        <section className="relative w-full bg-black text-white min-h-screen overflow-hidden flex items-center justify-center">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-15">
                <Image
                    src="/images/hero_2.png"
                    alt="Current Background"
                    fill
                    className="object-cover object-left md:object-center grayscale brightness-[0.4] sepia-[0.3] hue-rotate-[10deg] contrast-125"
                />
            </div>

            <div className="w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
                    {/* Left Content Column */}
                    <div className="w-full lg:w-[100%] flex flex-col items-start text-left">
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

                    {/* Right Image Column */}
                    <div className="w-full lg:w-[45%] flex justify-center lg:justify-end px-6 lg:px-0">
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