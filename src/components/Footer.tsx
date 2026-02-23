"use client";

import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-[#1a1a1a] pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
                    {/* Logo Section */}
                    <div className="flex flex-col gap-8">
                        <Link href="/" className="bg-primary w-16 h-16 rounded-full flex items-center justify-center p-2 border border-white/20">
                            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
                                <circle cx="9" cy="9" r="1.5" fill="black" />
                                <circle cx="15" cy="9" r="1.5" fill="black" />
                            </svg>
                        </Link>
                    </div>

                    {/* Links Sections */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] tracking-[0.4em] font-bold text-primary uppercase">NAV</h4>
                            <ul className="flex flex-col gap-3 text-[10px] items-start uppercase tracking-widest font-medium text-[#999999]">
                                <li><Link href="/" className="hover:text-primary">HOME</Link></li>
                                <li><Link href="/services" className="hover:text-primary">SERVICES</Link></li>
                                <li><Link href="/news" className="hover:text-primary">NEWS</Link></li>
                                <li><Link href="/talents" className="hover:text-primary">TALENTS</Link></li>
                                <li><Link href="/contact" className="hover:text-primary">CONTACT</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] tracking-[0.4em] font-bold text-primary uppercase">LINKS</h4>
                            <ul className="flex flex-col gap-3 text-[10px] items-start uppercase tracking-widest font-medium text-[#999999]">
                                <li><Link href="/projects" className="hover:text-primary">PROJECTS</Link></li>
                                <li><Link href="/art-catalogue" className="hover:text-primary">ART CATALOGUE</Link></li>
                                <li><Link href="/about" className="hover:text-primary">ABOUT US</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 self-center md:self-start">
                        <a href="#" className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:text-primary hover:border-primary transition-all">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:text-primary hover:border-primary transition-all">
                            <Linkedin size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:text-primary hover:border-primary transition-all">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-[#1a1a1a] text-[9px] uppercase tracking-[0.4em] text-[#666666] font-bold">
                    <p>© 2026 YAA ASANTEWAA AGENCY. ALL RIGHTS RESERVED.</p>
                </div>
            </div>

            <style jsx>{`
        .bg-black { background-color: #000000; }
        .container { max-width: 1400px; margin: 0 auto; }
      `}</style>
        </footer>
    );
}
