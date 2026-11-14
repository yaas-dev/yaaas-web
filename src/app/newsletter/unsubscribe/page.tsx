export const metadata = { title: 'Newsletter preferences | YAAAS Agency', robots: { index: false, follow: false } };

export default async function NewsletterUnsubscribePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    const { status } = await searchParams;
    const message = status === 'success'
        ? 'You have been unsubscribed from YAAAS updates.'
        : status === 'inactive'
            ? 'This subscription link has already been used or is no longer active.'
            : status === 'invalid'
                ? 'This unsubscribe link is not valid.'
                : status === 'error'
                    ? 'We could not process your request. Please contact hello@yaaas.co.'
                    : 'Use the personal unsubscribe link included with your YAAAS newsletter.';
    return (
        <main className="min-h-[60vh] bg-[#F1EFE8] text-[#171717] flex items-center justify-center px-6 py-24">
            <div className="max-w-xl text-center flex flex-col gap-5">
                <p className="text-[#B59431] text-xs tracking-[0.2em] font-semibold">THE YAAAS EDIT</p>
                <h1 className="text-3xl md:text-4xl font-medium">Newsletter preferences</h1>
                <p className="text-[#55534E]">{message}</p>
                <a href="/" className="text-sm underline underline-offset-4">Back to YAAAS</a>
            </div>
        </main>
    );
}
