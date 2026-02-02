"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { name: "Home", id: "home" },
        { name: "Profiles", id: "profiles" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Leadership", id: "leadership" },
        { name: "Achievements", id: "achievements" },
        { name: "Contact", id: "contact" },
    ];

    // Track scroll position for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Improved active section tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: [0.3, 0.5, 0.7],
                rootMargin: "-80px 0px -50% 0px"
            }
        );

        navLinks.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed left-0 right-0 top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
                    ? "border-white/20 bg-black/70 shadow-lg shadow-black/20 backdrop-blur-xl"
                    : "border-white/10 bg-black/40 backdrop-blur-lg"
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <button
                        onClick={() => scrollToSection("home")}
                        className="group text-xl font-bold text-white transition-all duration-300 hover:text-cyan-400"
                    >
                        <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text transition-all duration-300 group-hover:from-cyan-400 group-hover:to-purple-400">
                            Siddhant Wani
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${activeSection === link.id
                                        ? "text-cyan-400"
                                        : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}

                        {/* GitHub Icon */}
                        <a
                            href="https://github.com/wsid24"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 rounded-lg p-2 text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        >
                            <FaGithub className="text-xl" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
                    >
                        {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-xl md:hidden"
                    >
                        <div className="space-y-1 px-4 py-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${activeSection === link.id
                                            ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                </button>
                            ))}

                            {/* GitHub Link in Mobile */}
                            <a
                                href="https://github.com/wsid24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                            >
                                <FaGithub className="text-lg" />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
