import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
    return (
        <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Text Content */}
                <div className="order-2 lg:order-1">
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6">
                        ABOUT US
                    </h2>
                    {/* Accent Gold Bar */}
                    <div className="w-64 md:w-80 h-[4px] md:h-[6px] bg-[#B59431] mb-10"></div>

                    <p className="text-gray-300 text-[15px] md:text-[17px] font-light leading-[1.8] max-w-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse.
                    </p>
                </div>

                {/* Image Content */}
                <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                        <Image
                            src="/images/about.jpg" // Replace with your actual asset path
                            alt="African Craftsmanship"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* CTA Button - Aligned to the bottom right of the image container on desktop */}
                    <div className="mt-8 w-full flex justify-center lg:justify-end">
                        <Link
                            href="/about"
                            className="bg-white text-black px-10 py-4 rounded font-extrabold text-[12px] md:text-[14px] tracking-[0.15em] hover:bg-gray-200 transition-all uppercase shadow-lg text-center"
                        >
                            LEARN MORE
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;