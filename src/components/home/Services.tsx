"use client";

import { motion } from "framer-motion";

const servicesList = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet consectetur. Nec nulla amet accumsan egestas sed tincidunt praesent. Lectus sed ac imperdiet mauris. Pellentesque blandit auctor eget nulla lacus at volutpat nulla ullamcorper. Amet elementum tempus sagittis nulla mattis et velit. Sagittis varius adipiscing in ultrices amet quis accumsan in in.At orci sed tortor euismod. Id id ullamcorper maecenas ornare nisl eget urna mauris ut. Lobortis vitae nibh amet consectetur ut feugiat nec ut.",
    },
    {
        id: 2,
        text: "Lorem ipsum dolor sit amet consectetur. Nec nulla amet accumsan egestas sed tincidunt praesent. Lectus sed ac imperdiet mauris. Pellentesque blandit auctor eget nulla lacus at volutpat nulla ullamcorper. Amet elementum tempus sagittis nulla mattis et velit. Sagittis varius adipiscing in ultrices amet quis accumsan in in.At orci sed tortor euismod. Id id ullamcorper maecenas ornare nisl eget urna mauris ut. Lobortis vitae nibh amet consectetur ut feugiat nec ut.",
    },
    {
        id: 3,
        text: "Lorem ipsum dolor sit amet consectetur. Nec nulla amet accumsan egestas sed tincidunt praesent. Lectus sed ac imperdiet mauris. Pellentesque blandit auctor eget nulla lacus at volutpat nulla ullamcorper. Amet elementum tempus sagittis nulla mattis et velit. Sagittis varius adipiscing in ultrices amet quis accumsan in in.At orci sed tortor euismod. Id id ullamcorper maecenas ornare nisl eget urna mauris ut. Lobortis vitae nibh amet consectetur ut feugiat nec ut.",
    }
];

export default function Services() {
    return (
        <section
            id="services"
            className="relative w-full overflow-hidden"
            style={{
                backgroundColor: "#080807",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231c1b16' fill-opacity='1'%3E%3Cpath d='M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM30 4C15.64 4 4 15.64 4 30s11.64 26 26 26 26-11.64 26-26S44.36 4 30 4zm0 46c-11.046 0-20-8.954-20-20S18.954 10 30 10s20 8.954 20 20-8.954 20-20 20zm0-4C21.163 46 14 38.837 14 30s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm0-4c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-4c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
                backgroundPosition: 'center'
            }}
        >
            {/* Header Section */}
            <div className="w-full relative pt-12 md:pt-24 mb-16 md:mb-24 z-50">
                <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6 ml-[10%]">
                    SERVICES
                </h2>
                <div className="w-[75%] md:w-[45%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
            </div>

            {/* Content List */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 flex flex-col gap-16 md:gap-24 items-center">
                {servicesList.map((service, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 w-full max-w-[1000px]`}
                        >
                            {/* Image Placeholder */}
                            <div className="w-[280px] h-[220px] md:w-[350px] md:h-[280px] flex-shrink-0 bg-gray-600/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative flex items-center justify-center">
                                {/* The user will replace this div with their <Image> tag */}
                                <span className="text-white/30 text-sm tracking-widest font-semibold uppercase">Image Placeholder</span>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 text-white text-[15px] md:text-[17px] leading-[1.8] font-light text-center md:text-left">
                                {service.text}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
