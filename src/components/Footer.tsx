"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-[#1a1a1a] pt-24 pb-12">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
                    {/* Logo */}
                    <div>
                        <Link href="/">
                            <Image src="/images/logo.png" alt="Yaa Asantewaa Agency" width={80} height={80} className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-16 md:gap-32">
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] tracking-[0.4em] font-bold text-primary uppercase">NAV</h4>
                            <ul className="flex flex-col gap-3 text-[10px] uppercase tracking-widest font-medium text-muted">
                                {[
                                    { label: "HOME", href: "/" },
                                    { label: "CATALOGUE", href: "/art-catalogue" },
                                    { label: "TALENT", href: "/talents" },
                                    { label: "GALLERY", href: "/projects" },
                                    { label: "CONTACT", href: "/contact" },
                                ].map(({ label, href }) => (
                                    <li key={label}><Link href={href} className="hover:text-primary transition-colors">{label}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] tracking-[0.4em] font-bold text-primary uppercase">LINKS</h4>
                            <ul className="flex flex-col gap-3 text-[10px] uppercase tracking-widest font-medium text-muted">
                                {[
                                    { label: "PROJECTS", href: "/projects" },
                                    { label: "ART CATALOGUE", href: "/art-catalogue" },
                                    { label: "ABOUT US", href: "/about" },
                                    { label: "NEWS", href: "/news" },
                                ].map(({ label, href }) => (
                                    <li key={label}><Link href={href} className="hover:text-primary transition-colors">{label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4 self-center md:self-start">
                        {[Instagram, Linkedin, Youtube].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-[#1a1a1a] text-[9px] uppercase tracking-[0.4em] text-muted font-bold">
                    <p>© 2026 YAA ASANTEWAA AGENCY. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
