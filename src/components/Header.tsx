"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';


const NAV_LINKS = [
    { name: "HOME", href: "/" },
    { name: "CATALOGUE", href: "/art-catalogue" },
    { name: "TALENT", href: "/talents" },
    { name: "SERVICES", href: "/services" },
    { name: "GALLERY", href: "/projects" },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'CATALOGUE', href: '/catalogue' },
        { name: 'TALENT', href: '/talents' },
        { name: 'GALLERY', href: '/projects' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-black/80 md:bg-black/90 text-white py-4 border-b-2 border-[#B59431]/20">
            <div className=" mx-auto flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <div className="relative w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24">
                        <Image
                            src="/images/logo.png"
                            alt="YAA ASANTEWAA AGENCY"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[13px] font-bold tracking-[0.15em] transition-colors hover:text-[#B59431] ${isActive(link.href) ? 'text-[#B59431]' : 'text-[#e0e0e0]'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="bg-[#B59431] text-black px-6 py-2 rounded font-extrabold text-[13px] tracking-[0.15em] hover:bg-[#d4ae3b] transition-all"
                    >
                        CONTACT
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed inset-0 z-50 bg-black transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out md:hidden`}
            >
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-end">
                        <button onClick={() => setIsOpen(false)} className="text-[#B59431]">
                            <X size={32} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center flex-grow space-y-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-xl font-bold tracking-[0.2em] transition-colors ${isActive(link.href) ? 'text-[#B59431]' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="bg-[#B59431] text-black w-full text-center py-4 rounded-lg font-bold text-lg tracking-widest"
                        >
                            CONTACT
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;