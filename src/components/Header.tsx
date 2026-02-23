"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "CATALOGUE", href: "/art-catalogue" },
        { name: "TALENT", href: "/talents" },
        { name: "GALLERY", href: "/projects" },
    ];

    return (
        <>
            <header style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                transition: "background 0.4s ease, padding 0.4s ease, border-color 0.4s ease",
                background: isScrolled ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.75)",
                backdropFilter: isScrolled ? "blur(12px)" : "none",
                borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
                padding: isScrolled ? "12px 0" : "18px 0",
            }}>
                <div className="header-inner">
                    {/* Logo */}
                    <Link href="/" className="header-logo">
                        <Image
                            src="/images/logo.png"
                            alt="Yaa Asantewaa Agency"
                            width={90}
                            height={90}
                            priority
                            style={{ width: "auto", height: "60px", objectFit: "contain" }}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="header-nav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`nav-link${pathname === link.href ? " nav-link--active" : ""}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/contact" className="nav-contact-btn">
                            CONTACT
                        </Link>
                    </nav>

                    {/* Hamburger — mobile only */}
                    <button
                        className="hamburger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <span className={`bar bar-1${isOpen ? " bar-1--open" : ""}`} />
                        <span className={`bar bar-2${isOpen ? " bar-2--open" : ""}`} />
                        <span className={`bar bar-3${isOpen ? " bar-3--open" : ""}`} />
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div className={`mobile-menu${isOpen ? " mobile-menu--open" : ""}`}>
                <nav className="mobile-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`mobile-nav-link${pathname === link.href ? " mobile-nav-link--active" : ""}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="mobile-contact-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        CONTACT
                    </Link>
                </nav>
            </div>

            <style>{`
                .header-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .header-logo {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    z-index: 110;
                }

                /* === Desktop Nav === */
                .header-nav {
                    display: flex;
                    align-items: center;
                    gap: 2.5rem;
                }

                .nav-link {
                    font-size: 10px;
                    letter-spacing: 0.35em;
                    font-weight: 700;
                    color: rgba(255,255,255,0.65);
                    text-transform: uppercase;
                    transition: color 0.25s ease;
                    white-space: nowrap;
                }

                .nav-link:hover,
                .nav-link--active {
                    color: #B89C24;
                }

                .nav-contact-btn {
                    display: inline-block;
                    background: #B89C24;
                    color: #000;
                    font-size: 10px;
                    letter-spacing: 0.3em;
                    font-weight: 700;
                    padding: 10px 22px;
                    text-transform: uppercase;
                    transition: background 0.25s ease, transform 0.2s ease;
                    white-space: nowrap;
                }

                .nav-contact-btn:hover {
                    background: #d1b43a;
                }

                /* === Hamburger === */
                .hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    cursor: pointer;
                    background: none;
                    border: none;
                    padding: 4px;
                    z-index: 110;
                }

                .bar {
                    display: block;
                    width: 26px;
                    height: 2px;
                    background: #fff;
                    border-radius: 2px;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    transform-origin: center;
                }

                .bar-1--open { transform: translateY(7px) rotate(45deg); }
                .bar-2--open { opacity: 0; transform: scaleX(0); }
                .bar-3--open { transform: translateY(-7px) rotate(-45deg); }

                /* === Mobile Drawer === */
                .mobile-menu {
                    position: fixed;
                    inset: 0;
                    z-index: 99;
                    background: #000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transform: translateX(100%);
                    transition: transform 0.4s cubic-bezier(0.77, 0, 0.18, 1);
                    overflow: hidden;
                }

                .mobile-menu--open {
                    transform: translateX(0);
                }

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2.5rem;
                }

                .mobile-nav-link {
                    font-size: 1.75rem;
                    letter-spacing: 0.45em;
                    font-weight: 700;
                    color: rgba(255,255,255,0.85);
                    text-transform: uppercase;
                    transition: color 0.2s ease;
                }

                .mobile-nav-link:hover,
                .mobile-nav-link--active {
                    color: #B89C24;
                }

                .mobile-contact-btn {
                    margin-top: 1rem;
                    display: inline-block;
                    background: #B89C24;
                    color: #000;
                    font-size: 1rem;
                    letter-spacing: 0.35em;
                    font-weight: 700;
                    padding: 16px 48px;
                    text-transform: uppercase;
                    transition: background 0.25s ease;
                }

                .mobile-contact-btn:hover {
                    background: #d1b43a;
                }

                /* === Responsive === */
                @media (max-width: 767px) {
                    .header-nav {
                        display: none;
                    }

                    .hamburger {
                        display: flex;
                    }

                    .header-inner {
                        padding: 0 1.25rem;
                    }
                }
            `}</style>
        </>
    );
}
