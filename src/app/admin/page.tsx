"use client";

import { useState } from 'react';
import { addEvent } from './actions';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Since this is a static showcase app, using a clear local token.
        if (password === 'iksadmin') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect credentials');
        }
    };

    const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');

        const formData = new FormData(e.currentTarget);
        
        try {
            await addEvent(formData);
            setSuccessMessage('Event successfully added!');
            (e.target as HTMLFormElement).reset();
            
            // Clear success message after 4s
            setTimeout(() => setSuccessMessage(''), 4000);
        } catch (error) {
            console.error(error);
            alert('Failed to add event.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-stone-200 border border-stone-200 w-full max-w-sm">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-900 mx-auto mb-4 border border-amber-100 shadow-sm">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-stone-900 mb-2 tracking-tight">Admin Gateway</h1>
                        <p className="text-stone-500 text-sm">Valid credentials required</p>
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Admin Password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-5 py-4 pr-12 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50 transition-all font-medium text-black"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-3 bg-white/80 text-amber-900 border border-amber-200/50 inline-block">
                            Secure Area
                        </span>
                        <h1 className="text-4xl font-black text-stone-900 tracking-tight mt-2">Manage Events</h1>
                    </div>
                    <button onClick={() => setIsAuthenticated(false)} className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-bold text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors bg-white shadow-sm">
                        Lock System
                    </button>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-stone-200 p-8 md:p-12 shadow-sm">
                    <h2 className="text-2xl font-black text-stone-900 mb-8 border-b border-stone-100 pb-5">Post New Event</h2>
                    
                    {successMessage && (
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-5 py-4 rounded-xl mb-8 text-sm font-bold flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleAddEvent} className="flex flex-col gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-stone-700 tracking-wide uppercase text-[11px]">Event Name</label>
                                <input type="text" name="name" required className="px-5 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none bg-stone-50 focus:bg-white transition-colors text-black" placeholder="e.g. Annual Symposium" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-stone-700 tracking-wide uppercase text-[11px]">Date</label>
                                <input type="date" name="date" required className="px-5 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none bg-stone-50 focus:bg-white transition-colors text-black" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-stone-700 tracking-wide uppercase text-[11px]">Description</label>
                            <textarea name="description" required rows={4} className="px-5 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none resize-none bg-stone-50 focus:bg-white transition-colors text-black" placeholder="Details about the event..." />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-stone-700 tracking-wide uppercase text-[11px]">Event Photo</label>
                            <input type="file" name="photo" accept="image/*" className="file:mr-5 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-[11px] file:font-black file:uppercase file:tracking-widest file:bg-stone-900 file:text-white hover:file:bg-stone-800 cursor-pointer border border-stone-200 rounded-xl px-4 py-3 bg-stone-50" />
                        </div>

                        <button type="submit" disabled={isLoading} className="mt-6 bg-amber-900 text-white font-bold py-4 rounded-xl hover:bg-amber-800 transition-all disabled:opacity-50 shadow-lg shadow-amber-900/10 hover:-translate-y-0.5">
                            {isLoading ? 'Processing...' : 'Publish Event'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
