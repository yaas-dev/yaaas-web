"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
    { name: "HOME", href: "/" },
    { name: "CATALOGUE", href: "/art-catalogue" },
    { name: "TALENT", href: "/talents" },
    { name: "GALLERY", href: "/projects" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isTalentPage = pathname.startsWith("/talents");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* ── HEADER BAR ── */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 200,
                    transition: "background 0.4s ease, padding 0.4s ease",
                    background: isTalentPage
                        ? (scrolled ? "rgba(0,0,0,0.58)" : "rgba(0,0,0,0.18)")
                        : (scrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.75)"),
                    backdropFilter: isTalentPage
                        ? "blur(2px)"
                        : (scrolled ? "blur(10px)" : "blur(4px)"),
                    borderBottom: isTalentPage
                        ? "1px solid transparent"
                        : (scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent"),
                    padding: isTalentPage ? (scrolled ? "6px 0" : "10px 0") : (scrolled ? "10px 0" : "16px 0"),
                }}
            >
                <div style={{
                    maxWidth: isTalentPage ? 1320 : 1400,
                    margin: "0 auto",
                    padding: isTalentPage ? "0 2rem" : "0 2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>

                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <Image
                            src="/images/logo.png"
                            alt="Yaa Asantewaa Agency"
                            width={110}
                            height={110}
                            priority
                            style={{
                                height: isTalentPage ? 42 : 58,
                                width: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav className={`header-desktop-nav ${isTalentPage ? "header-desktop-nav-talent" : ""}`}>
                        {NAV_LINKS.map(({ name, href }) => (
                            <Link
                                key={name}
                                href={href}
                                className={`${pathname === href ? "nav-link nav-link-active" : "nav-link"} ${isTalentPage ? "nav-link-talent" : ""}`}
                            >
                                {name}
                            </Link>
                        ))}
                        <Link href="/contact" className={`nav-contact ${isTalentPage ? "nav-contact-talent" : ""}`}>
                            CONTACT
                        </Link>
                    </nav>

                    {/* Hamburger (mobile only) */}
                    <button
                        onClick={() => setIsOpen(v => !v)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="hamburger-btn"
                    >
                        <span className={`ham-bar ${isOpen ? "ham-bar-1-open" : ""}`} />
                        <span className={`ham-bar ${isOpen ? "ham-bar-2-open" : ""}`} />
                        <span className={`ham-bar ${isOpen ? "ham-bar-3-open" : ""}`} />
                    </button>
                </div>
            </header>

            {/* ── MOBILE FULL-SCREEN MENU ── */}
            <div className={`mobile-menu ${isOpen ? "mobile-menu-open" : ""}`}>
                <nav className="mobile-nav">
                    {NAV_LINKS.map(({ name, href }) => (
                        <Link
                            key={name}
                            href={href}
                            className={pathname === href ? "mobile-link mobile-link-active" : "mobile-link"}
                            onClick={() => setIsOpen(false)}
                        >
                            {name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="mobile-contact"
                        onClick={() => setIsOpen(false)}
                    >
                        CONTACT
                    </Link>
                </nav>
            </div>

            <style>{`
                /* ── Desktop nav ── */
                .header-desktop-nav {
                    display: none;
                    align-items: center;
                    gap: 2.75rem;
                }
                .header-desktop-nav-talent {
                    gap: 1.2rem;
                }
                @media (min-width: 768px) {
                    .header-desktop-nav { display: flex; }
                }

                .nav-link {
                    font-size: 10px;
                    letter-spacing: 0.38em;
                    font-weight: 700;
                    color: rgba(255,255,255,0.6);
                    text-transform: uppercase;
                    transition: color 0.25s ease;
                }
                .nav-link:hover,
                .nav-link-active {
                    color: #B89C24;
                }
                .nav-link-talent {
                    font-size: 9px;
                    letter-spacing: 0.2em;
                }

                .nav-contact {
                    display: inline-block;
                    background: #B89C24;
                    color: #000;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.32em;
                    text-transform: uppercase;
                    padding: 10px 24px;
                    transition: background 0.25s ease;
                    white-space: nowrap;
                }
                .nav-contact-talent {
                    font-size: 9px;
                    letter-spacing: 0.2em;
                    padding: 8px 14px;
                    border-radius: 4px;
                }
                .nav-contact:hover { background: #d4b230; }

                /* ── Hamburger ── */
                .hamburger-btn {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    padding: 4px;
                    cursor: pointer;
                    z-index: 210;
                    background: none;
                    border: none;
                }
                @media (min-width: 768px) {
                    .hamburger-btn { display: none; }
                }

                .ham-bar {
                    display: block;
                    width: 25px;
                    height: 2px;
                    background: #fff;
                    border-radius: 2px;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    transform-origin: center;
                }
                .ham-bar-1-open { transform: translateY(7px) rotate(45deg); }
                .ham-bar-2-open { opacity: 0; transform: scaleX(0); }
                .ham-bar-3-open { transform: translateY(-7px) rotate(-45deg); }

                /* ── Mobile menu ── */
                .mobile-menu {
                    position: fixed;
                    inset: 0;
                    z-index: 190;
                    background: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translateX(100%);
                    transition: transform 0.45s cubic-bezier(0.77, 0, 0.18, 1);
                }
                @media (min-width: 768px) {
                    .mobile-menu { display: none; }
                }
                .mobile-menu-open { transform: translateX(0); }

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2.25rem;
                }

                .mobile-link {
                    font-size: 1.6rem;
                    letter-spacing: 0.45em;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.75);
                    transition: color 0.2s ease;
                }
                .mobile-link:hover,
                .mobile-link-active {
                    color: #B89C24;
                }

                .mobile-contact {
                    margin-top: 1.25rem;
                    background: #B89C24;
                    color: #000;
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    padding: 16px 52px;
                    transition: background 0.25s ease;
                }
                .mobile-contact:hover { background: #d4b230; }
            `}</style>
        </>
    );
}
