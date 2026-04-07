import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Award,
    BrainCircuit,
    Briefcase,
    Code2,
    Database,
    FolderKanban,
    Layers3,
    LayoutGrid,
    Search,
    Sparkles,
    Terminal,
    Wrench,
} from "lucide-react";
import { EXPERIENCE } from "../data/profile";
import { PROJECTS } from "../data/projects";

const experienceItems = EXPERIENCE.slice(0, 2);

const skillItems = [
    {
        name: "Python",
        category: "Languages",
        icon: Terminal,
        description: "Used for data analysis, automation, and ML workflows.",
        projects: ["Flipkart Mobile Sales Data Visualization & Price Prediction"],
        aliases: ["python"],
        strength: 4,
        featured: true,
        color: "from-cyan-500 to-blue-500",
    },
    {
        name: "JavaScript",
        category: "Languages",
        icon: Code2,
        description: "Primary language for interactive web experiences.",
        projects: ["Vintage Rides Hub - Car Rental & Sales Platform", "BizNest - Business Enablement Platform"],
        aliases: ["javascript", "js"],
        strength: 4,
        featured: true,
        color: "from-blue-500 to-cyan-500",
    },
    {
        name: "Dart",
        category: "Languages",
        icon: Code2,
        description: "Mobile app language used for Flutter applications.",
        projects: ["Expense Tracker - Personal Finance Management App", "Flutter Quiz Master - Interactive Learning App"],
        aliases: ["dart"],
        strength: 3,
        featured: true,
        color: "from-blue-500 to-purple-500",
    },
    {
        name: "SQL",
        category: "Languages",
        icon: Database,
        description: "Structured data handling for app and analytics projects.",
        projects: ["BizNest - Business Enablement Platform", "BizNest - Mobile Business App"],
        aliases: ["sql", "mongodb", "mysql"],
        strength: 3,
        featured: false,
        color: "from-fuchsia-500 to-pink-500",
    },
    {
        name: "React",
        category: "Frontend",
        icon: Layers3,
        description: "Component-driven interface development for the web.",
        projects: ["Vintage Rides Hub - Car Rental & Sales Platform", "BizNest - Business Enablement Platform"],
        aliases: ["react"],
        strength: 4,
        featured: true,
        color: "from-cyan-500 to-blue-500",
    },
    {
        name: "Flutter",
        category: "Frontend",
        icon: Layers3,
        description: "Cross-platform UI development with a strong visual system.",
        projects: ["Expense Tracker - Personal Finance Management App", "Flutter Quiz Master - Interactive Learning App"],
        aliases: ["flutter"],
        strength: 4,
        featured: true,
        color: "from-purple-500 to-pink-500",
    },
    {
        name: "HTML5",
        category: "Frontend",
        icon: Layers3,
        description: "Semantic structure and accessible page foundations.",
        projects: ["FlightAware - Travel Booking Web Platform", "StayMajestic - Hotel Booking Website"],
        aliases: ["html5", "html"],
        strength: 3,
        featured: false,
        color: "from-cyan-500 to-blue-500",
    },
    {
        name: "CSS3",
        category: "Frontend",
        icon: Layers3,
        description: "Responsive layout, spacing, and visual polish.",
        projects: ["FlightAware - Travel Booking Web Platform", "foodieExpress - Food Delivery Mobile App"],
        aliases: ["css3", "css"],
        strength: 3,
        featured: false,
        color: "from-blue-500 to-purple-500",
    },
    {
        name: "Node.js",
        category: "Backend",
        icon: Code2,
        description: "Server-side logic and API orchestration.",
        projects: ["BizNest - Business Enablement Platform", "BizNest - Mobile Business App"],
        aliases: ["node.js", "node"],
        strength: 4,
        featured: true,
        color: "from-emerald-500 to-cyan-500",
    },
    {
        name: "Express",
        category: "Backend",
        icon: Code2,
        description: "Lightweight routing and API structure.",
        projects: ["BizNest - Business Enablement Platform"],
        aliases: ["express"],
        strength: 3,
        featured: false,
        color: "from-emerald-500 to-blue-500",
    },
    {
        name: "Flask",
        category: "Backend",
        icon: Code2,
        description: "Python-based backend for data and ML integrations.",
        projects: ["Vintage Rides Hub - Car Rental & Sales Platform"],
        aliases: ["flask"],
        strength: 3,
        featured: false,
        color: "from-emerald-500 to-fuchsia-500",
    },
    {
        name: "REST APIs",
        category: "Backend",
        icon: Code2,
        description: "Connecting app surfaces to structured backend services.",
        projects: ["BizNest - Business Enablement Platform", "Vintage Rides Hub - Car Rental & Sales Platform"],
        aliases: ["rest", "api", "apis", "rest api", "rest apis"],
        strength: 4,
        featured: false,
        color: "from-fuchsia-500 to-purple-500",
    },
    {
        name: "MongoDB",
        category: "Database",
        icon: Database,
        description: "Flexible document storage for business and app data.",
        projects: ["BizNest - Business Enablement Platform", "BizNest - Mobile Business App"],
        aliases: ["mongodb"],
        strength: 4,
        featured: true,
        color: "from-green-500 to-emerald-500",
    },
    {
        name: "MySQL",
        category: "Database",
        icon: Database,
        description: "Relational data modeling and structured persistence.",
        projects: ["Vintage Rides Hub - Car Rental & Sales Platform"],
        aliases: ["mysql"],
        strength: 3,
        featured: false,
        color: "from-green-500 to-cyan-500",
    },
    {
        name: "Pandas",
        category: "AI/ML",
        icon: BrainCircuit,
        description: "Data wrangling and analysis for practical insights.",
        projects: ["Flipkart Mobile Sales Data Visualization & Price Prediction"],
        aliases: ["pandas"],
        strength: 4,
        featured: true,
        color: "from-fuchsia-500 to-pink-500",
    },
    {
        name: "Scikit-learn",
        category: "AI/ML",
        icon: BrainCircuit,
        description: "Machine learning models for prediction and evaluation.",
        projects: ["Flipkart Mobile Sales Data Visualization & Price Prediction", "Vintage Rides Hub - Car Rental & Sales Platform"],
        aliases: ["scikit-learn", "scikit learn", "sklearn"],
        strength: 4,
        featured: true,
        color: "from-fuchsia-500 to-purple-500",
    },
    {
        name: "Matplotlib",
        category: "AI/ML",
        icon: BrainCircuit,
        description: "Static visual analytics and charting for data stories.",
        projects: ["Flipkart Mobile Sales Data Visualization & Price Prediction"],
        aliases: ["matplotlib"],
        strength: 3,
        featured: false,
        color: "from-fuchsia-500 to-cyan-500",
    },
    {
        name: "Figma",
        category: "Tools",
        icon: Wrench,
        description: "Wireframing, prototyping, and UI design workflows.",
        projects: ["FlightAware - Travel Booking Web Platform", "foodieExpress - Food Delivery Mobile App"],
        aliases: ["figma"],
        strength: 5,
        featured: true,
        color: "from-cyan-500 to-violet-500",
    },
    {
        name: "Git",
        category: "Tools",
        icon: Wrench,
        description: "Version control and collaborative development workflow.",
        projects: ["Vintage Rides Hub - Car Rental & Sales Platform", "BizNest - Business Enablement Platform"],
        aliases: ["git"],
        strength: 4,
        featured: true,
        color: "from-orange-500 to-amber-500",
    },
    {
        name: "Postman",
        category: "Tools",
        icon: Wrench,
        description: "API testing and request validation.",
        projects: ["BizNest - Business Enablement Platform"],
        aliases: ["postman"],
        strength: 3,
        featured: false,
        color: "from-orange-500 to-fuchsia-500",
    },
    {
        name: "VS Code",
        category: "Tools",
        icon: Wrench,
        description: "Primary development environment and rapid iteration space.",
        projects: ["All active development work"],
        aliases: ["vscode", "vs code", "visual studio code"],
        strength: 4,
        featured: false,
        color: "from-cyan-500 to-blue-500",
    },
];

const filterTabs = ["All", "Languages", "Frontend", "Backend", "Database", "AI/ML", "Tools"];
const coreSkillNames = ["Figma", "Flutter", "React", "Python", "JavaScript"];

function getMatchedProjects(skill) {
    return PROJECTS.filter((project) =>
        project.tech.some((tech) => skill.aliases.some((alias) => tech.toLowerCase().includes(alias))) ||
        skill.projects.some((projectTitle) => project.title === projectTitle)
    );
}

function Experience() {
    const [selectedTab, setSelectedTab] = useState("All");
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [search, setSearch] = useState("");

    const filteredSkills = useMemo(() => {
        return skillItems
            .filter((skill) => selectedTab === "All" || skill.category === selectedTab)
            .filter((skill) => skill.name.toLowerCase().includes(search.toLowerCase()) || skill.category.toLowerCase().includes(search.toLowerCase()));
    }, [search, selectedTab]);

    const coreSkills = useMemo(
        () => skillItems.filter((skill) => coreSkillNames.includes(skill.name)),
        []
    );

    const modalProjects = selectedSkill ? getMatchedProjects(selectedSkill) : [];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && selectedSkill) {
                setSelectedSkill(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedSkill]);

    return (
        <>
            <section id="skills" className="relative overflow-hidden bg-[#0a0a0f] py-32">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%)]" />

                <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-14 text-center"
                    >
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
                            <Sparkles className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                Skills & Technologies
                            </span>
                        </div>
                        <h2 className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent" style={{ fontFamily: "Orbitron, sans-serif" }}>
                            Skills & Technologies
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                            A compact, structured view of the tools, languages, and systems I use to design and build products.
                        </p>
                    </motion.div>

                    <div className="mb-10">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                    Core Skills
                                </p>
                                <p className="mt-1 text-sm text-gray-500">Top focus areas for current work</p>
                            </div>
                            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 md:flex">
                                <LayoutGrid className="h-4 w-4 text-cyan-300" />
                                Interactive skill cards
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                            {coreSkills.map((skill, index) => {
                                const Icon = skill.icon;
                                const matchedProjects = getMatchedProjects(skill);
                                return (
                                    <motion.button
                                        key={skill.name}
                                        type="button"
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.35, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setSelectedSkill(skill)}
                                        title={`Used in ${matchedProjects.length} projects`}
                                        className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.14)]"
                                    >
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-15`} />
                                        <div className="relative z-10 flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${skill.color} p-2 text-white transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0`}>
                                                    <Icon className="h-5 w-5 opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                        {skill.name}
                                                    </h3>
                                                    <p className="text-[11px] text-gray-500">{skill.category}</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="mt-1 h-4 w-4 text-gray-500 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                                        </div>

                                        <div className="relative z-10 mt-4 flex items-center gap-1.5">
                                            {Array.from({ length: 4 }).map((_, dotIndex) => (
                                                <span
                                                    key={`${skill.name}-dot-${dotIndex}`}
                                                    className={`h-1.5 w-1.5 rounded-full ${dotIndex < skill.strength ? "bg-cyan-300" : "bg-white/15"}`}
                                                />
                                            ))}
                                        </div>

                                        <p className="relative z-10 mt-3 text-xs leading-5 text-gray-400">{skill.description}</p>
                                        <p className="relative z-10 mt-3 text-[11px] text-gray-500">Used in {matchedProjects.length} projects</p>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-8 flex flex-wrap items-center gap-3">
                        {filterTabs.map((tab) => (
                            <motion.button
                                key={tab}
                                type="button"
                                onClick={() => setSelectedTab(tab)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`rounded-full border px-4 py-2 text-sm transition-all ${selectedTab === tab
                                    ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                                    : "border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/25 hover:text-white"
                                    }`}
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                {tab}
                            </motion.button>
                        ))}

                        <div className="ml-auto hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 lg:flex">
                            <Search className="h-4 w-4 text-cyan-300" />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search skills"
                                className="w-44 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${selectedTab}-${search}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.28 }}
                            className="space-y-8"
                        >
                            {[
                                "Languages",
                                "Frontend",
                                "Backend",
                                "Database",
                                "AI/ML",
                                "Tools",
                            ].map((category) => {
                                const categorySkills = filteredSkills.filter((skill) => skill.category === category);
                                if (categorySkills.length === 0) return null;

                                return (
                                    <section key={category} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
                                        <div className="mb-5 flex items-center justify-between gap-3">
                                            <div>
                                                <h3 className="text-xl text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                    {category}
                                                </h3>
                                                <p className="text-sm text-gray-500">A focused group of tools and capabilities</p>
                                            </div>
                                            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-gray-400">
                                                {categorySkills.length} skills
                                            </span>
                                        </div>

                                        <div className={`grid gap-4 ${category === "Frontend" || category === "Tools" ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3"}`}>
                                            {categorySkills.map((skill, index) => {
                                                const Icon = skill.icon;
                                                const matchedProjects = getMatchedProjects(skill);
                                                return (
                                                    <motion.button
                                                        key={skill.name}
                                                        type="button"
                                                        initial={{ opacity: 0, y: 18 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, amount: 0.2 }}
                                                        transition={{ duration: 0.35, delay: index * 0.04 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        onClick={() => setSelectedSkill(skill)}
                                                        title={`Used in ${matchedProjects.length} projects`}
                                                        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1624]/85 p-4 text-left transition-all hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.14)] ${skill.featured ? "md:col-span-2" : ""}`}
                                                    >
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-15`} />
                                                        <div className="relative z-10 flex items-start gap-3">
                                                            <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${skill.color} p-2 text-white`}>
                                                                <Icon className="h-5 w-5 opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <div>
                                                                        <h4 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                                            {skill.name}
                                                                        </h4>
                                                                        <p className="text-[11px] text-gray-500">{skill.description}</p>
                                                                    </div>
                                                                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                                                                        {matchedProjects.length}
                                                                    </span>
                                                                </div>

                                                                <div className="mt-4 flex items-center gap-1.5">
                                                                    {Array.from({ length: 4 }).map((_, dotIndex) => (
                                                                        <span
                                                                            key={`${skill.name}-dots-${dotIndex}`}
                                                                            className={`h-1.5 w-1.5 rounded-full ${dotIndex < skill.strength ? "bg-cyan-300" : "bg-white/15"}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </section>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <section id="experience" className="relative overflow-hidden bg-[#0a0a0f] py-32">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1),transparent_25%)]" />

                <div className="relative z-10 mx-auto mb-12 max-w-7xl px-5 sm:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2">
                            <Briefcase className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-purple-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                Career Path
                            </span>
                        </div>
                        <h2 className="mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent" style={{ fontFamily: "Orbitron, sans-serif" }}>
                            Experience
                        </h2>
                        <p className="mx-auto max-w-2xl text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                            Two recent roles shaping my current path in Flutter development and UI/UX design.
                        </p>
                    </motion.div>
                </div>

                <div className="relative mx-auto max-w-7xl px-5 pb-10 sm:px-8">
                    <div className="absolute bottom-0 left-1/2 top-0 z-0 hidden w-[3px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 md:block" />

                    <div className="relative z-10 space-y-8 md:space-y-12">
                        {experienceItems.map((exp, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={`${exp.company}-${exp.position}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.55, delay: index * 0.08 }}
                                    className="relative"
                                >
                                    <div className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
                                        <div className="group relative w-full max-w-xl md:w-[48%]">
                                            <div
                                                className={`absolute top-8 hidden h-[2px] w-10 bg-gradient-to-r ${exp.color} md:block ${isLeft ? "-right-10" : "-left-10"}`}
                                            />

                                            <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40">
                                                <div
                                                    className={`absolute top-8 hidden h-5 w-5 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-r ${exp.color} md:block ${isLeft ? "-right-[2.95rem]" : "-left-[2.95rem]"}`}
                                                >
                                                    <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/35" />
                                                </div>

                                                <div className="mb-6">
                                                    <h3 className="mb-2 text-white transition-colors duration-300 group-hover:text-purple-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                        {exp.company}
                                                    </h3>
                                                    <div className="mb-3 flex items-center gap-2">
                                                        <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-sm ${exp.color} transition-transform duration-300 group-hover:scale-105`} style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                            {exp.position}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                        <ArrowRight className="h-4 w-4 rotate-45" />
                                                        <span style={{ fontFamily: "Inter, sans-serif" }}>{exp.timeline}</span>
                                                    </div>
                                                </div>

                                                <p className="mb-6 text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{exp.responsibilities[0]}</p>

                                                <div>
                                                    <h4 className="mb-3 text-sm text-purple-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                        Key Responsibilities
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {exp.responsibilities.map((responsibility) => (
                                                            <li key={responsibility} className="flex items-start gap-3 text-sm text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                                                                <span className="mt-1 text-purple-400">▸</span>
                                                                {responsibility}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className={`absolute -inset-1 -z-10 bg-gradient-to-r ${exp.color} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20`} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </section>

            <AnimatePresence>
                {selectedSkill ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        />

                        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                                className="mx-auto my-2 flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-cyan-500/25 bg-[#0d1117] shadow-2xl shadow-cyan-500/20 sm:my-6 max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-3rem)]"
                            >
                                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0d1117]/95 p-4 backdrop-blur-sm sm:p-6">
                                    <div className="pr-2">
                                        <p className="text-xs uppercase tracking-[0.16em] text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                            Skill details
                                        </p>
                                        <h3 className="mt-2 text-2xl text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                            {selectedSkill.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-400">{selectedSkill.description}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSkill(null)}
                                        className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition hover:border-cyan-400/30 hover:text-white"
                                    >
                                        Close
                                    </button>
                                </div>

                                <div className="overflow-y-auto p-4 sm:p-6">
                                    <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                            <p className="text-sm text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                Projects using this skill
                                            </p>
                                            <div className="mt-4 space-y-3">
                                                {modalProjects.length > 0 ? (
                                                    modalProjects.map((project) => (
                                                        <div key={project.slug} className="rounded-xl border border-white/10 bg-[#0f1624] p-4">
                                                            <p className="font-medium text-white">{project.title}</p>
                                                            <p className="mt-1 text-sm text-gray-400">{project.shortDesc}</p>
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                <a
                                                                    href={`/projects/${project.slug}`}
                                                                    className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"
                                                                >
                                                                    View project
                                                                </a>
                                                                {project.liveUrl ? (
                                                                    <a
                                                                        href={project.liveUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                                                                    >
                                                                        Live demo
                                                                    </a>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-gray-400">No matching projects found yet.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                            <p className="text-sm text-fuchsia-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                                GitHub and usage
                                            </p>
                                            <p className="mt-3 text-sm leading-6 text-gray-400">
                                                Use this skill in {getMatchedProjects(selectedSkill).length} projects, and keep the work connected to your GitHub profile for future repository links.
                                            </p>
                                            <a
                                                href="https://github.com/Jignesh5049"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-500/15"
                                            >
                                                <FolderKanban className="h-4 w-4" />
                                                GitHub profile
                                            </a>
                                            <div className="mt-5 rounded-xl border border-white/10 bg-[#0f1624] p-4 text-sm text-gray-400">
                                                <p className="mb-2 text-gray-200">Strength indicator</p>
                                                <div className="flex gap-1.5">
                                                    {Array.from({ length: 4 }).map((_, index) => (
                                                        <span
                                                            key={`${selectedSkill.name}-modal-dot-${index}`}
                                                            className={`h-2.5 w-2.5 rounded-full ${index < selectedSkill.strength ? "bg-cyan-300" : "bg-white/15"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                ) : null}
            </AnimatePresence>
        </>
    );
}

export default Experience;
