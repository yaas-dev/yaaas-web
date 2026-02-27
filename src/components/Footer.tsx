"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";

export default function Footer() {
    const navLinks = [
        { label: "HOME", href: "/" },
        { label: "CATALOGUE", href: "/art-catalogue" },
        { label: "TALENT", href: "/talents" },
        { label: "GALLERY", href: "/projects" },
        { label: "CONTACT", href: "/contact" },
    ];

    return (
        <footer className="footer-wrap">
            <div className="footer-inner">
                <div className="footer-main">
                    <div className="footer-logo">
                        <Link href="/" aria-label="YAAAS Home">
                            <Image
                                src="/images/logo.png"
                                alt="Yaa Asantewaa Agency"
                                width={132}
                                height={82}
                                className="logo-img"
                            />
                        </Link>
                    </div>

                    <nav className="footer-nav" aria-label="Footer">
                        {navLinks.map(({ label, href }) => (
                            <Link key={label} href={href}>
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="footer-socials">
                        {[Twitter, Instagram, Linkedin, MessageCircle].map((Icon, i) => (
                            <a key={i} href="#" aria-label="Social link">
                                <Icon size={14} strokeWidth={2} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-copy">
                    <p>(c) YAA ASANTEWAA 2025 ALL RIGHTS RESERVED</p>
                </div>
            </div>

            <style jsx>{`
                .footer-wrap {
                    background: #1a1a1a;
                    border-top: 1px solid rgba(255, 255, 255, 0.04);
                    padding: 86px 0 34px;
                }

                .footer-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .footer-main {
                    display: grid;
                    grid-template-columns: minmax(140px, 1fr) auto minmax(140px, 1fr);
                    align-items: center;
                    column-gap: 24px;
                }

                .footer-logo {
                    display: flex;
                    justify-content: flex-start;
                }

                .logo-img {
                    width: auto;
                    height: 70px;
                    object-fit: contain;
                    opacity: 0.95;
                }

                .footer-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 17px;
                }

                .footer-nav a {
                    font-size: 11px;
                    letter-spacing: 0.08em;
                    line-height: 1;
                    font-weight: 500;
                    color: #ffffff;
                    transition: color 0.2s ease;
                }

                .footer-nav a:hover {
                    color: #fbe230;
                }

                .footer-socials {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                }

                .footer-socials a {
                    width: 24px;
                    height: 24px;
                    display: grid;
                    place-items: center;
                    color: #e5e5e5;
                    opacity: 0.9;
                    transition: color 0.2s ease, opacity 0.2s ease;
                }

                .footer-socials a:hover {
                    color: #fbe230;
                    opacity: 1;
                }

                .footer-copy {
                    text-align: center;
                    margin-top: 62px;
                }

                .footer-copy p {
                    color: #d9d9d9;
                    font-size: 10px;
                    letter-spacing: 0.42em;
                    text-transform: uppercase;
                    font-weight: 500;
                }

                @media (max-width: 900px) {
                    .footer-wrap {
                        padding: 62px 0 28px;
                    }

                    .footer-inner {
                        padding: 0 16px;
                    }

                    .footer-main {
                        grid-template-columns: 1fr;
                        row-gap: 30px;
                    }

                    .footer-logo,
                    .footer-socials {
                        justify-content: center;
                    }

                    .footer-copy {
                        margin-top: 34px;
                    }

                    .footer-copy p {
                        font-size: 9px;
                        letter-spacing: 0.3em;
                    }
                }
            `}</style>
        </footer>
    );
}
