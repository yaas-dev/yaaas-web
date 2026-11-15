"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings } from "@/actions/settingsActions";

export default function Footer() {
    const pathname = usePathname();
    const [footerLinks, setFooterLinks] = useState({ instagram: "https://www.instagram.com/yaaas.agency", linkedin: "https://ci.linkedin.com/company/yaaas-agency", artsy: "" });

    useEffect(() => {
        getSettings().then((settings) => {\n            const content = settings?.homepageContent || {};\n            setFooterLinks({\n                instagram: content.footerInstagramUrl || "https://www.instagram.com/yaaas.agency",\n                linkedin: content.footerLinkedinUrl || "https://ci.linkedin.com/company/yaaas-agency",\n                artsy: content.footerArtsyUrl || "",\n            });\n        }).catch(() => {});
    }, []);

    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer className="bg-black border-t-4 border-[#B59431] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 mb-24">

                    {/* Logo Section */}
                    <div className="md:w-1/3">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt="Yaa Asantewaa Agency"
                                width={120}
                                height={120}
                                className="h-20 w-auto opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="mt-6 text-sm text-gray-400 font-medium tracking-wide leading-relaxed max-w-sm">
                            A creative agency representing revolutionary visual and sonic artists across the globe.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-2 gap-16 md:gap-24 md:w-2/3 justify-start md:justify-end">

                        <div className="flex flex-col gap-6">
                            <ul className="flex flex-col gap-4 text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-300">
                                {[
                                    { label: "HOME", href: "/" },
                                    { label: "CATALOGUE", href: "/catalogue" },
                                    { label: "CREATIVES", href: "/talents" },
                                    { label: "SERVICES", href: "/services" },
                                    { label: "ABOUT US", href: "/about" },
                                    { label: "CONTENTS", href: "/contents" },
                                    { label: "CONTACT", href: "/contact" },
                                ].map(({ label, href }, index) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className={`${index === 0
                                                ? "text-[13px] tracking-[0.3em] font-bold text-[#B59431] uppercase"
                                                : "hover:text-[#B59431] transition-colors"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                                {artsyUrl && <li><a href={artsyUrl} target="_blank" rel="noreferrer" className="hover:text-[#B59431] transition-colors">ARTSY</a></li>}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-[13px] tracking-[0.3em] font-bold text-[#B59431] uppercase">LINKS</h4>
                            <ul className="flex flex-col gap-4 text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-300">
                                {[
                                    { label: "INSTAGRAM", href: "https://www.instagram.com/yaaas.agency" },
                                    { label: "LINKEDIN", href: "https://ci.linkedin.com/company/yaaas-agency" },
                                ].map(({ label, href }) => (
                                    <li key={label}>
                                        <a href={href} target="_blank" rel="noreferrer" className="hover:text-[#B59431] transition-colors">{label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar: Socials & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/10">
                    <div className="text-center md:text-right text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">
                        <p>© {new Date().getFullYear()} YAA ASANTEWAA AGENCY. ALL RIGHTS RESERVED.</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
