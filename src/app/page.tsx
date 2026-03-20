"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Update active section based on scroll position
            const sections = ["home", "about", "programs", "manuscripts", "contact"];
            for (const sectionId of sections.reverse()) {
                const el = document.getElementById(sectionId);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#programs", label: "Programs" },
        { href: "#research", label: "Research" },
        { href: "#manuscripts", label: "Manuscripts" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900">

            {/* ─── Navigation ─────────────────────────────────────────── */}
            {/* Wrapper: full-width fixed strip */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "pt-3 pb-0 px-4 sm:px-6" : ""}`}>
                <nav
                    className={`transition-all duration-500 ${
                        isScrolled
                            ? "max-w-5xl mx-auto rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg shadow-stone-200/60 ring-1 ring-stone-200/80 px-5"
                            : "bg-transparent px-4 sm:px-6 lg:px-8 border-b border-white/20"
                    }`}
                >
                    <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 ${isScrolled ? "h-16" : "h-20"}`}>

                        {/* Logo */}
                        <a href="#home" className="flex items-center gap-3 group flex-shrink-0" aria-label="IKS Amrita Home">
                            <div className={`flex items-center justify-center rounded-xl overflow-hidden ring-1 transition-all duration-500 ${
                                isScrolled
                                    ? "w-9 h-9 ring-stone-200 group-hover:ring-amber-300"
                                    : "w-11 h-11 ring-stone-200/60 group-hover:ring-amber-300 shadow-sm"
                            }`}>
                                <Image
                                    src="/assets/iks.webp"
                                    alt="IKS Amrita Logo"
                                    width={44}
                                    height={44}
                                    className="object-contain w-full h-full"
                                    priority
                                />
                            </div>
                            <div className="leading-none">
                                <p className={`font-bold text-stone-900 tracking-tight transition-all duration-500 ${isScrolled ? "text-base" : "text-lg"}`}>IKS Amrita</p>
                                {!isScrolled && (
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400 font-semibold mt-0.5">Kochi Campus</p>
                                )}
                            </div>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-7">
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
                        <div className="flex items-center gap-3">
                            <a
                                href="https://manuscripts.ikskochi.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hidden md:inline-flex items-center font-bold text-sm transition-all duration-200 tracking-wide ${
                                    isScrolled
                                        ? "px-4 py-2 bg-amber-900 text-white rounded-xl hover:bg-amber-800 shadow-sm hover:shadow-md"
                                        : "px-5 py-2.5 bg-amber-900 text-white rounded-xl hover:bg-amber-800 shadow-md hover:shadow-lg"
                                }`}
                            >
                                Access Portal
                            </a>

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
                            <div className="pt-2 border-t border-stone-100 mt-2">
                                <a
                                    href="https://manuscripts.ikskochi.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full px-6 py-3 bg-amber-900 text-white rounded-xl text-center font-bold text-sm hover:bg-amber-800 transition-colors shadow-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Access Portal
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* ─── Hero Section ───────────────────────────────────────── */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #fef3c7 0%, #fdf8f0 35%, #f5f0e8 65%, #ede8dd 100%)" }}>
                {/* Gradient edge vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-100/60 pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center py-24">

                    {/* Badge */}
                    <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/60 rounded-full text-amber-800 text-xs font-bold tracking-[0.16em] uppercase mb-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                        Centre of Excellence
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-up-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-stone-900 mb-7 leading-[1.08] tracking-tight">
                        Indian Knowledge{" "}
                        <span className="block text-amber-900 font-bold">Systems</span>
                    </h1>

                    {/* Sub-headline */}
                    <p className="animate-fade-up-delay-2 text-lg md:text-xl text-stone-500 mb-10 max-w-2xl leading-relaxed font-light">
                        Amrita Vishwa Vidyapeetham, Kochi Campus invites you to explore the scientific, philosophical, and artistic heritage of ancient India through rigorous academic research and digital preservation.
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://manuscripts.ikskochi.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-900 text-white rounded-xl font-semibold text-base hover:bg-amber-800 active:bg-amber-950 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Explore Digital Archive
                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="#programs"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-stone-800 border border-stone-200 rounded-xl font-semibold text-base hover:bg-stone-50 hover:border-stone-300 active:bg-stone-100 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                        >
                            View Programs
                        </a>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-20 w-full max-w-4xl">
                        <div className="border border-stone-200 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden">
                            <div className="grid grid-cols-2 md:grid-cols-4">
                                {[
                                    { number: "5,000+", label: "Archived Manuscripts" },
                                    { number: "120+", label: "Research Publications" },
                                    { number: "15", label: "Academic Programs" },
                                    { number: "25", label: "Years of Research" },
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`stat-item flex flex-col items-center justify-center py-8 px-6 ${
                                            index < 2 ? "border-b md:border-b-0 border-stone-200" : ""
                                        }`}
                                    >
                                        <div className="text-3xl md:text-4xl font-bold text-amber-900 mb-1.5 tabular-nums">{stat.number}</div>
                                        <div className="text-stone-500 text-xs font-semibold uppercase tracking-wider text-center">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs text-stone-400 font-medium tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-stone-300 to-transparent" />
                </div>
            </section>

            {/* ─── About Section ──────────────────────────────────────── */}
            <section id="about" className="py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left: Text content */}
                        <div>
                            <div className="section-label text-amber-900 mb-5">
                                <span className="w-8 h-px bg-amber-900 inline-block" />
                                Who We Are
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight tracking-tight">
                                Bridging Ancient Wisdom with Modern Science
                            </h2>

                            <div className="w-16 h-1 bg-amber-900 rounded-full mb-8" />

                            <p className="text-lg text-stone-600 mb-5 leading-relaxed">
                                The IKS Centre at Amrita Vishwa Vidyapeetham is dedicated to the systematic study, preservation, and dissemination of traditional Indian sciences, arts, and philosophy.
                            </p>
                            <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                                Our mission is to uncover the relevance of ancient texts in contemporary contexts, conducting interdisciplinary research that connects traditional knowledge with modern scientific inquiry.
                            </p>

                            {/* Faculty strip */}
                            <div className="flex items-center gap-5 p-5 rounded-xl bg-stone-50 border border-stone-100">
                                <div className="flex -space-x-3 flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-500 shadow-sm">IKS</div>
                                    <div className="w-11 h-11 rounded-full border-2 border-white bg-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-500 shadow-sm">RES</div>
                                    <div className="w-11 h-11 rounded-full border-2 border-white bg-stone-400 flex items-center justify-center text-[10px] font-bold text-stone-500 shadow-sm">ARC</div>
                                </div>
                                <div>
                                    <p className="font-bold text-stone-900 text-sm">Expert Faculty</p>
                                    <p className="text-xs text-stone-500 mt-0.5">Led by distinguished scholars</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Feature cards */}
                        <div className="flex flex-col gap-5">
                            {[
                                {
                                    title: "Manuscript Conservation",
                                    desc: "State-of-the-art digitization and preservation of endangered palm-leaf manuscripts.",
                                    icon: (
                                        <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Interdisciplinary Research",
                                    desc: "Exploring intersections between Ayurveda, Yoga, Architecture, and modern sciences.",
                                    icon: (
                                        <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Academic Curriculum",
                                    desc: "Structured courses providing deep insights into Indian epistemology and ontology.",
                                    icon: (
                                        <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    ),
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="card-lift flex gap-5 p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 hover:bg-white"
                                >
                                    <div className="flex-shrink-0 w-11 h-11 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-stone-900 mb-1.5">{item.title}</h3>
                                        <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Programs Section ───────────────────────────────────── */}
            <section id="programs" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #fafaf9 0%, #f5f0e8 50%, #fafaf9 100%)" }}>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div>
                            <div className="section-label text-amber-900 mb-5">
                                <span className="w-8 h-px bg-amber-900 inline-block" />
                                What We Offer
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">Academic Programs</h2>
                        </div>
                        <p className="text-stone-500 text-base font-light leading-relaxed max-w-sm md:text-right">
                            Comprehensive curricula designed to foster deep understanding of traditional knowledge systems.
                        </p>
                    </div>

                    {/* Program cards */}
                    <div className="grid md:grid-cols-3 gap-7">
                        {[
                            {
                                title: "Master of Arts in Sanskrit",
                                focus: "Literature & Grammar",
                                duration: "2 Years",
                                desc: "An advanced exploration of classical Sanskrit literature, Paninian grammar, and literary criticism.",
                                number: "01",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Ph.D. in Indian Knowledge Systems",
                                focus: "Interdisciplinary Research",
                                duration: "3-5 Years",
                                desc: "Research-focused program investigating scientific and philosophical concepts in ancient texts.",
                                number: "02",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Diploma in Vedic Sciences",
                                focus: "Foundational Studies",
                                duration: "1 Year",
                                desc: "A rigorous introduction to the Vedas, Vedangas, and their contemporary relevance.",
                                number: "03",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                            },
                        ].map((prog, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 overflow-hidden card-lift"
                            >
                                {/* Card header strip */}
                                <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-stone-100">
                                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-900 group-hover:bg-amber-900 group-hover:text-white group-hover:border-amber-900 transition-all duration-300">
                                        {prog.icon}
                                    </div>
                                    <span className="text-5xl font-black text-stone-100 group-hover:text-amber-100 transition-colors select-none leading-none tabular-nums">
                                        {prog.number}
                                    </span>
                                </div>

                                {/* Card body */}
                                <div className="px-7 py-6">
                                    <span className="inline-block text-[10px] font-bold tracking-[0.16em] uppercase text-amber-800 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full mb-4">
                                        {prog.focus}
                                    </span>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3 leading-snug group-hover:text-amber-900 transition-colors">
                                        {prog.title}
                                    </h3>
                                    <p className="text-stone-500 text-sm leading-relaxed mb-6">
                                        {prog.desc}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-stone-400">
                                        <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{prog.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Manuscripts Section ────────────────────────────────── */}
            <section id="manuscripts" className="py-28 bg-[#F5F2EA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div className="max-w-xl">
                            <div className="section-label text-amber-900 mb-5">
                                <span className="w-8 h-px bg-amber-900 inline-block" />
                                Digital Archive
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-5 tracking-tight leading-tight">
                                Preserving Rare Manuscripts
                            </h2>
                            <p className="text-stone-600 text-lg font-light leading-relaxed">
                                Access high-resolution digital scans of rare palm-leaf and paper manuscripts collected from across Kerala.
                            </p>
                        </div>

                        <a
                            href="https://manuscripts.ikskochi.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-amber-900 font-bold text-sm border-b-2 border-amber-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors flex-shrink-0"
                        >
                            Browse Full Archive
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Manuscript cards */}
                    <div className="grid md:grid-cols-3 gap-7">
                        {[
                            { title: "Rigveda Samhita", type: "Palm Leaf", age: "16th Century", cat: "Vedas" },
                            { title: "Charaka Samhita", type: "Paper Transcript", age: "18th Century", cat: "Ayurveda" },
                            { title: "Suryasiddhanta", type: "Palm Leaf", age: "17th Century", cat: "Astronomy" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="card-lift bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-amber-200"
                            >
                                {/* Placeholder image area */}
                                <div className="h-52 bg-gradient-to-br from-stone-100 to-stone-200 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23000'/%3E%3C/svg%3E")`,
                                            backgroundSize: "20px 20px",
                                        }}
                                    />
                                    <svg className="w-14 h-14 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>

                                {/* Card body */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                                            {item.cat}
                                        </span>
                                        <span className="text-xs text-stone-400 font-medium">{item.age}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-stone-900 mb-1">{item.title}</h3>
                                    <p className="text-stone-500 text-sm">{item.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Contact Section ────────────────────────────────────── */}
            <section id="contact" className="py-28 bg-white border-t border-stone-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="section-label text-amber-900 mb-5 justify-center">
                        <span className="w-8 h-px bg-amber-900 inline-block" />
                        Get In Touch
                        <span className="w-8 h-px bg-amber-900 inline-block" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-5 tracking-tight">Contact Us</h2>
                    <p className="text-stone-500 text-lg font-light mb-10 leading-relaxed">
                        Reach out to learn more about our programs, manuscripts, or research collaborations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:iks@amrita.edu"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-900 text-white rounded-xl font-semibold text-sm hover:bg-amber-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            iks@amrita.edu
                        </a>
                        <a
                            href="tel:+918547619314"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-stone-100 text-stone-800 rounded-xl font-semibold text-sm hover:bg-stone-200 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +91 8547619314
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─────────────────────────────────────────────── */}
            <footer className="bg-stone-950 text-stone-400 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

                    {/* Top grid */}
                    <div className="grid md:grid-cols-4 gap-12 mb-14 pb-14 border-b border-stone-800">

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
                            <div className="flex items-center gap-6 mb-6">
                                <Image
                                    src="/assets/AVV LOGO.png"
                                    alt="Amrita Vishwa Vidyapeetham Kochi Campus"
                                    width={200}
                                    height={56}
                                    className="object-contain h-10 w-auto opacity-60 hover:opacity-90 transition-opacity"
                                    style={{ mixBlendMode: "screen" }}
                                />
                                <Image
                                    src="/assets/IMG-20260128-WA0120.jpg"
                                    alt="Ministry of Education, Government of India"
                                    width={56}
                                    height={56}
                                    className="object-contain h-10 w-auto opacity-60 hover:opacity-90 transition-opacity rounded"
                                    style={{ mixBlendMode: "screen" }}
                                />
                            </div>
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
                                <li><a href="#programs" className="hover:text-amber-500 transition-colors">Academic Programs</a></li>
                                <li><a href="#research" className="hover:text-amber-500 transition-colors">Research Areas</a></li>
                                <li><a href="#manuscripts" className="hover:text-amber-500 transition-colors">Manuscript Archive</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-stone-100 font-bold mb-6 uppercase tracking-[0.14em] text-xs">Contact</h4>
                            <ul className="space-y-3.5">
                                <li>
                                    <a href="mailto:iks@amrita.edu" className="hover:text-amber-500 transition-colors">iks@amrita.edu</a>
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
                        <div className="flex gap-6">
                            <a href="#" className="text-stone-600 hover:text-stone-300 transition-colors text-xs">Privacy Policy</a>
                            <a href="#" className="text-stone-600 hover:text-stone-300 transition-colors text-xs">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
