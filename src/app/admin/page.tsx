import React from 'react';
import {
    Users,
    Image as ImageIcon,
    FileText,
    Briefcase,
    TrendingUp,
    Clock,
    Handshake,
    Mail
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardStats } from '@/actions/dashboardActions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    const STATS = [
        { name: 'Total Talents', value: stats.talents, icon: Users, color: 'text-blue-400', href: '/admin/talents' },
        { name: 'Artworks', value: stats.artworks, icon: ImageIcon, color: 'text-[#B59431]', href: '/admin/catalogue' },
        { name: 'Projects', value: stats.projects, icon: Briefcase, color: 'text-green-400', href: '/admin/projects' },
        { name: 'Collaborations', value: stats.collaborations, icon: Handshake, color: 'text-orange-400', href: '/admin/collaborations' },
        { name: 'News Posts', value: stats.news, icon: FileText, color: 'text-purple-400', href: '/admin/news' },
        { name: 'Enquiries', value: stats.enquiries, icon: Mail, color: 'text-pink-400', href: '/admin/enquiries', badge: stats.newEnquiries > 0 ? stats.newEnquiries : null },
    ];

    return (
        <div className="flex flex-col gap-10">

            {/* Welcome Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">Dashboard</h1>
                <p className="text-white/40 text-sm tracking-wide">Manage your agency&apos;s digital content and representation.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {STATS.map((stat) => (
                    <Link key={stat.name} href={stat.href} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm flex items-center justify-between shadow-xl hover:border-[#B59431]/30 transition-colors group">
                        <div className="flex flex-col gap-1">
                            <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{stat.name}</span>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold text-white group-hover:text-[#B59431] transition-colors">{stat.value}</span>
                                {stat.badge && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-widest">
                                        {stat.badge} new
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={`p-3 bg-white/5 rounded-full ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon size={24} />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
                {/* Recent Activity */}
                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm shadow-xl flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#B59431] flex items-center gap-3">
                            <Clock size={16} />
                            System Overview
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        {[
                            { label: 'Total Content Items', value: stats.talents + stats.artworks + stats.projects + stats.collaborations + stats.news },
                            { label: 'Total Messages', value: stats.enquiries },
                            { label: 'Unread Enquiries', value: stats.newEnquiries },
                        ].map(item => (
                            <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-white/50 text-xs uppercase tracking-widest font-medium">{item.label}</span>
                                <span className={`text-xl font-bold ${item.label === 'Unread Enquiries' && item.value > 0 ? 'text-red-400' : 'text-white'}`}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm shadow-xl flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#B59431] flex items-center gap-3">
                            <TrendingUp size={16} />
                            Quick Actions
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Link href="/admin/talents/new" className="bg-white/5 hover:bg-white/10 p-4 text-center rounded-sm transition-all border border-white/5 hover:border-[#B59431]/20">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Add Talent</span>
                        </Link>
                        <Link href="/admin/catalogue?action=new" className="bg-white/5 hover:bg-white/10 p-4 text-center rounded-sm transition-all border border-white/5 hover:border-[#B59431]/20">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Upload Art</span>
                        </Link>
                        <Link href="/admin/news/new" className="bg-white/5 hover:bg-white/10 p-4 text-center rounded-sm transition-all border border-white/5 hover:border-[#B59431]/20">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Post News</span>
                        </Link>
                        <Link href="/admin/projects/new" className="bg-white/5 hover:bg-white/10 p-4 text-center rounded-sm transition-all border border-white/5 hover:border-[#B59431]/20">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">New Project</span>
                        </Link>
                        <Link href="/admin/collaborations/new" className="bg-white/5 hover:bg-white/10 p-4 text-center rounded-sm transition-all border border-white/5 hover:border-[#B59431]/20">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">New Collab</span>
                        </Link>
                        <Link href="/admin/enquiries" className="bg-white/5 hover:bg-white/10 p-4 text-center rounded-sm transition-all border border-white/5 hover:border-[#B59431]/20 relative">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">View Inbox</span>
                            {stats.newEnquiries > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {stats.newEnquiries}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
