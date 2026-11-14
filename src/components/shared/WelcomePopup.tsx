"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { subscribeToNewsletter } from '@/actions/newsletterActions';

type PopupSettings = {
    enabled?: boolean;
    eyebrow?: string;
    heading?: string;
    description?: string;
    buttonText?: string;
    image?: string;
    delaySeconds?: number;
    dismissalDays?: number;
    consentText?: string;
    footerText?: string;
};

const DEFAULTS = {
    eyebrow: 'THE YAAAS EDIT',
    heading: 'Stay close to African creativity.',
    description: "A little of what we're seeing, making and bringing together. Discover artists, exhibitions, projects and ideas from across Africa and its diaspora.",
    buttonText: 'Count me in',
    delaySeconds: 10,
    dismissalDays: 30,
    consentText: 'By subscribing, you agree to receive occasional updates from YAAAS. Unsubscribe anytime.',
    footerText: 'NOISE FROM THE CONTINENT. STRAIGHT TO YOUR INBOX.',
};

export default function WelcomePopup({ settings }: { settings?: PopupSettings }) {
    const [isVisible, setIsVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [website, setWebsite] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [complete, setComplete] = useState(false);

    const content = { ...DEFAULTS, ...settings };

    useEffect(() => {
        if (settings?.enabled === false) return;
        try {
            if (localStorage.getItem('yaaas_newsletter_subscribed') === 'true') return;
            const dismissedUntil = Number(localStorage.getItem('yaaas_newsletter_dismissed_until') || 0);
            if (dismissedUntil > Date.now()) return;
            const timer = window.setTimeout(() => setIsVisible(true), Math.max(5, Number(content.delaySeconds) || 10) * 1000);
            return () => window.clearTimeout(timer);
        } catch {
            return;
        }
    }, [settings?.enabled, content.delaySeconds]);

    const close = () => {
        const days = Number(content.dismissalDays ?? 30);
        const suppression = days === 0 ? 100 * 365 * 24 * 60 * 60 * 1000 : days * 24 * 60 * 60 * 1000;
        localStorage.setItem('yaaas_newsletter_dismissed_until', String(Date.now() + suppression));
        setIsVisible(false);
    };

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setMessage('');
        const result = await subscribeToNewsletter({ email, firstName, consent, website });
        setSubmitting(false);
        if (result.success) {
            localStorage.setItem('yaaas_newsletter_subscribed', 'true');
            setComplete(true);
            setMessage(result.alreadySubscribed ? "You're already on the list." : "You're on the list. Thanks for joining us.");
        } else {
            setMessage(result.error || 'Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true" aria-labelledby="yaaas-newsletter-heading">
                    <motion.button aria-label="Close newsletter pop-up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="absolute inset-0 bg-black/65 backdrop-blur-sm cursor-default" />
                    <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.3 }} className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#F1EFE8] text-[#171717] shadow-2xl">
                        <button onClick={close} aria-label="Close" className="absolute right-3 top-3 z-20 p-2 text-[#55534E] hover:text-black"><X size={20} /></button>
                        <div className="grid md:grid-cols-2">
                            <div className="relative min-h-[190px] md:min-h-[500px] bg-[#E4DED0]">
                                {content.image ? <Image src={content.image} alt="YAAAS creative work" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /> : <div className="absolute inset-0 flex items-center justify-center p-8"><div className="w-full aspect-[4/5] border border-[#B59431]/50 flex items-center justify-center"><span className="font-semibold tracking-[0.25em] text-[#B59431] text-3xl">YAAAS</span></div></div>}
                            </div>
                            <div className="p-6 md:p-10 flex flex-col justify-center gap-5">
                                {!complete ? <>
                                    <p className="text-[10px] font-semibold tracking-[0.25em] text-[#B59431]">{content.eyebrow}</p>
                                    <h2 id="yaaas-newsletter-heading" className="text-2xl md:text-3xl leading-tight font-medium">{content.heading}</h2>
                                    <p className="text-sm leading-relaxed text-[#55534E]">{content.description}</p>
                                    <form onSubmit={submit} className="flex flex-col gap-3">
                                        <input value={firstName} onChange={event => setFirstName(event.target.value)} placeholder="Your name (optional)" maxLength={80} className="w-full border border-[#C9C4B8] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#B59431]" />
                                        <input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="Your email address" maxLength={254} className="w-full border border-[#C9C4B8] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#B59431]" />
                                        <label className="flex items-start gap-2 text-[11px] leading-relaxed text-[#77746D]"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required className="mt-0.5 accent-[#B59431]" /><span>{content.consentText}</span></label>
                                        <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={event => setWebsite(event.target.value)} className="hidden" />
                                        <button disabled={submitting} className="bg-[#171717] text-white px-5 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-[#B59431] hover:text-black transition-colors disabled:opacity-50">{submitting ? 'Joining...' : content.buttonText}</button>
                                        {message && <p aria-live="polite" className="text-xs text-[#55534E]">{message}</p>}
                                    </form>
                                </> : <div className="flex flex-col gap-4"><p className="text-[10px] font-semibold tracking-[0.25em] text-[#B59431]">{content.eyebrow}</p><h2 className="text-3xl font-medium">Welcome to the list.</h2><p className="text-sm text-[#55534E]">{message}</p><button onClick={close} className="self-start text-xs uppercase tracking-widest underline underline-offset-4">Continue exploring</button></div>}
                                <p className="text-[9px] tracking-[0.15em] text-[#77746D]">{content.footerText}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
