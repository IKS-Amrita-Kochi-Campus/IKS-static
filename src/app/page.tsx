"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 flex items-center justify-center rounded-lg shadow-sm overflow-hidden">
                                <Image
                                    src="/assets/iks.webp"
                                    alt="IKS Amrita Logo"
                                    width={56}
                                    height={56}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-stone-900 leading-none tracking-tight">IKS Amrita</h1>
                                <p className="text-xs uppercase tracking-widest text-stone-500 mt-1 font-medium">Kochi Campus</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-10">
                            <a href="#home" className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors uppercase tracking-wide">Home</a>
                            <a href="#about" className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors uppercase tracking-wide">About</a>
                            <a href="#programs" className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors uppercase tracking-wide">Programs</a>
                            <a href="#research" className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors uppercase tracking-wide">Research</a>
                            <a href="#manuscripts" className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors uppercase tracking-wide">Manuscripts</a>
                            <a href="#contact" className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors uppercase tracking-wide">Contact</a>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <Link
                                href="/manuscript"
                                className="px-6 py-2.5 bg-amber-900 text-white rounded-md font-medium text-sm hover:bg-amber-800 transition-all duration-300 shadow-sm hover:shadow-md tracking-wide"
                            >
                                Access Portal
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-stone-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-stone-200">
                        <div className="px-4 py-6 space-y-4">
                            <a href="#home" className="block text-stone-800 font-medium">Home</a>
                            <a href="#about" className="block text-stone-800 font-medium">About</a>
                            <a href="#programs" className="block text-stone-800 font-medium">Programs</a>
                            <a href="#research" className="block text-stone-800 font-medium">Research</a>
                            <a href="#manuscripts" className="block text-stone-800 font-medium">Manuscripts</a>
                            <a href="#contact" className="block text-stone-800 font-medium">Contact</a>
                            <Link
                                href="/manuscript"
                                className="block w-full px-6 py-3 bg-amber-900 text-white rounded-md text-center font-medium"
                            >
                                Access Portal
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 bg-[#FDFBF7]">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23000'/%3E%3C/svg%3E")`
                }}></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-amber-800 text-xs font-semibold tracking-widest uppercase mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        Centre of Excellence
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 mb-8 leading-[1.1]">
                        Indian Knowledge <br />
                        <span className="text-amber-900 italic">Systems</span>
                    </h1>

                    <p className="text-xl text-stone-600 mb-10 max-w-2xl leading-relaxed font-light">
                        Amrita Vishwa Vidyapeetham, Kochi Campus invites you to explore the scientific, philosophical, and artistic heritage of ancient India through rigorous academic research and digital preservation.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link
                            href="/manuscript"
                            className="px-8 py-4 bg-amber-900 text-white rounded-md font-medium text-lg hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Explore Digital Archive
                        </Link>
                        <a
                            href="#programs"
                            className="px-8 py-4 bg-white text-stone-800 border border-stone-300 rounded-md font-medium text-lg hover:bg-stone-50 transition-all hover:-translate-y-0.5"
                        >
                            View Programs
                        </a>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl border-t border-stone-200 pt-10">
                        {[
                            { number: "5,000+", label: "Archived Manuscripts" },
                            { number: "120+", label: "Research Publications" },
                            { number: "15", label: "Academic Programs" },
                            { number: "25", label: "Years of Research" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-amber-900 mb-1">{stat.number}</div>
                                <div className="text-stone-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-stone-900 mb-6 leading-tight">
                                Bridging Ancient Wisdom with Modern Science
                            </h2>
                            <div className="w-20 h-1 bg-amber-900 mb-8"></div>
                            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                                The IKS Centre at Amrita Vishwa Vidyapeetham is dedicated to the systematic study, preservation, and dissemination of traditional Indian sciences, arts, and philosophy.
                            </p>
                            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                                Our mission is to uncover the relevance of ancient texts in contemporary contexts, conducting interdisciplinary research that connects traditional knowledge with modern scientific inquiry.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex -space-x-4">
                                    {/* Placeholder avatars representing faculty/scholars - simplified with divs */}
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-500">IKS</div>
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-stone-300 flex items-center justify-center text-xs font-bold text-stone-500">RES</div>
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-stone-400 flex items-center justify-center text-xs font-bold text-stone-500">ARC</div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="font-bold text-stone-900">Expert Faculty</span>
                                    <span className="text-sm text-stone-500">Led by distinguished scholars</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {[
                                {
                                    title: "Manuscript Conservation",
                                    desc: "State-of-the-art digitization and preservation of endangered palm-leaf manuscripts.",
                                    icon: (
                                        <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Interdisciplinary Research",
                                    desc: "Exploring intersections between Ayurveda, Yoga, Architecture, and modern sciences.",
                                    icon: (
                                        <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Academic Curriculum",
                                    desc: "Structured courses providing deep insights into Indian epistemology and ontology.",
                                    icon: (
                                        <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    )
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-xl bg-stone-50 border border-stone-100 hover:border-amber-200 transition-colors">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-sm border border-stone-100 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                                        <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="py-24 bg-stone-900 text-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-6">Academic Programs</h2>
                        <p className="text-stone-400 text-lg font-light">
                            Comprehensive curricula designed to foster deep understanding of traditional knowledge systems.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Master of Arts in Sanskrit",
                                focus: "Literature & Grammar",
                                duration: "2 Years",
                                desc: "An advanced exploration of classical Sanskrit literature, Paninian grammar, and literary criticism."
                            },
                            {
                                title: "Ph.D. in Indian Knowledge Systems",
                                focus: "Interdisciplinary Research",
                                duration: "3-5 Years",
                                desc: "Research-focused program investigating scientific and philosophical concepts in ancient texts."
                            },
                            {
                                title: "Diploma in Vedic Sciences",
                                focus: "Foundational Studies",
                                duration: "1 Year",
                                desc: "A rigorous introduction to the Vedas, Vedangas, and their contemporary relevance."
                            },
                        ].map((prog, index) => (
                            <div
                                key={index}
                                className="group relative p-8 bg-stone-800 rounded-sm border border-stone-700 hover:border-amber-700 transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-amber-900 group-hover:bg-amber-600 transition-colors"></div>
                                <div className="mb-6">
                                    <span className="text-xs font-bold tracking-widest uppercase text-amber-500">{prog.focus}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-100 transition-colors">{prog.title}</h3>
                                <p className="text-stone-400 mb-6 font-light leading-relaxed">{prog.desc}</p>
                                <div className="flex items-center text-sm font-medium text-stone-300">
                                    <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {prog.duration}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Manuscript Preview */}
            <section id="manuscripts" className="py-24 bg-[#F5F2EA] border-y border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-amber-900 font-bold tracking-widest uppercase text-xs mb-2 block">Digital Archive</span>
                            <h2 className="text-4xl font-bold text-stone-900 mb-4">Preserving Rare Manuscripts</h2>
                            <p className="text-stone-600 text-lg font-light leading-relaxed">
                                Access high-resolution digital scans of rare palm-leaf and paper manuscripts collected from across Kerala.
                            </p>
                        </div>
                        <Link
                            href="/manuscript"
                            className="inline-flex items-center text-amber-900 font-semibold border-b-2 border-amber-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors"
                        >
                            Browse Full Archive
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Rigveda Samhita", type: "Palm Leaf", age: "16th Century", cat: "Vedas" },
                            { title: "Charaka Samhita", type: "Paper Transcript", age: "18th Century", cat: "Ayurveda" },
                            { title: "Suryasiddhanta", type: "Palm Leaf", age: "17th Century", cat: "Astronomy" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                                <div className="h-48 bg-stone-100 mb-6 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-stone-200/50 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded">{item.cat}</span>
                                    <span className="text-xs text-stone-500">{item.age}</span>
                                </div>
                                <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                                <p className="text-stone-500 text-sm">{item.type}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-400 py-16 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/assets/iks.webp"
                                    alt="IKS Amrita Logo"
                                    width={48}
                                    height={48}
                                    className="object-contain rounded-lg"
                                />
                                <h3 className="text-2xl text-stone-100 font-bold">IKS Amrita</h3>
                            </div>
                            <p className="max-w-xs mb-6 font-light">
                                Amrita Vishwa Vidyapeetham<br />
                                Amritapuri Campus<br />
                                Kollam, Kerala - 690525
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-amber-500 transition-colors">Twitter</a>
                                <a href="#" className="hover:text-amber-500 transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-amber-500 transition-colors">Facebook</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-stone-100 font-bold mb-6 uppercase tracking-wider text-xs">Menu</h4>
                            <ul className="space-y-3">
                                <li><a href="#about" className="hover:text-amber-500 transition-colors">About Us</a></li>
                                <li><a href="#programs" className="hover:text-amber-500 transition-colors">Academic Programs</a></li>
                                <li><a href="#research" className="hover:text-amber-500 transition-colors">Research Areas</a></li>
                                <li><a href="#manuscripts" className="hover:text-amber-500 transition-colors">Manuscript Archive</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-stone-100 font-bold mb-6 uppercase tracking-wider text-xs">Contact</h4>
                            <ul className="space-y-3">
                                <li>iks@amrita.edu</li>
                                <li>+91 476 280 1234</li>
                                <li>
                                    <a href="#contact" className="inline-block mt-2 text-amber-500 hover:text-amber-400 transition-colors">
                                        Send a message →
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© {new Date().getFullYear()} Amrita Vishwa Vidyapeetham. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-stone-200">Privacy Policy</a>
                            <a href="#" className="hover:text-stone-200">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
