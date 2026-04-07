import React, { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
    AtSign,
    ArrowRight,
    ChevronRight,
    Folder,
    Globe,
    Link2,
    Mail,
    MapPin,
    Sparkles,
    Terminal,
    Timer,
} from "lucide-react";
import { ABOUT_COPY, SOCIAL_LINKS } from "../data/profile";
import { PROJECT_IMAGES, PROJECTS } from "../data/projects";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const aboutTimeline = [
    {
        phase: "01",
        title: "Started with design and web basics",
        description:
            "Built my foundation through HTML, CSS, JavaScript, and UI exploration while learning how digital products are planned and structured.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        phase: "02",
        title: "UI/UX internship experience",
        description:
            "At Venom Technology, I created wireframes, polished interface screens, and interactive prototypes in Figma with a focus on usability.",
        color: "from-cyan-500 to-purple-500",
    },
    {
        phase: "03",
        title: "Expanded into data and ML projects",
        description:
            "Worked on analytics and predictive modeling projects using Python, Pandas, Matplotlib, and Scikit-learn to generate practical insights.",
        color: "from-purple-500 to-pink-500",
    },
    {
        phase: "04",
        title: "Now building cross-platform apps",
        description:
            "As a Flutter Developer Intern at TenUp Software Service, I build responsive app components, state-driven features, and production-ready flows.",
        color: "from-pink-500 to-blue-500",
    },
];

function Home() {
    const [typedText, setTypedText] = useState("");
    const [currentLine, setCurrentLine] = useState(0);
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
    const [contactStatus, setContactStatus] = useState({ type: null, message: "" });
    const [contactLoading, setContactLoading] = useState(false);
    const navigate = useNavigate();
    const { onNavigate } = useOutletContext() || {};

    const lines = useMemo(
        () => [
            "> Initializing Developer...",
            "> Name: Jignesh Prajapati",
            "> Role: Flutter Developer | UI/UX Designer",
            "> Status: Ready",
        ],
        []
    );

    const featuredProjects = PROJECTS.slice(0, 3).map((project) => ({
        ...project,
        image: project.imagesKey ? PROJECT_IMAGES[project.imagesKey]?.[0] : null,
    }));

    const connectLinks = useMemo(
        () => [
            {
                label: "GitHub",
                href: SOCIAL_LINKS.find((item) => item.label === "GitHub")?.href || "https://github.com/Jignesh5049",
                icon: Link2,
            },
            {
                label: "LinkedIn",
                href: "https://www.linkedin.com/",
                icon: Globe,
            },
            {
                label: "Twitter",
                href: "https://x.com/",
                icon: AtSign,
            },
            {
                label: "Email",
                href: `mailto:${ABOUT_COPY.email}`,
                icon: Mail,
            },
        ],
        []
    );

    useEffect(() => {
        if (currentLine >= lines.length) return undefined;

        const fullLine = lines[currentLine];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex <= fullLine.length) {
                setTypedText(lines.slice(0, currentLine).join("\n") + "\n" + fullLine.slice(0, charIndex));
                charIndex += 1;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setCurrentLine((prev) => prev + 1);
                }, 500);
            }
        }, 40);

        return () => clearInterval(typeInterval);
    }, [currentLine, lines]);

    const handleContactSubmit = async (event) => {
        event.preventDefault();

        if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
            setContactStatus({ type: "error", message: "Please fill all fields before sending." });
            return;
        }

        setContactLoading(true);
        setContactStatus({ type: null, message: "" });

        try {
            if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
                const mailtoBody = encodeURIComponent(
                    `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
                );
                window.location.href = `mailto:${ABOUT_COPY.email}?subject=Portfolio%20Contact&body=${mailtoBody}`;
                setContactStatus({ type: "success", message: "Email app opened. Please send your message there." });
            } else {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        from_name: contactForm.name,
                        from_email: contactForm.email,
                        message: contactForm.message,
                        to_email: ABOUT_COPY.email,
                    },
                    EMAILJS_PUBLIC_KEY
                );

                setContactStatus({ type: "success", message: "Message sent successfully. I will reply soon." });
            }

            setContactForm({ name: "", email: "", message: "" });
        } catch (error) {
            setContactStatus({
                type: "error",
                message: error?.message || "Could not send message right now. Please try again.",
            });
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <>
            <section className="home-hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0f] pt-16">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="home-hero-primary-block pointer-events-none absolute left-[8%] top-[17%] h-52 w-72 rounded-[3rem] bg-gradient-to-br from-blue-500/25 to-transparent" />
                <div className="home-hero-secondary-block pointer-events-none absolute bottom-[12%] right-[8%] h-40 w-40 rounded-[3rem] bg-gradient-to-br from-orange-500/25 to-transparent" />

                <motion.div
                    className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="home-hero-shell relative z-10 mx-auto max-w-6xl px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="home-hero-terminal mb-12 inline-block"
                    >
                        <div className="rounded-2xl border border-blue-500/20 bg-[#0d1117]/80 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
                            <div className="mb-6 flex items-center gap-2">
                                <Terminal className="h-5 w-5 text-cyan-400" />
                                <span className="font-mono text-cyan-400" style={{ fontFamily: "Space Grotesk, monospace" }}>
                                    system.terminal
                                </span>
                            </div>
                            <div className="whitespace-pre-wrap text-left font-mono text-green-400" style={{ fontFamily: "Space Grotesk, monospace" }}>
                                {typedText}
                                {currentLine < lines.length ? <span className="animate-pulse">_</span> : null}
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.2 }}
                        className="home-hero-title mb-6"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                        <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            I build systems,
                        </span>
                        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            not just websites.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 2.8 }}
                        className="home-hero-copy mx-auto mb-12 max-w-2xl text-gray-400"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Aspiring Python developer and Flutter intern focused on practical products, clean user interfaces, and data-driven features. I build web and mobile experiences that solve real-world problems.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.2 }}
                        className="home-hero-actions flex flex-wrap justify-center gap-6"
                    >
                        <button
                            type="button"
                            onClick={() => navigate("/projects")}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onNavigate && onNavigate("about")}
                            className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all hover:scale-105 hover:border-purple-500/60 hover:bg-white/10"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                            <span className="relative z-10 flex items-center gap-2 text-purple-300">
                                Enter Portfolio
                                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    </motion.div>

                </div>
            </section>

            <section id="about" className="relative overflow-hidden bg-[#0a0a0f] py-32">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem]" />

                <div className="relative z-10 mx-auto max-w-7xl px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20 text-center"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-purple-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                My Journey
                            </span>
                        </div>
                        <h2
                            className="mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                            About Me
                        </h2>
                        <p className="mx-auto max-w-2xl text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                            Aspiring Python Developer and Flutter intern blending UI/UX thinking with modern development to create useful, people-first digital experiences.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {aboutTimeline.map((item, index) => (
                            <motion.div
                                key={item.phase}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative"
                            >
                                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/40">
                                    <div className={`mb-6 inline-block rounded-lg bg-gradient-to-r px-4 py-2 ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                                        <span className="font-mono" style={{ fontFamily: "Orbitron, sans-serif" }}>{item.phase}</span>
                                    </div>

                                    <h3
                                        className="mb-4 text-white transition-colors duration-300 group-hover:text-purple-300"
                                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="leading-relaxed text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                                        {item.description}
                                    </p>
                                    <div className={`absolute -inset-1 -z-10 bg-gradient-to-r ${item.color} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-20 text-center"
                    >
                        <div className="inline-block rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8">
                            <p className="mb-2 text-gray-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                Currently focused on
                            </p>
                            <p
                                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                            >
                                Flutter, Python, and product-focused project building
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="projects" className="relative bg-[#0a0a0f] py-32">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem]" />

                <div className="relative z-10 mx-auto max-w-7xl px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20 text-center"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
                            <Folder className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm text-cyan-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                Featured Work
                            </span>
                        </div>
                        <h2 className="mb-4 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent" style={{ fontFamily: "Orbitron, sans-serif" }}>
                            Projects
                        </h2>
                        <p className="mx-auto max-w-2xl text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                            A quick look at selected projects across full-stack, mobile, and data-focused work.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <Link to={`/projects/${project.slug}`} className="block h-full">
                                    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10">
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
                                                />
                                            ) : null}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                                        </div>

                                        <div className="p-6">
                                            <h3 className="mb-3 text-white transition-colors group-hover:text-cyan-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                {project.title}
                                            </h3>
                                            <p className="mb-4 text-sm text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                                                {project.shortDesc}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400"
                                                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tech.length > 3 ? (
                                                    <span
                                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500"
                                                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                                    >
                                                        +{project.tech.length - 3}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Link
                            to="/projects"
                            className="group inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-8 py-4 transition-all hover:scale-105 hover:from-cyan-500/20 hover:to-blue-500/20"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                            <span className="text-cyan-400">View All Projects</span>
                            <ArrowRight className="h-5 w-5 text-cyan-400 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <section id="contact" className="relative bg-[#060913] py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.14),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(34,211,238,0.1),transparent_36%)]" />
                <div className="relative z-10 mx-auto max-w-7xl px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 text-center"
                    >
                        <div className="mb-3 inline-flex items-center rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-1.5 text-xs text-fuchsia-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            {">_"} Get In Touch
                        </div>
                        <h2 className="bg-gradient-to-r from-white via-fuchsia-200 to-white bg-clip-text text-transparent" style={{ fontFamily: "Orbitron, sans-serif" }}>
                            Contact
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                            Let&apos;s build something amazing together. Drop me a message and I&apos;ll get back to you.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden rounded-2xl border border-fuchsia-500/35 bg-[#0b0f1a] shadow-[0_0_40px_rgba(217,70,239,0.08)]"
                        >
                            <div className="border-b border-fuchsia-500/20 px-5 py-3 text-sm text-fuchsia-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                {">_"} contact@jignesh.dev
                            </div>
                            <motion.form
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.08 }}
                                onSubmit={handleContactSubmit}
                                className="p-4"
                            >
                                <div className="grid gap-2.5">
                                    <label className="text-xs text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>$ enter name</label>
                                    <input
                                        type="text"
                                        value={contactForm.name}
                                        onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
                                        placeholder="Your name"
                                        disabled={contactLoading}
                                        className="w-full rounded-lg border border-white/15 bg-[#020611] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-fuchsia-400/60"
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    />
                                    <label className="text-xs text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>$ enter email</label>
                                    <input
                                        type="email"
                                        value={contactForm.email}
                                        onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))}
                                        placeholder="Your email"
                                        disabled={contactLoading}
                                        className="w-full rounded-lg border border-white/15 bg-[#020611] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-fuchsia-400/60"
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    />
                                    <label className="text-xs text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>$ enter message</label>
                                    <textarea
                                        rows="3"
                                        value={contactForm.message}
                                        onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))}
                                        placeholder="Write your message"
                                        disabled={contactLoading}
                                        className="w-full resize-none rounded-lg border border-white/15 bg-[#020611] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-fuchsia-400/60"
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={contactLoading}
                                    className="mt-3 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 px-5 py-3 font-medium text-white transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                >
                                    {contactLoading ? "executing..." : "execute send"}
                                </button>

                                {contactStatus.message ? (
                                    <p
                                        className={`mt-3 rounded-lg border px-3 py-2 text-sm ${contactStatus.type === "success"
                                            ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                                            : "border-rose-400/50 bg-rose-400/10 text-rose-200"
                                            }`}
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    >
                                        {contactStatus.message}
                                    </p>
                                ) : null}
                                <p className="mt-3 border-t border-white/10 pt-2 text-[10px] text-emerald-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                    Status: Ready to receive messages
                                </p>
                            </motion.form>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.08 }}
                            className="space-y-4"
                        >
                            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-sm text-fuchsia-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Location</p>
                                <p className="mt-2 flex items-center gap-2 text-sm text-gray-300" style={{ fontFamily: "Inter, sans-serif" }}>
                                    <MapPin className="h-4 w-4 text-cyan-300" />
                                    {ABOUT_COPY.location}
                                </p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-sm text-fuchsia-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Response Time</p>
                                <p className="mt-2 flex items-center gap-2 text-sm text-gray-300" style={{ fontFamily: "Inter, sans-serif" }}>
                                    <Timer className="h-4 w-4 text-cyan-300" />
                                    Usually within 24 hours
                                </p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                                <p className="text-sm text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Current Status</p>
                                <p className="mt-2 text-sm text-gray-300" style={{ fontFamily: "Inter, sans-serif" }}>- Open to new opportunities</p>
                            </div>

                            <div className="pt-1">
                                <p className="mb-3 text-sm text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Connect with me</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {connectLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 transition hover:border-fuchsia-400/40 hover:text-white"
                                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                                            >
                                                <Icon className="h-4 w-4 text-gray-400" />
                                                {link.label}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
