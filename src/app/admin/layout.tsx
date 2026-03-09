"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Users,
    Image as ImageIcon,
    FileText,
    Briefcase,
    LayoutDashboard,
    LogOut,
    ChevronRight,
    Handshake,
    Mail,
    Menu,
    X,
    Settings as SettingsIcon
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';


const ADMIN_NAV = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Talents', href: '/admin/talents', icon: Users },
    { name: 'Catalogue', href: '/admin/catalogue', icon: ImageIcon },
    { name: 'News', href: '/admin/news', icon: FileText },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Collaborations', href: '/admin/collaborations', icon: Handshake },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Close mobile menu when pathname changes
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/admin/login');
    };

    // Don't show layout on login page
    if (pathname === '/admin/login') return children;

    // While session is loading or unauthenticated, render nothing
    // (middleware will have already redirected, this just prevents a flash)
    if (status === 'loading' || !session) return null;

    return (
        <div className="min-h-screen bg-[#050505] flex text-white font-sans overflow-x-hidden">

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-[#B59431]/20 flex items-center justify-between px-6 z-[60]">
                <Link href="/" className="flex flex-col">
                    <span className="text-lg font-bold text-[#B59431] tracking-widest">YAAAS</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Admin</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-[#B59431] hover:bg-[#B59431]/10 rounded-sm transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar Overlay (Mobile only) */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 md:w-72 bg-[#0a0a0a] border-r border-[#B59431]/20 flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-8 border-b border-[#B59431]/10 hidden lg:block">
                    <Link href="/" className="flex flex-col">
                        <span className="text-xl font-bold text-[#B59431] tracking-widest">YAAAS</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Admin Panel</span>
                    </Link>
                </div>

                {/* Mobile version of sidebar header for spacing when menu is open */}
                <div className="p-8 border-b border-[#B59431]/10 lg:hidden">
                    <Link href="/" className="flex flex-col">
                        <span className="text-xl font-bold text-[#B59431] tracking-widest">YAAAS</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Admin Panel</span>
                    </Link>
                </div>

                <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
                    {ADMIN_NAV.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-sm transition-all group ${isActive
                                    ? 'bg-[#B59431] text-black shadow-lg shadow-[#B59431]/10'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className={`text-xs font-bold tracking-widest uppercase ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                                        {item.name}
                                    </span>
                                </div>
                                {isActive && <ChevronRight size={14} />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-[#B59431]/10">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-4 px-4 py-3 w-full text-white/40 hover:text-red-500 transition-colors text-xs font-bold tracking-widest uppercase"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow lg:ml-64 xl:ml-72 bg-[#050505] min-h-screen pt-24 pb-8 px-6 md:p-12 lg:pt-12 transition-all duration-300">
                <div className="max-w-[1400px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
