"use client";

import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid credentials. Access denied.");
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-[#111] border border-[#B59431]/20 p-8 md:p-12 rounded-sm shadow-2xl">

                {/* Logo Area */}
                <div className="flex flex-col items-center mb-10">
                    <div className="relative w-32 h-20 mb-4">
                        <Image
                            src="/images/logo.png"
                            alt="YAAAS Agency"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-[#B59431] text-xs font-bold tracking-[0.4em] uppercase">
                        Admin Portal
                    </h1>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest p-4 mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Username</label>
                        <input
                            required
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white outline-none focus:border-[#B59431] transition-colors text-sm"
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white outline-none focus:border-[#B59431] transition-colors text-sm"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#B59431] text-black font-extrabold uppercase py-4 mt-4 tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Authenticating...' : 'Enter Dashboard'}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-white/30 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors"
                    >
                        Back to site
                    </button>
                </div>
            </div>
        </main>
    );
}
