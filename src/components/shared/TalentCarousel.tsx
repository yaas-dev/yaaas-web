"use client";

import React from 'react';
import Image from 'next/image';

const staticTalents = [
    { id: '1', src: '/images/talents/painting.png', name: 'Talent 1', x: -212, z: 250, r: 25 },
    { id: '2', src: '/images/talents/painting.png', name: 'Talent 2', x: -105, z: 60, r: 12 },
    { id: '3', src: '/images/talents/music.png', name: 'Talent 3', x: 0, z: 0, r: 0 },
    { id: '4', src: '/images/talents/sculpting.png', name: 'Talent 4', x: 105, z: 60, r: -12 },
    { id: '5', src: '/images/talents/sculpting.png', name: 'Talent 5', x: 212, z: 250, r: -25 },
];

export default function TalentCarousel() {
    return (
        <div className="relative w-full mx-auto flex items-center justify-center h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden" style={{ perspective: "1000px" }}>
            <div className="absolute top-1/2 left-1/2 w-full h-full" style={{ transformStyle: "preserve-3d", transform: "translate(-50%, -50%)" }}>
                {staticTalents.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={`absolute top-1/2 left-1/2 w-[22%] max-w-[320px] aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:brightness-110 cursor-pointer bg-black`}
                            style={{
                                transform: `translate(-50%, -50%) translateX(${item.x}%) translateZ(${item.z}px) rotateY(${item.r}deg)`,
                                zIndex: item.z === 0 ? 50 : (item.z === 60 ? 40 : 30),
                                boxShadow: item.id === '3' ? "0 25px 50px -12px rgba(0,0,0,0.8)" : "0 10px 15px -3px rgba(0,0,0,0.5)",
                                filter: item.id === '3' ? "brightness(1)" : `brightness(${1 - (Math.abs(item.x) / 1000)})`,
                            }}
                        >
                            <div className="w-full h-full relative">
                                <Image
                                    src={item.src}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 30vw, 25vw"
                                />
                                {/* Overlay gradient for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
