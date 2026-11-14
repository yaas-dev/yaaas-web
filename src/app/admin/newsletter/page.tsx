import { getNewsletterSettings, getNewsletterSubscribers } from '@/actions/newsletterActions';
import NewsletterAdmin from '@/components/admin/NewsletterAdmin';

export const dynamic = 'force-dynamic';

export default async function NewsletterPage() {
    const [settings, subscribers] = await Promise.all([
        getNewsletterSettings(),
        getNewsletterSubscribers(),
    ]);

    return <NewsletterAdmin initialSettings={settings} initialSubscribers={subscribers} />;
}
