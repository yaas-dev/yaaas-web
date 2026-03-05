import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
    return (
        <section className="relative w-full min-h-[60vh] lg:min-h-[80vh] max-h-[100vh] bg-black text-white py-12 md:py-16 overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Background image container */}
            <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden">

                <Image
                    src="/images/hero_2.png"
                    alt="About Background"
                    fill
                    className="object-center -rotate-90 scale-[3.0] md:scale-[2.0] lg:scale-[2.5]"
                />
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 w-[75%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center">
                {/* Black background extended fully horizontally */}
                <div className="bg-black/90 w-full py-8 md:py-20 px-4 md:px-10 flex flex-col items-center justify-center border-y border-white/10 shadow-2xl">
                    <div className="w-full text-center">

                        {/* <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                            Yaa Asantewaa, a fearless Ashanti queen, led her people in the Ashanti-British "War of Golden Stool" in 1900, showcasing her courage and dedication to defending her nation's sovereignty. Her leadership and bravery remain a symbol of African <span className='text-[#FDDA2F]'>resistance and empowerment.</span>
                        </p> */}
                        <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                            A culture-forward creative agency dedicated to unleashing African Creativity through tailored representation and strategic growth to a curated group of African Talents
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;