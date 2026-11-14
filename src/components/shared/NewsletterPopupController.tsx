"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getNewsletterSettings } from '@/actions/newsletterActions';
import WelcomePopup from '@/components/shared/WelcomePopup';

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

export default function NewsletterPopupController() {
    const pathname = usePathname();
    const [settings, setSettings] = useState<PopupSettings | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (pathname.startsWith('/admin') || hasFetched.current) return;
        hasFetched.current = true;
        getNewsletterSettings()
            .then(data => setSettings(data))
            .catch(error => console.error('Could not load newsletter settings:', error));
    }, [pathname]);

    if (!settings || pathname.startsWith('/admin')) return null;
    return <WelcomePopup settings={settings} />;
}
