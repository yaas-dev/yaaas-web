"use client";

import { useMemo, useState } from 'react';
import { Download, Save, Users, CheckCircle2, Mail, Search, Monitor, Smartphone } from 'lucide-react';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';
import { updateNewsletterSettings, setNewsletterSubscriberStatus } from '@/actions/newsletterActions';

type Subscriber = {
    _id: string;
    email: string;
    firstName?: string;
    status: 'SUBSCRIBED' | 'UNSUBSCRIBED';
    consentedAt?: string;
    createdAt?: string;
    unsubscribeToken: string;
};

type Settings = {
    enabled: boolean;
    eyebrow: string;
    heading: string;
    description: string;
    buttonText: string;
    image: string;
    delaySeconds: number;
    dismissalDays: number;
    consentText: string;
    footerText: string;
};

export default function NewsletterAdmin({ initialSettings, initialSubscribers }: { initialSettings: Settings; initialSubscribers: Subscriber[] }) {
    const [settings, setSettings] = useState<Settings>(initialSettings);
    const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
    const [query, setQuery] = useState('');
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState('');
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

    const update = (key: keyof Settings, value: string | number | boolean) => setSettings(current => ({ ...current, [key]: value }));
    const activeCount = subscribers.filter(item => item.status === 'SUBSCRIBED').length;
    const filtered = useMemo(() => subscribers.filter(item => `${item.firstName || ''} ${item.email}`.toLowerCase().includes(query.toLowerCase())), [subscribers, query]);

    const saveSettings = async () => {
        setSaving(true);
        setNotice('');
        const result = await updateNewsletterSettings(settings);
        setSaving(false);
        setNotice(result.success ? 'Newsletter settings saved.' : result.error || 'Could not save settings.');
    };

    const exportCsv = () => {
        const rows = [
            ['First name', 'Email', 'Status', 'Subscribed date', 'Unsubscribe URL', 'Source'],
            ...subscribers.filter(item => item.status === 'SUBSCRIBED').map(item => [
                item.firstName || '',
                item.email,
                item.status,
                item.consentedAt ? new Date(item.consentedAt).toISOString() : '',
                `${window.location.origin}/api/newsletter/unsubscribe?token=${item.unsubscribeToken}`,
                'Website pop-up',
            ]),
        ];
        const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'yaaas-newsletter-subscribers.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    const toggleStatus = async (subscriber: Subscriber) => {
        const nextStatus = subscriber.status === 'SUBSCRIBED' ? 'UNSUBSCRIBED' : 'SUBSCRIBED';
        const result = await setNewsletterSubscriberStatus(subscriber._id, nextStatus);
        if (result.success) {
            setSubscribers(current => current.map(item => item._id === subscriber._id ? { ...item, status: nextStatus } : item));
        } else {
            setNotice(result.error || 'Could not update subscriber.');
        }
    };

    const fieldClass = "w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B59431]";
    const labelClass = "text-[10px] uppercase tracking-widest font-bold text-white/50";

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
                <p className="text-[#B59431] text-[10px] uppercase tracking-[0.25em] font-bold">Audience</p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Newsletter</h1>
                <p className="text-sm text-white/40">Manage the website sign-up pop-up and your subscriber list.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-sm">
                    <Users className="text-[#B59431] mb-3" size={20} />
                    <p className="text-3xl font-bold">{subscribers.length}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Total subscribers</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-sm">
                    <CheckCircle2 className="text-green-400 mb-3" size={20} />
                    <p className="text-3xl font-bold">{activeCount}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Active subscriptions</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-sm">
                    <Mail className="text-[#B59431] mb-3" size={20} />
                    <p className="text-3xl font-bold">{subscribers.length - activeCount}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Unsubscribed</p>
                </div>
            </div>

            <section className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-sm flex flex-col gap-7">
                <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-5">
                    <div>
                        <h2 className="text-lg font-semibold">Pop-up settings</h2>
                        <p className="text-xs text-white/40 mt-1">Edit the content and behaviour without changing code.</p>
                    </div>
                    <label className="flex items-center gap-2 text-xs text-white/70">
                        <input type="checkbox" checked={settings.enabled} onChange={event => update('enabled', event.target.checked)} className="accent-[#B59431] w-4 h-4" />
                        Enabled
                    </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2"><label className={labelClass}>Eyebrow</label><input className={fieldClass} value={settings.eyebrow} onChange={event => update('eyebrow', event.target.value)} /></div>
                        <div className="flex flex-col gap-2"><label className={labelClass}>Main heading</label><input className={fieldClass} value={settings.heading} onChange={event => update('heading', event.target.value)} /></div>
                        <div className="flex flex-col gap-2"><label className={labelClass}>Description</label><textarea className={fieldClass} rows={4} value={settings.description} onChange={event => update('description', event.target.value)} /></div>
                        <div className="flex flex-col gap-2"><label className={labelClass}>Button text</label><input className={fieldClass} value={settings.buttonText} onChange={event => update('buttonText', event.target.value)} /></div>
                        <div className="flex flex-col gap-2"><label className={labelClass}>Consent text</label><textarea className={fieldClass} rows={3} value={settings.consentText} onChange={event => update('consentText', event.target.value)} /></div>
                        <div className="flex flex-col gap-2"><label className={labelClass}>Footer line</label><input className={fieldClass} value={settings.footerText} onChange={event => update('footerText', event.target.value)} /></div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <ImageUpload value={settings.image} onChange={value => update('image', value)} label="Pop-up image" folder="yaaas/newsletter" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2"><label className={labelClass}>Delay (seconds)</label><select className={fieldClass} value={settings.delaySeconds} onChange={event => update('delaySeconds', Number(event.target.value))}>{[5, 10, 15, 20, 30].map(value => <option key={value} value={value}>{value} seconds</option>)}</select></div>
                            <div className="flex flex-col gap-2"><label className={labelClass}>Show again after close</label><select className={fieldClass} value={settings.dismissalDays} onChange={event => update('dismissalDays', Number(event.target.value))}><option value={7}>7 days</option><option value={14}>14 days</option><option value={30}>30 days</option><option value={0}>Never</option></select></div>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <p className={labelClass}>Live preview</p>
                            <div className="flex items-center gap-1">
                                <button type="button" onClick={() => setPreviewMode('desktop')} aria-label="Desktop preview" className={`p-2 border ${previewMode === 'desktop' ? 'border-[#B59431] text-[#B59431]' : 'border-white/10 text-white/40'}`}><Monitor size={15} /></button>
                                <button type="button" onClick={() => setPreviewMode('mobile')} aria-label="Mobile preview" className={`p-2 border ${previewMode === 'mobile' ? 'border-[#B59431] text-[#B59431]' : 'border-white/10 text-white/40'}`}><Smartphone size={15} /></button>
                            </div>
                        </div>
                        <div className={`mx-auto border border-white/10 bg-[#F1EFE8] text-[#171717] shadow-xl overflow-hidden transition-all ${previewMode === 'mobile' ? 'w-full max-w-[300px] rounded-2xl' : 'w-full max-w-[640px] rounded-sm'}`}>
                            <div className={`grid ${previewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                <div className={`relative bg-[#E4DED0] ${previewMode === 'mobile' ? 'aspect-[16/7]' : 'min-h-[260px]'}`}>
                                    {settings.image ? <Image src={settings.image} alt="Newsletter preview" fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" /> : <div className="absolute inset-0 flex items-center justify-center"><span className="text-[#B59431] font-semibold tracking-[0.25em] text-xl">YAAAS</span></div>}
                                </div>
                                <div className={`flex flex-col justify-center gap-3 ${previewMode === 'mobile' ? 'p-5' : 'p-6'}`}>
                                    <p className="text-[9px] uppercase tracking-widest text-[#B59431]">{settings.eyebrow || 'THE YAAAS EDIT'}</p>
                                    <h3 className={`font-medium leading-tight ${previewMode === 'mobile' ? 'text-lg' : 'text-xl'}`}>{settings.heading || 'Your heading appears here'}</h3>
                                    <p className="text-xs leading-relaxed text-[#55534E]">{settings.description || 'Your description appears here.'}</p>
                                    <div className="bg-[#171717] text-white text-center text-[10px] font-semibold tracking-wide p-3">{settings.buttonText || 'Subscribe'}</div>
                                    <p className="text-[9px] leading-relaxed text-[#77746D]">{settings.consentText}</p>
                                    <p className="text-[8px] tracking-widest text-[#77746D]">{settings.footerText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5 pt-5">
                    <p className="text-xs text-white/40">{notice}</p>
                    <button onClick={saveSettings} disabled={saving} className="inline-flex items-center justify-center gap-2 bg-[#B59431] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#c9a640] disabled:opacity-50">
                        <Save size={15} /> {saving ? 'Saving...' : 'Save changes'}
                    </button>
                </div>
            </section>

            <section className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-sm flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                    <div>
                        <h2 className="text-lg font-semibold">Subscribers</h2>
                        <p className="text-xs text-white/40 mt-1">Email addresses collected through the YAAAS website.</p>
                    </div>
                    <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:border-[#B59431]"><Download size={15} /> Export CSV</button>
                </div>
                <div className="relative max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input className={fieldClass + ' pl-10'} placeholder="Search name or email" value={query} onChange={event => setQuery(event.target.value)} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[650px]">
                        <thead><tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/10"><th className="py-3 pr-4">Name</th><th className="py-3 pr-4">Email</th><th className="py-3 pr-4">Date added</th><th className="py-3 pr-4">Status</th><th className="py-3">Action</th></tr></thead>
                        <tbody>
                            {filtered.map(item => <tr key={item._id} className="border-b border-white/5 text-sm">
                                <td className="py-4 pr-4 text-white/80">{item.firstName || '—'}</td>
                                <td className="py-4 pr-4 text-white/60">{item.email}</td>
                                <td className="py-4 pr-4 text-white/40">{item.consentedAt ? new Date(item.consentedAt).toLocaleDateString() : '—'}</td>
                                <td className="py-4 pr-4"><span className={item.status === 'SUBSCRIBED' ? 'text-green-400 text-xs' : 'text-white/30 text-xs'}>{item.status === 'SUBSCRIBED' ? 'Active' : 'Unsubscribed'}</span></td>
                                <td className="py-4"><button onClick={() => toggleStatus(item)} className="text-[10px] uppercase tracking-widest text-[#B59431] hover:text-white">{item.status === 'SUBSCRIBED' ? 'Unsubscribe' : 'Reactivate'}</button></td>
                            </tr>)}
                            {filtered.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-sm text-white/30">No subscribers found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
