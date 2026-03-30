"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselImages = [
        "/assets/carousel/img3.jpg",
        "/assets/carousel/img1.jpg",
        "/assets/carousel/img2.jpg"
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Update active section based on scroll position
            const sections = ["home", "about", "manuscripts", "contact"];
            for (const sectionId of sections.reverse()) {
                const el = document.getElementById(sectionId);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // Carousel interval
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 4000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(timer);
        };
    }, []);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#manuscripts", label: "Manuscripts" },
        { href: "/events", label: "Events" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900">

            {/* ─── Institutional Logo Block (Absolute Top Left) ───────────────── */}
            <div className={`absolute top-3 left-4 md:top-5 md:left-6 z-[60] transition-all duration-500`}>
                <a href="#home" className="flex items-center gap-3 md:gap-4 group bg-white/70 backdrop-blur-md md:bg-transparent md:backdrop-blur-none p-2 md:p-0 rounded-2xl md:rounded-none shadow-sm md:shadow-none ring-1 ring-stone-200/50 md:ring-0" aria-label="IKS Amrita Home">
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
                </a>
            </div>

            {/* ─── Navigation ─────────────────────────────────────────── */}
            {/* Wrapper: full-width fixed strip */}
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
                                const sectionId = link.href.replace("#", "");
                                const isActive = activeSection === sectionId;
                                return (
                                    <a
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
                                    </a>
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
                                const sectionId = link.href.replace("#", "");
                                const isActive = activeSection === sectionId;
                                return (
                                    <a
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
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </div>

            {/* ─── Hero Section ───────────────────────────────────────── */}
            <section id="home" className="relative min-h-[90vh] flex items-center pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-stone-950">
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    <div 
                        className="flex h-full w-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {carouselImages.map((src, idx) => (
                            <div 
                                key={idx} 
                                className="relative min-w-full h-full"
                            >
                                <Image
                                    src={src}
                                    alt={`Hero background ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={idx === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* High-Contrast Dark Overlay for White Text Legibility */}
                <div className="absolute inset-0 z-0 bg-stone-950/50 mix-blend-multiply" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-stone-950/70 via-stone-950/30 to-stone-950/50" />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                        <h1 className="animate-fade-up-delay-1 font-extrabold text-white mb-8 lg:mb-12 leading-[1.05] tracking-tight drop-shadow-2xl">
                            <span className="text-5xl md:text-7xl lg:text-8xl block mb-6 outline-stone-900/10">
                                Indian Knowledge <span className="text-amber-400 italic font-serif">Systems (IKS)</span>
                            </span>
                            <span className="text-xl md:text-3xl lg:text-4xl font-bold text-stone-100 max-w-5xl block mx-auto leading-tight mt-6 tracking-tight drop-shadow-lg">
                                Research Centre for Mathematical, <br className="hidden md:block" />
                                Physical and Astronomical Sciences
                            </span>
                        </h1>
                        
                        <p className="animate-fade-up-delay-2 text-base md:text-xl text-white/90 mb-8 md:mb-10 max-w-3xl leading-relaxed font-medium drop-shadow-lg">
                            Amrita Vishwa Vidyapeetham, Kochi Campus invites you to explore the scientific, philosophical, and artistic heritage of ancient India through rigorous academic research and digital preservation.
                        </p>
                        
                        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                            <a
                                href="https://manuscripts.ikskochi.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full font-semibold text-sm hover:bg-amber-900 transition-all duration-300 shadow-xl shadow-stone-900/10 hover:shadow-amber-900/20"
                            >
                                Explore Digital Archive
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {carouselImages.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                        {carouselImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`rounded-full transition-all duration-300 ${
                                    idx === currentSlide 
                                        ? "w-8 h-2 bg-amber-600 shadow-md" 
                                        : "w-2 h-2 bg-stone-900/30 hover:bg-stone-900/50"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* ─── About Section ──────────────────────────────────────── */}
            <section id="about" className="py-16 md:py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Editorial Row */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 mb-10 md:mb-16">
                        <div className="md:w-5/12">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-2 h-2 rounded-full bg-amber-600" />
                                <span className="text-stone-400 font-bold text-xs uppercase tracking-widest">Who We Are</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.1] tracking-tight">
                                Bridging Ancient Wisdom with Modern Science
                            </h2>
                        </div>
                        <div className="md:w-1/2 flex flex-col gap-6 text-xl text-stone-500 font-light leading-relaxed md:pt-14">
                            <p>
                                India’s intellectual legacy in Mathematics, Physics, and Astronomy is a significant chapter in global scientific history. The IKS Centre for Mathematical, Physical and Astronomical Studies was established to connect ancient Indian knowledge with modern research, ensuring its continued relevance.
                            </p>
                            <p className="text-stone-500">
                                Founded in March 2025 at Amrita Vishwa Vidyapeetham, Kochi Campus, the Centre focuses on the Kerala School of Mathematics and Astronomy (14th–16th centuries), led by Sangamagrama Madhava. This tradition made early contributions to calculus, trigonometry, and astronomy.
                            </p>
                            <p className="text-stone-400">
                                The Centre promotes research on ancient texts, including manuscript translation, preservation, and traditional computational methods, aiming to integrate classical insights with contemporary science.
                            </p>
                            <div className="mt-6 flex items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100 self-start">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-900">IKS</div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center text-[10px] font-bold text-amber-900">RES</div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-300 flex items-center justify-center text-[10px] font-bold text-amber-900">ARC</div>
                                </div>
                                <div className="pr-4">
                                    <p className="font-bold text-stone-900 text-sm">Expert Faculty</p>
                                    <p className="text-xs text-stone-500">Led by distinguished scholars</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards Grid
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Manuscript Conservation",
                                desc: "State-of-the-art digitization and preservation of endangered palm-leaf manuscripts.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                ),
                            },
                            {
                                title: "Interdisciplinary Research",
                                desc: "Exploring intersections between Ayurveda, Yoga, Architecture, and modern sciences.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                ),
                            },
                            {
                                title: "Academic Curriculum",
                                desc: "Structured courses providing deep insights into Indian epistemology and ontology.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                ),
                            },
                        ].map((item, i) => (
                            <div key={i} className="group p-4 md:p-8 lg:p-10 rounded-xl md:rounded-[2rem] bg-stone-50 hover:bg-stone-900 transition-colors duration-500 flex flex-col h-full border border-stone-100 hover:border-stone-900 cursor-default">
                                <div className="w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-white text-stone-900 flex items-center justify-center mb-3 md:mb-8 shadow-sm group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                                    <div className="scale-75 md:scale-100">{item.icon}</div>
                                </div>
                                <h3 className="text-base md:text-xl font-bold text-stone-900 group-hover:text-white mb-1.5 md:mb-3 transition-colors duration-500">{item.title}</h3>
                                <p className="text-[13px] md:text-base text-stone-500 group-hover:text-stone-400 leading-snug md:leading-relaxed transition-colors duration-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    */}
                </div>
            </section>

            {/* ─── Vision Section ──────────────────────────────────────── */}
            <section id="vision" className="py-16 md:py-20 bg-stone-50 relative border-t border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-2 h-2 rounded-full bg-amber-600" />
                            <span className="text-stone-400 font-bold text-xs uppercase tracking-widest">Our Future</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-8 tracking-tight">
                            Vision
                        </h2>
                        <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed text-justify">
                            To become a centre of excellence dedicated to reviving and advancing the scientific heritage of the Kerala School of Mathematics and Astronomy, while extending it’s analytical spirit to the broader realms of physical sciences. The Centre envisions fostering a harmonious integration of ancient wisdom and modern scientific exploration, nurturing innovative, value-based research that contributes to sustainable scientific and societal advancement.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Mission Section ──────────────────────────────────────── */}
            <section id="mission" className="py-16 md:py-20 bg-white relative border-t border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
                    <div className="max-w-4xl text-left md:text-right">
                        <div className="flex items-center md:justify-end gap-3 mb-6">
                            <span className="w-2 h-2 rounded-full bg-amber-600" />
                            <span className="text-stone-400 font-bold text-xs uppercase tracking-widest">Our Purpose</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-8 tracking-tight">
                            Mission
                        </h2>
                        <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed text-justify">
                            To explore, preserve, and promote the profound scientific insights of India’s intellectual heritage- particularly the legacy of the Kerala School of Mathematics and Astronomy- while broadening it’s analytical spirit to encompass the physical sciences through rigorous research, documentation, and academic collaboration. The Centre aspires to become and internationally recognized centre of excellence that bridges traditional analytical wisdom with contemporary scientific inquiry. Through interdisciplinary studies, value-based education, and authentic scholarship, it seeks to foster innovation, critical inquiry, and cultural appreciation, contributing to the advancement of science and the creation of a sustainable and enlightened society.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Objectives Section ───────────────────────────────────── */}
            <section id="objectives" className="py-16 md:py-24 bg-stone-50 relative border-t border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        <div className="lg:w-1/3">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                                <span className="text-stone-400 font-bold text-xs uppercase tracking-widest">Our Goals</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-stone-900 mb-6 tracking-tight leading-[1.1]">
                                Objectives of <br/>the <span className="text-amber-900 italic font-serif">Centre</span>
                            </h2>
                            <p className="text-stone-500 font-light leading-relaxed mb-8 hidden lg:block">
                                Key initiatives driving our mission to preserve, study, and disseminate traditional Indian sciences and arts.
                            </p>
                        </div>
                        
                        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4 lg:gap-5">
                            {[
                                "Digital Archive of Kerala School of Mathematics and Astronomy.",
                                "Reawakening of Ancient Knowledge Treasures.",
                                "A search database and catalogue of interactive manuscripts.",
                                "Research publications in the ancient Kerala School of Mathematics, Physical Science, and Astronomy.",
                                "Curriculum materials for the integration of IKS in the educational environment.",
                                "Conception of international agreements and memorandums.",
                                "Capacity building workshops, International Conferences, & Symposia."
                            ].map((obj, i) => (
                                <div key={i} className="group p-5 md:p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all flex items-start gap-4 cursor-default">
                                    <div className="w-6 h-6 rounded-full bg-amber-50 group-hover:bg-amber-500 text-amber-600 group-hover:text-white flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors border border-amber-100 group-hover:border-amber-500">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-sm md:text-base text-stone-600 group-hover:text-stone-900 font-medium leading-snug transition-colors">{obj}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Manuscripts Section (Light Mode Design) ─────────────── */}
            <section id="manuscripts" className="py-16 md:py-20 bg-[#F5F2EA] text-stone-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent_80%)]" />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section header */}
                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 md:gap-8 mb-8 pb-6 md:mb-12 border-b border-stone-200 md:pb-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4 md:mb-8">
                                <span className="w-2 h-2 rounded-full bg-amber-600" />
                                <span className="text-stone-500 font-bold text-xs uppercase tracking-widest">Digital Archive</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-stone-900 leading-[1.05] tracking-tight">
                                Preserving Rare <span className="text-amber-900 font-serif italic font-medium pr-2">Manuscripts</span>
                            </h2>
                            <p className="text-stone-600 text-xl font-light leading-relaxed mt-6">
                                Access high-resolution digital scans of rare palm-leaf and paper manuscripts collected from across Kerala.
                            </p>
                        </div>

                        <a
                            href="https://manuscripts.ikskochi.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 bg-amber-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-amber-800 transition-all shadow-xl shadow-amber-900/10 flex-shrink-0"
                        >
                            Browse Full Archive
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Manuscript cards - Light Museum Style */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Rigveda Samhita", type: "Palm Leaf", age: "16th Century", cat: "Vedas" },
                            { title: "Charaka Samhita", type: "Paper Transcript", age: "18th Century", cat: "Ayurveda" },
                            { title: "Suryasiddhanta", type: "Palm Leaf", age: "17th Century", cat: "Astronomy" },
                        ].map((item, i) => (
                            <div key={i} className="group flex flex-col bg-white rounded-xl md:rounded-3xl border border-stone-200 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-default">
                                <div className="h-28 md:h-48 lg:h-64 bg-stone-100 relative overflow-hidden flex items-center justify-center group-hover:bg-amber-50 transition-colors duration-500">
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23000'/%3E%3C/svg%3E")`, backgroundSize: "20px 20px" }} />
                                    <svg className="w-8 h-8 md:w-16 md:h-16 text-stone-300 group-hover:text-amber-500/50 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <div className="p-4 md:p-8">
                                    <div className="flex items-center justify-between mb-2 md:mb-4">
                                        <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-amber-800 bg-amber-50 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full border border-amber-100">
                                            {item.cat}
                                        </span>
                                        <span className="text-[8px] md:text-xs text-stone-400 font-bold tracking-widest uppercase">{item.age}</span>
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold text-stone-900 mb-0.5 md:mb-2 group-hover:text-amber-900 transition-colors">{item.title}</h3>
                                    <p className="text-[13px] md:text-base text-stone-500 font-light leading-snug">{item.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Contact Section ────────────────────────────────────── */}
            <section id="contact" className="py-12 md:py-20 bg-stone-50 border-t border-stone-200/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white rounded-3xl md:rounded-[3rem] border border-stone-200 shadow-xl md:shadow-2xl shadow-stone-200/30 py-10 md:py-16 px-5 md:px-12">
                    <div className="flex items-center justify-center gap-3 mb-4 md:mb-8">
                        <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                        <span className="text-stone-400 font-bold text-xs uppercase tracking-widest">Get In Touch</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-stone-900 mb-4 md:mb-6 tracking-tight">Let's Connect</h2>
                    <p className="text-stone-500 text-base md:text-xl font-light mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto">
                        Reach out to learn more about our manuscript archives and digital preservation efforts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a
                            href="mailto:iks@kh.amrita.edu"
                            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-amber-900 text-white rounded-full font-bold text-sm hover:bg-amber-800 transition-all shadow-xl shadow-amber-900/10 hover:shadow-amber-900/20 hover:-translate-y-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            iks@kh.amrita.edu
                        </a>
                        <a
                            href="tel:+918547619314"
                            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-stone-800 border border-stone-200 rounded-full font-bold text-sm hover:bg-stone-50 hover:border-stone-300 transition-all hover:-translate-y-1"
                        >
                            <svg className="w-4 h-4 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            +91 8547619314
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─────────────────────────────────────────────── */}
            <footer className="bg-stone-950 text-stone-400 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16 md:pb-10">

                    {/* Top grid */}
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
                                <h3 className="text-lg text-stone-100 font-bold tracking-tight">IKS Research Centre</h3>
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
                                <li><a href="#about" className="hover:text-amber-500 transition-colors">About Us</a></li>
                                <li><a href="#manuscripts" className="hover:text-amber-500 transition-colors">Manuscript Archive</a></li>
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
                                <li>
                                    <a href="#contact" className="inline-flex items-center gap-1.5 mt-1 text-amber-500 hover:text-amber-400 transition-colors font-medium">
                                        Send a message
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
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
