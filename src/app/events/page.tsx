"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    images: string[];
    createdAt: string;
}

export default function EventsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselImages = events
        .flatMap(event => (event.images || []).map(img => `https://api.ikskochi.org${img}`));

    useEffect(() => {
        if (carouselImages.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [carouselImages.length]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://api.ikskochi.org/api/events");
                if (!response.ok) {
                    throw new Error("Failed to load events");
                }
                const data = await response.json();
                if (data.success) {
                    setEvents(data.events || []);
                } else {
                    throw new Error("Failed to load events");
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEvent) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedEvent]);

    const navLinks = [
        { href: "/#home", label: "Home" },
        { href: "/#about", label: "About" },
        { href: "/#manuscripts", label: "Manuscripts" },
        { href: "/events", label: "Events" },
        { href: "/#contact", label: "Contact" },
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900">

            {/* ─── Institutional Logo Block (Absolute Top Left) ───────────────── */}
            <div className={`absolute top-3 left-4 md:top-5 md:left-6 z-[60] transition-all duration-500`}>
                <Link href="/#home" className="flex items-center gap-3 md:gap-4 group bg-white/70 backdrop-blur-md md:bg-transparent md:backdrop-blur-none p-2 md:p-0 rounded-2xl md:rounded-none shadow-sm md:shadow-none ring-1 ring-stone-200/50 md:ring-0" aria-label="IKS Amrita Home">
                    {/* IKS Logo */}
                    <div className={`flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                        isScrolled
                            ? "w-10 h-10 md:w-12 md:h-12"
                            : "w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                    }`}>
                        <Image
                            src="/assets/iks.webp"
                            alt="IKS Amrita Logo"
                            width={80}
                            height={80}
                            className="object-contain w-full h-full"
                            priority
                        />
                    </div>

                    {/* Amrita University Logo */}
                    <div className={`flex items-center transition-all duration-500 flex-shrink-0 ${
                        isScrolled ? "h-8 md:h-10" : "h-12 md:h-14 lg:h-16"
                    }`}>
                        <Image
                            src="/assets/AVV LOGO.png"
                            alt="Amrita Vishwa Vidyapeetham"
                            width={220}
                            height={64}
                            className="object-contain h-full w-auto"
                        />
                    </div>

                    {/* Gov of India Logo */}
                    <div className={`hidden sm:flex items-center transition-all duration-500 flex-shrink-0 ${
                        isScrolled ? "h-10 md:h-12" : "h-16 md:h-18 lg:h-20"
                    }`}>
                        <Image
                            src="/assets/moe_logo_final.png"
                            alt="Ministry of Education"
                            width={220}
                            height={80}
                            className="object-contain h-full w-auto"
                        />
                    </div>
                </Link>
            </div>

            {/* ─── Navigation ─────────────────────────────────────────── */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-3 px-4 sm:px-6 pointer-events-none flex justify-end`}>
                <nav
                    className={`transition-all duration-500 pointer-events-auto rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg ring-1 ring-stone-200/80 px-4 sm:px-5 ${
                        isScrolled ? "shadow-stone-200/60" : "shadow-stone-200/30"
                    }`}
                >
                    <div className={`flex items-center gap-4 transition-all duration-500 ${isScrolled ? "h-12" : "h-14 sm:h-16"}`}>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-7">
                            {navLinks.map((link) => {
                                const isActive = link.href === "/events";
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 py-1 ${
                                            isActive
                                                ? "text-amber-900"
                                                : "text-stone-500 hover:text-stone-900"
                                        }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-amber-800 rounded-full" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA + Mobile toggle */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMenuOpen}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`md:hidden overflow-hidden transition-all duration-300 ${
                            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className={`px-2 pb-4 pt-2 space-y-1 border-t ${isScrolled ? "border-stone-100" : "border-white/20"}`}>
                            {navLinks.map((link) => {
                                const isActive = link.href === "/events";
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-colors text-sm ${
                                            isActive
                                                ? "bg-amber-50 text-amber-900"
                                                : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />}
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </div>

            {/* ─── Hero Section with Carousel ─────────────────────────── */}
            <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-stone-950 pt-28 md:pt-36">
                {/* Carousel Background */}
                <div className="absolute inset-0 z-0">
                    {carouselImages.length > 0 ? (
                        carouselImages.map((img, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    idx === currentSlide ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Event highlight ${idx + 1}`}
                                    fill
                                    className="object-cover scale-100"
                                    priority={idx === 0}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="absolute inset-0 bg-stone-200" />
                    )}
                    {/* High-Contrast Dark Overlay for White Text Legibility */}
                    <div className="absolute inset-0 bg-stone-950/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/20 to-stone-950/40" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md shadow-sm border border-white/20 rounded-full text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Updates & Activities
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-white drop-shadow-lg">
                        Events & <span className="text-amber-400 italic font-serif">News</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-stone-100 text-lg md:text-xl font-light leading-relaxed mb-4 drop-shadow-md">
                        Stay connected with the latest academic programs, symposiums, and cultural milestones taking place at IKS Amrita.
                    </p>
                    
                    {/* Carousel Dots - Updated for Dark Theme */}
                    {carouselImages.length > 1 && (
                        <div className="mt-12 flex justify-center gap-3">
                            {carouselImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1.5 transition-all duration-300 rounded-full ${
                                        idx === currentSlide ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/60"
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── Events Content ───────────────────────────────────────── */}
            <main className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-stone-500 font-medium uppercase tracking-widest text-xs">Loading Events...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-800 p-8 rounded-2xl text-center border border-red-100 max-w-2xl mx-auto">
                        <svg className="w-12 h-12 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h2 className="text-xl font-bold mb-2">Failed to load events</h2>
                        <p className="text-sm text-red-600/80">There was an error communicating with our servers. Please try refreshing the page later.</p>
                    </div>
                ) : events.length === 0 ? (
                    <div className="bg-stone-100 text-stone-600 p-12 rounded-3xl text-center border border-stone-200 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-2">No events available</h2>
                        <p className="text-stone-500">Check back later for updates on upcoming events and announcements.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                        {events.map((event) => {
                            const eventDate = new Date(event.date);
                            const formattedDate = eventDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            });

                            return (
                                <article 
                                    key={event._id} 
                                    className="group bg-white rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 overflow-hidden flex flex-col cursor-pointer"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    {event.images && event.images.length > 0 ? (
                                        <div className="relative w-full h-40 md:h-48 bg-stone-100 overflow-hidden">
                                            <Image 
                                                src={`https://api.ikskochi.org${event.images[0]}`}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                            />
                                            {event.images.length > 1 && (
                                                <div className="absolute top-2 right-2 bg-stone-900/70 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    +{event.images.length - 1} Images
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-40 md:h-48 bg-stone-50 border-b border-stone-100 flex items-center justify-center p-6 text-center group-hover:bg-amber-50/50 transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center text-stone-300 group-hover:text-amber-400 transition-colors mb-2">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 text-center inline-block">
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <h2 className="text-lg md:text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-900 transition-colors leading-tight line-clamp-2">
                                            {event.title}
                                        </h2>
                                        <p className="text-xs md:text-sm text-stone-500 font-light leading-relaxed line-clamp-3 mb-4 flex-grow">
                                            {event.description}
                                        </p>
                                        
                                        {event.images && event.images.length > 1 && (
                                            <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-stone-100">
                                                {event.images.slice(1, 4).map((img, idx) => (
                                                    <div key={idx} className="relative w-8 h-8 md:w-10 md:h-10 rounded-md overflow-hidden border border-stone-200">
                                                        <Image
                                                            src={`https://api.ikskochi.org${img}`}
                                                            alt={`${event.title} image ${idx + 2}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ))}
                                                {event.images.length > 4 && (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-stone-100 border border-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-400">
                                                        +{event.images.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* ─── Event Modal ────────────────────────────────────────────── */}
            {selectedEvent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setSelectedEvent(null)}>
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" />
                    
                    <div 
                        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="overflow-y-auto w-full max-h-[90vh]">
                            {selectedEvent.images && selectedEvent.images.length > 0 && (
                                <div className="w-full relative bg-stone-100">
                                    <div className="relative w-full h-64 md:h-96">
                                        <Image 
                                            src={`https://api.ikskochi.org${selectedEvent.images[0]}`}
                                            alt={selectedEvent.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1200px) 100vw, 1200px"
                                        />
                                    </div>
                                </div>
                            )}
                            
                            <div className="p-6 md:p-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                        {new Date(selectedEvent.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-6 leading-tight">
                                    {selectedEvent.title}
                                </h2>
                                <p className="text-stone-600 font-light leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                                    {selectedEvent.description}
                                </p>

                                {selectedEvent.images && selectedEvent.images.length > 1 && (
                                    <div className="mt-10 pt-8 border-t border-stone-100">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">Gallery</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {selectedEvent.images.slice(1).map((img, idx) => (
                                                <div key={idx} className="relative w-full aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                                                    <Image
                                                        src={`https://api.ikskochi.org${img}`}
                                                        alt={`${selectedEvent.title} gallery image ${idx + 1}`}
                                                        fill
                                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Footer ─────────────────────────────────────────────── */}
            <footer className="bg-stone-950 text-stone-400 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16 md:pb-10">
                    <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-10 pb-10 md:mb-14 md:pb-14 border-b border-stone-800">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-stone-700">
                                    <Image
                                        src="/assets/iks.webp"
                                        alt="IKS Amrita Logo"
                                        width={40}
                                        height={40}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <h3 className="text-lg text-stone-100 font-bold tracking-tight">IKS Amrita</h3>
                            </div>
                            <p className="max-w-xs mb-6 font-light leading-relaxed text-stone-500">
                                Amrita Vishwa Vidyapeetham, Kochi Campus<br />
                                Brahmasthanam, Edappally North P.O.<br />
                                Kochi - 682 024, Kerala
                            </p>
                            <div className="flex gap-5">
                                <a href="#" className="hover:text-amber-500 transition-colors text-xs font-medium uppercase tracking-wider">Twitter</a>
                                <a href="#" className="hover:text-amber-500 transition-colors text-xs font-medium uppercase tracking-wider">LinkedIn</a>
                                <a href="#" className="hover:text-amber-500 transition-colors text-xs font-medium uppercase tracking-wider">Facebook</a>
                            </div>
                        </div>

                        {/* Menu */}
                        <div>
                            <h4 className="text-stone-100 font-bold mb-6 uppercase tracking-[0.14em] text-xs">Menu</h4>
                            <ul className="space-y-3.5">
                                <li><Link href="/events" className="hover:text-amber-500 transition-colors">Events</Link></li>
                                <li><a href="https://manuscripts.ikskochi.org" className="hover:text-amber-500 transition-colors">Manuscript Archive</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-stone-100 font-bold mb-6 uppercase tracking-[0.14em] text-xs">Contact</h4>
                            <ul className="space-y-3.5">
                                <li>
                                    <a href="mailto:iks@kh.amrita.edu" className="hover:text-amber-500 transition-colors">iks@kh.amrita.edu</a>
                                </li>
                                <li>
                                    <a href="tel:+918547619314" className="hover:text-amber-500 transition-colors">+91 8547619314</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-stone-600 text-xs">
                            © {new Date().getFullYear()} Amrita Vishwa Vidyapeetham. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            <a href="#" className="text-stone-600 hover:text-stone-300 transition-colors text-xs">Privacy Policy</a>
                            <a href="#" className="text-stone-600 hover:text-stone-300 transition-colors text-xs">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
