import React, { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Command, Mail, Menu, Moon, Search, Sun, Terminal, User, X, Briefcase, Code } from "lucide-react";

const commands = [
    { id: "about", label: "About", icon: User, description: "Journey, profile, and background" },
    { id: "projects", label: "Projects", icon: Briefcase, description: "Web, mobile, and data projects" },
    { id: "skills", label: "Skills", icon: Code, description: "Tech stack and strengths" },
    { id: "contact", label: "Contact", icon: Mail, description: "Reach out via email and links" },
];

function Layout() {
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return true;
        const savedTheme = window.localStorage.getItem("theme-mode");
        if (savedTheme === "dark") return true;
        if (savedTheme === "light") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = useMemo(
        () => [
            { path: "/", label: "Home" },
            { path: "/projects", label: "Projects" },
            { path: "/experience", label: "Experience" },
            { path: "/about", label: "About Me" },
        ],
        []
    );

    const filteredCommands = commands.filter(
        (cmd) =>
            cmd.label.toLowerCase().includes(search.toLowerCase()) ||
            cmd.description.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 10);
            setShowBackToTop(scrollY > 240);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const openPalette = () => setCommandPaletteOpen(true);
        window.addEventListener("openCommandPalette", openPalette);
        return () => window.removeEventListener("openCommandPalette", openPalette);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                setCommandPaletteOpen((prev) => !prev);
                return;
            }

            if (!commandPaletteOpen) return;

            if (event.key === "Escape") {
                setCommandPaletteOpen(false);
            } else if (event.key === "ArrowDown") {
                if (filteredCommands.length === 0) return;
                event.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
            } else if (event.key === "ArrowUp") {
                if (filteredCommands.length === 0) return;
                event.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (event.key === "Enter") {
                if (!filteredCommands[selectedIndex]) return;
                event.preventDefault();
                handleNavigate(filteredCommands[selectedIndex].id);
                setCommandPaletteOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [commandPaletteOpen, filteredCommands, selectedIndex]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem("theme-mode", isDark ? "dark" : "light");
    }, [isDark]);

    const handleNavigate = (section) => {
        const routeMap = {
            about: "/about",
            projects: "/projects",
            skills: "/experience",
            contact: "/",
        };

        const route = routeMap[section];
        if (!route) return;

        navigate(route);
        setTimeout(() => {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 120);
    };

    return (
        <div className={`relative isolate min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a0f] text-white" : "bg-[#f3f6ff] text-[#0f172a] theme-light"}`}>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
                    ? "border-b border-white/10 bg-[#0a0a0f]/80 shadow-lg shadow-blue-500/5 backdrop-blur-xl"
                    : "border-b border-white/5 bg-transparent"
                    }`}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform group-hover:scale-110">
                                <img src="/jp.png" alt="Jignesh logo" className="h-7 w-7 rounded-md object-cover" />
                            </div>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 blur transition-opacity group-hover:opacity-50" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-white transition-colors group-hover:text-cyan-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                Jignesh Prajapati
                            </div>
                            <div className="text-xs text-gray-500" style={{ fontFamily: "Space Grotesk, monospace" }}>
                                Flutter Developer
                            </div>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => {
                            const isActive =
                                location.pathname === link.path ||
                                (link.path === "/projects" && location.pathname.startsWith("/projects/"));
                            return (
                                <Link key={link.path} to={link.path} className="group relative px-4 py-2">
                                    <span
                                        className={`relative z-10 transition-colors ${isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-white"}`}
                                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                    >
                                        {link.label}
                                    </span>
                                    {isActive ? (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    ) : null}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-2 lg:flex">
                            <a
                                href="mailto:prajapatijignesh255@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg p-2 text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/Jignesh5049"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg p-2 text-gray-400 transition-all hover:bg-white/5 hover:text-cyan-400"
                                aria-label="GitHub"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.46-1.15-1.11-1.45-1.11-1.45-.91-.61.07-.6.07-.6 1 .08 1.53 1.03 1.53 1.03.9 1.54 2.36 1.09 2.94.83.09-.66.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.52 9.52 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" />
                                </svg>
                            </a>
                        </div>

                        <div className="hidden h-6 w-px bg-white/10 lg:block" />

                        <button
                            type="button"
                            onClick={() => setCommandPaletteOpen(true)}
                            className="group hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all hover:border-cyan-500/30 hover:bg-white/10 sm:flex"
                            aria-label="Open command palette"
                        >
                            <Command className="h-4 w-4 text-cyan-400" />
                            <kbd className="hidden text-xs text-gray-500 lg:block">Ctrl/⌘ K</kbd>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsDark((prev) => !prev)}
                            className="rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-purple-500/30 hover:bg-white/10"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Moon className="h-5 w-5 text-purple-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:bg-white/10 md:hidden"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 right-0 top-16 z-40 w-80 overflow-y-auto border-l border-white/10 bg-[#0d1117]/95 backdrop-blur-xl md:hidden"
                        >
                            <div className="p-6">
                                <div className="mb-8">
                                    <h3 className="mb-4 text-xs uppercase tracking-wider text-gray-500" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                        Navigation
                                    </h3>
                                    <div className="space-y-2">
                                        {navLinks.map((link) => {
                                            const isActive = location.pathname === link.path;
                                            return (
                                                <Link
                                                    key={link.path}
                                                    to={link.path}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`block rounded-lg px-4 py-3 transition-all ${isActive
                                                        ? "border border-cyan-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400"
                                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                                        }`}
                                                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                                >
                                                    {link.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="mb-4 text-xs uppercase tracking-wider text-gray-500" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                        Connect
                                    </h3>
                                    <div className="space-y-2">
                                        <a
                                            href="mailto:prajapatijignesh255@gmail.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                        >
                                            <Mail className="h-5 w-5" />
                                            Email
                                        </a>
                                        <a
                                            href="https://github.com/Jignesh5049"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-gray-400 transition-all hover:bg-white/10 hover:text-cyan-400"
                                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                        >
                                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.46-1.15-1.11-1.45-1.11-1.45-.91-.61.07-.6.07-.6 1 .08 1.53 1.03 1.53 1.03.9 1.54 2.36 1.09 2.94.83.09-.66.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.52 9.52 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setCommandPaletteOpen(true);
                                    }}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 transition-transform hover:scale-105"
                                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                >
                                    <Command className="h-5 w-5" />
                                    Command Palette
                                </button>
                            </div>
                        </motion.div>
                    </>
                ) : null}
            </AnimatePresence>

            <main>
                <Outlet context={{ onNavigate: handleNavigate }} />
            </main>

            <footer className="relative border-t border-white/10 bg-[#0a0a0f] py-12">
                <div className="relative z-10 mx-auto max-w-7xl px-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "Orbitron, sans-serif" }}>
                                Jignesh Prajapati
                            </h3>
                            <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                                Flutter Developer | UI/UX Designer
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-sm text-gray-500"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                            <p>
                                © {new Date().getFullYear()} Built with <span className="animate-pulse text-pink-400">♥</span> by Jignesh
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-6 text-sm"
                        >
                            <button
                                type="button"
                                onClick={() => handleNavigate("about")}
                                className="text-gray-500 transition-colors hover:text-cyan-400"
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                About
                            </button>
                            <button
                                type="button"
                                onClick={() => handleNavigate("projects")}
                                className="text-gray-500 transition-colors hover:text-purple-400"
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                Projects
                            </button>
                            <button
                                type="button"
                                onClick={() => handleNavigate("contact")}
                                className="text-gray-500 transition-colors hover:text-pink-400"
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                Contact
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-xs text-gray-600" style={{ fontFamily: "Space Grotesk, monospace" }}>
                            {">"} Keep building. Keep learning.
                        </p>
                    </motion.div>
                </div>
            </footer>

            <AnimatePresence>
                {showBackToTop ? (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.85, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 12 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="group fixed bottom-8 right-8 z-40 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1117]/90 px-5 py-4 shadow-2xl shadow-blue-500/20 backdrop-blur-xl transition-all hover:scale-105 hover:border-cyan-500/30 hover:bg-[#111827]"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        aria-label="Back to top"
                    >
                        <ArrowUp className="h-5 w-5 text-cyan-400 transition-transform group-hover:-translate-y-0.5" />
                        <span className="text-sm text-white">Back to top</span>
                    </motion.button>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {commandPaletteOpen ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCommandPaletteOpen(false)}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        />

                        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[20vh]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                className="w-full max-w-2xl overflow-hidden rounded-2xl border border-blue-500/30 bg-[#0d1117]/95 shadow-2xl shadow-blue-500/20 backdrop-blur-xl"
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                <div className="flex items-center gap-4 border-b border-white/10 p-6">
                                    <Search className="h-5 w-5 text-cyan-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search commands or navigate..."
                                        className="flex-1 border-none bg-transparent text-white outline-none placeholder:text-gray-500"
                                        autoFocus
                                    />
                                    <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-400">ESC</kbd>
                                </div>

                                <div className="max-h-[400px] overflow-y-auto">
                                    {filteredCommands.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No commands found</div>
                                    ) : (
                                        filteredCommands.map((cmd, index) => {
                                            const Icon = cmd.icon;
                                            const isSelected = index === selectedIndex;
                                            return (
                                                <button
                                                    key={cmd.id}
                                                    type="button"
                                                    onClick={() => {
                                                        handleNavigate(cmd.id);
                                                        setCommandPaletteOpen(false);
                                                    }}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                    className={`w-full border-l-4 p-4 transition-all ${isSelected
                                                        ? "border-cyan-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                                                        : "border-transparent hover:bg-white/5"
                                                        } flex items-center gap-4`}
                                                >
                                                    <div className={`rounded-lg p-2 ${isSelected ? "bg-cyan-400/20" : "bg-white/5"}`}>
                                                        <Icon className={`h-5 w-5 ${isSelected ? "text-cyan-400" : "text-gray-400"}`} />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className={`mb-1 ${isSelected ? "text-white" : "text-gray-300"}`}>{cmd.label}</div>
                                                        <div className="text-sm text-gray-500">{cmd.description}</div>
                                                    </div>
                                                    {isSelected ? (
                                                        <kbd className="rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-400">↵</kbd>
                                                    ) : null}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="flex items-center justify-between border-t border-white/10 bg-white/5 p-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Terminal className="h-4 w-4" />
                                        <span>Command Palette</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-2">
                                            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↑↓</kbd>
                                            Navigate
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↵</kbd>
                                            Select
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default Layout;
