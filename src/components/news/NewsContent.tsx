"use client";

import React from 'react';

interface NewsContentProps {
    content: string;
}

export default function NewsContent({ content }: NewsContentProps) {
    return (
        <>
            <div
                className="rich-text-content flex flex-col text-[#e0e0e0] font-light text-base md:text-lg leading-loose tracking-wide max-w-3xl mx-auto w-full"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <style jsx global>{`
                .rich-text-content p {
                    margin-bottom: 2rem;
                }
                .rich-text-content p:first-of-type::first-letter {
                    color: #FDDA2F;
                    font-size: 3rem;
                    font-weight: bold;
                    margin-right: 0.5rem;
                    float: left;
                    line-height: 1;
                }
                .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 {
                    color: #FDDA2F;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-top: 2.5rem;
                    margin-bottom: 1.5rem;
                    font-weight: bold;
                }
                .rich-text-content h1 { font-size: 2rem; }
                .rich-text-content h2 { font-size: 1.5rem; }
                .rich-text-content h3 { font-size: 1.25rem; }
                
                .rich-text-content ul, .rich-text-content ol {
                    margin-bottom: 2rem;
                    padding-left: 1.5rem;
                }
                .rich-text-content ul { list-style-type: disc; }
                .rich-text-content ol { list-style-type: decimal; }
                .rich-text-content li { margin-bottom: 0.5rem; }
                
                .rich-text-content a {
                    color: #FDDA2F;
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }
                .rich-text-content a:hover { color: white; }
                
                .rich-text-content blockquote {
                    border-left: 4px solid #FDDA2F;
                    padding-left: 2rem;
                    font-style: italic;
                    margin: 3rem 0;
                    color: white;
                }
            `}</style>
        </>
    );
}
