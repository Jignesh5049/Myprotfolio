import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Code2,
    Database,
    ExternalLink,
    FolderGit2,
    Layers3,
    Rocket,
    Server,
    Wrench,
    X,
} from "lucide-react";
import { getProjectBySlug, PROJECT_IMAGES, PROJECTS } from "../data/projects";
import AnimatedButton from "../components/ui/AnimatedButton";
import GlassCard from "../components/ui/GlassCard";

const SECTION_LINKS = [
    { id: "overview", label: "Overview" },
    { id: "gallery", label: "Gallery" },
    { id: "tech", label: "Tech" },
    { id: "highlights", label: "Impact" },
    { id: "learnings", label: "Learnings" },
];

const GROUP_ICONS = {
    Frontend: Layers3,
    Backend: Server,
    Database,
    Tools: Wrench,
};

const GROUP_KEYWORDS = {
    Frontend: ["react", "next", "vue", "svelte", "html", "css", "tailwind", "flutter", "dart", "figma", "ui", "react native"],
    Backend: ["node", "express", "flask", "django", "api", "jwt", "auth"],
    Database: ["mongo", "mysql", "postgres", "sqlite", "redis", "supabase", "firebase"],
    Tools: ["python", "jupyter", "git", "ml", "analytics", "chart", "prototyping", "web", "mobile"],
};

function splitTechByGroup(techList) {
    const groups = {
        Frontend: [],
        Backend: [],
        Database: [],
        Tools: [],
    };

    techList.forEach((item) => {
        const normalized = item.toLowerCase();
        const match = Object.entries(GROUP_KEYWORDS).find(([, keywords]) => keywords.some((keyword) => normalized.includes(keyword)));

        if (match) {
            groups[match[0]].push(item);
            return;
        }

        groups.Tools.push(item);
    });

    return Object.entries(groups).filter(([, items]) => items.length > 0);
}

function buildStory(project) {
    const firstHighlight = project.highlights?.[0] || "Built a clear user-centered workflow with strong execution.";
    const problem = project.problem || `Teams needed a better way to handle ${project.category.toLowerCase()} goals without friction, confusion, or disconnected experiences.`;
    const solution = project.solution || `I designed and built a focused solution using ${project.tech.slice(0, 3).join(", ")} that improved clarity, speed, and consistency across core user flows.`;
    const keyFeatures = project.features || project.highlights.slice(0, 4);

    return {
        problem,
        solution: solution.includes(firstHighlight) ? solution : `${solution} ${firstHighlight}`,
        keyFeatures,
    };
}

function buildLearnings(project) {
    const challenges = project.challenges || [
        "Balancing feature depth with simple and intuitive UX.",
        "Keeping performance stable while scaling the interface and data handling.",
        "Maintaining consistency across multiple user journeys and edge cases.",
    ];

    const learnings = project.learnings || [
        `A clear component system in ${project.tech[0]} drastically reduces iteration time.`,
        "Early user-flow mapping prevents rework in later implementation phases.",
        "Small UX feedback loops improve confidence and completion rates.",
    ];

    return { challenges, learnings };
}

function ProjectDetails() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("overview");
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const galleryImages = useMemo(() => (project?.imagesKey ? PROJECT_IMAGES[project.imagesKey] || [] : []), [project]);
    const heroImage = galleryImages[0] || null;
    const isMobileScreenshotProject = Boolean(project?.hasMobileScreenshots || project?.category === "Mobile Apps");

    const techGroups = useMemo(() => splitTechByGroup(project?.tech || []), [project]);
    const story = useMemo(() => (project ? buildStory(project) : null), [project]);
    const insights = useMemo(() => (project ? buildLearnings(project) : null), [project]);

    const projectIndex = useMemo(() => PROJECTS.findIndex((item) => item.slug === slug), [slug]);
    const nextProject = useMemo(() => {
        if (projectIndex < 0) return null;
        return PROJECTS[(projectIndex + 1) % PROJECTS.length];
    }, [projectIndex]);
    const nextProjectHasMobileScreenshots = Boolean(nextProject?.hasMobileScreenshots || nextProject?.category === "Mobile Apps");

    useEffect(() => {
        const handleScroll = () => {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible[0]?.target?.id) {
                    setActiveSection(visible[0].target.id);
                }
            },
            { threshold: [0.35, 0.6, 0.8] }
        );

        SECTION_LINKS.forEach(({ id }) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [project]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && lightboxIndex >= 0) {
                setLightboxIndex(-1);
                return;
            }

            if (lightboxIndex < 0) return;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, galleryImages.length]);

    if (!project) {
        return (
            <section className="space-y-4 py-10">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Project</p>
                <h2 className="font-display text-3xl font-bold text-white">Project not found</h2>
                <p className="text-gray-300">Please choose another project from the list.</p>
                <AnimatedButton to="/projects" variant="ghost">
                    Back to Projects
                </AnimatedButton>
            </section>
        );
    }

    const repoUrl = project.githubUrl || project.repoUrl || "https://github.com/Jignesh5049";

    return (
        <>
            <div className="fixed left-0 right-0 top-0 z-[70] h-[2px] bg-white/5">
                <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    animate={{ width: `${scrollProgress}%` }}
                    transition={{ ease: "linear", duration: 0.08 }}
                />
            </div>

            <section className="relative pb-14 pt-24 sm:pt-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.1),transparent_25%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_32%)]" />

                <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1fr_220px]">
                    <div className="space-y-8">
                        <motion.section
                            id="overview"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.55 }}
                            className="scroll-mt-28 space-y-5"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <AnimatedButton to="/projects" variant="ghost">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Projects
                                </AnimatedButton>
                                <span className="rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                                    {project.category}
                                </span>
                            </div>

                            <GlassCard className="overflow-hidden p-0">
                                <div className="relative min-h-[440px]">
                                    {heroImage ? (
                                        <img
                                            src={heroImage}
                                            alt={`${project.title} hero`}
                                            className={`absolute inset-0 h-full w-full opacity-50 ${isMobileScreenshotProject ? "object-contain p-6 sm:p-8" : "object-cover"}`}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.28),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.3),transparent_36%),linear-gradient(135deg,#0a0e18,#0d1221)]" />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-b from-[#060910]/70 via-[#060910]/60 to-[#060910]/88" />

                                    <div className="relative z-10 flex h-full min-h-[440px] flex-col justify-end p-6 sm:p-10">
                                        <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                            {project.title}
                                        </h1>
                                        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg">
                                            {project.shortDesc}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-7 flex flex-wrap gap-3">
                                            {project.liveUrl ? (
                                                <AnimatedButton href={project.liveUrl} target="_blank" rel="noreferrer">
                                                    Live Demo
                                                    <ExternalLink className="h-4 w-4" />
                                                </AnimatedButton>
                                            ) : null}

                                            <AnimatedButton href={repoUrl} target="_blank" rel="noreferrer" variant="ghost">
                                                GitHub Repo
                                                <FolderGit2 className="h-4 w-4" />
                                            </AnimatedButton>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.section>

                        <motion.section
                            id="gallery"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="scroll-mt-28 space-y-4"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <h2 className="font-display text-2xl text-white">Project Preview</h2>
                                    <p className="text-sm text-gray-400">Click any screenshot to view fullscreen</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => heroImage && setLightboxIndex(0)}
                                    className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                                >
                                    {heroImage ? (
                                        <img
                                            src={heroImage}
                                            alt={`${project.title} featured preview`}
                                            loading="lazy"
                                            className={`h-[300px] w-full transition-transform duration-500 group-hover:scale-[1.03] sm:h-[420px] ${isMobileScreenshotProject ? "object-contain bg-[#060910] p-3 sm:p-5" : "object-cover"}`}
                                        />
                                    ) : (
                                        <div className="h-[300px] w-full bg-[radial-gradient(circle_at_20%_20%,rgba(58,228,255,0.35),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(177,76,255,0.35),transparent_45%),linear-gradient(145deg,#0b1225,#111d3d)] sm:h-[420px]" />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent opacity-80" />
                                </button>

                                {galleryImages.length > 0 ? (
                                    <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
                                        {galleryImages.map((src, index) => (
                                            <button
                                                key={`${project.slug}-preview-${index}`}
                                                type="button"
                                                onClick={() => setLightboxIndex(index)}
                                                className={`group relative h-24 snap-start overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:h-28 ${isMobileScreenshotProject ? "min-w-[120px] sm:min-w-[140px]" : "min-w-[140px] sm:min-w-[180px]"}`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${project.title} screen ${index + 1}`}
                                                    loading="lazy"
                                                    className={`h-full w-full transition-transform duration-300 group-hover:scale-110 ${isMobileScreenshotProject ? "object-contain bg-[#060910] p-1" : "object-cover"}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                            </GlassCard>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="grid gap-5 lg:grid-cols-2"
                        >
                            <GlassCard className="p-6">
                                <h3 className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">Problem</h3>
                                <p className="mt-3 text-sm leading-7 text-gray-300">{story.problem}</p>
                            </GlassCard>

                            <GlassCard className="p-6">
                                <h3 className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">Solution</h3>
                                <p className="mt-3 text-sm leading-7 text-gray-300">{story.solution}</p>
                            </GlassCard>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            <GlassCard className="p-6">
                                <h3 className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">Key Features</h3>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {story.keyFeatures.map((feature) => (
                                        <div key={feature} className="rounded-xl border border-white/10 bg-white/5 p-4">
                                            <p className="flex items-start gap-2 text-sm leading-6 text-gray-300">
                                                <Rocket className="mt-1 h-4 w-4 flex-shrink-0 text-cyan-300" />
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.section>

                        <motion.section
                            id="tech"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="scroll-mt-28"
                        >
                            <GlassCard className="p-6 sm:p-7">
                                <h2 className="font-display text-2xl text-white">Tech Stack</h2>
                                <p className="mt-2 text-sm text-gray-400">Grouped by architecture role for quick recruiter scan.</p>

                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    {techGroups.map(([group, items]) => {
                                        const Icon = GROUP_ICONS[group] || Code2;
                                        return (
                                            <div key={group} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <div className="mb-3 flex items-center gap-2 text-cyan-100">
                                                    <Icon className="h-4 w-4" />
                                                    <span className="text-sm uppercase tracking-[0.14em]">{group}</span>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {items.map((item) => (
                                                        <span
                                                            key={`${group}-${item}`}
                                                            className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </GlassCard>
                        </motion.section>

                        <motion.section
                            id="highlights"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="scroll-mt-28"
                        >
                            <GlassCard className="p-6 sm:p-7">
                                <h2 className="font-display text-2xl text-white">Highlights & Achievements</h2>
                                <div className="mt-5 space-y-3">
                                    {project.highlights.map((point) => (
                                        <div key={point} className="rounded-xl border border-white/10 bg-white/5 p-4">
                                            <p className="flex items-start gap-2 text-sm leading-6 text-gray-300">
                                                <span className="mt-0.5 text-cyan-300">✓</span>
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.section>

                        <motion.section
                            id="learnings"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="scroll-mt-28 grid gap-5 lg:grid-cols-2"
                        >
                            <GlassCard className="p-6">
                                <h3 className="text-sm uppercase tracking-[0.15em] text-fuchsia-200">Challenges</h3>
                                <ul className="mt-4 space-y-3">
                                    {insights.challenges.map((item) => (
                                        <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-gray-300">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>

                            <GlassCard className="p-6">
                                <h3 className="text-sm uppercase tracking-[0.15em] text-cyan-200">Learnings</h3>
                                <ul className="mt-4 space-y-3">
                                    {insights.learnings.map((item) => (
                                        <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-gray-300">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </motion.section>

                        {nextProject ? (
                            <motion.section
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                <GlassCard className="p-0 overflow-hidden">
                                    <div className={`grid gap-0 ${nextProjectHasMobileScreenshots ? "md:grid-cols-1" : "md:grid-cols-[1.1fr_0.9fr]"}`}>
                                        <div className="p-6 sm:p-8">
                                            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">Next Project</p>
                                            <h3 className="mt-3 font-display text-2xl text-white">{nextProject.title}</h3>
                                            <p className="mt-3 text-sm leading-7 text-gray-300">{nextProject.shortDesc}</p>
                                            <Link
                                                to={`/projects/${nextProject.slug}`}
                                                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/45"
                                            >
                                                View next project
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>

                                        {!nextProjectHasMobileScreenshots ? (
                                            <div className="min-h-[220px] border-t border-white/10 bg-black/35 md:border-l md:border-t-0">
                                                {nextProject.imagesKey && PROJECT_IMAGES[nextProject.imagesKey]?.[0] ? (
                                                    <img
                                                        src={PROJECT_IMAGES[nextProject.imagesKey][0]}
                                                        alt={`${nextProject.title} preview`}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(58,228,255,0.35),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(177,76,255,0.35),transparent_45%),linear-gradient(145deg,#0b1225,#111d3d)]" />
                                                )}
                                            </div>
                                        ) : null}
                                    </div>
                                </GlassCard>
                            </motion.section>
                        ) : null}
                    </div>

                    <aside className="hidden xl:block">
                        <div className="sticky top-28">
                            <GlassCard className="p-4">
                                <p className="mb-3 text-xs uppercase tracking-[0.14em] text-gray-500">On this page</p>
                                <nav className="space-y-1.5">
                                    {SECTION_LINKS.map((item) => {
                                        const isActive = activeSection === item.id;
                                        return (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    const element = document.getElementById(item.id);
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                                                    }
                                                }}
                                                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${isActive
                                                    ? "border border-cyan-300/30 bg-cyan-500/10 text-cyan-100"
                                                    : "border border-transparent text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-gray-200"
                                                    }`}
                                            >
                                                <span>{item.label}</span>
                                                {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> : null}
                                            </a>
                                        );
                                    })}
                                </nav>
                            </GlassCard>
                        </div>
                    </aside>
                </div>
            </section>

            <AnimatePresence>
                {lightboxIndex >= 0 && galleryImages[lightboxIndex] ? (
                    <motion.div
                        className="fixed inset-0 z-[80] bg-black/92 p-4 backdrop-blur-sm sm:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <p className="text-sm text-gray-300">
                                    {lightboxIndex + 1} / {galleryImages.length}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setLightboxIndex(-1)}
                                    className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:border-cyan-300/30 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                                <img
                                    src={galleryImages[lightboxIndex]}
                                    alt={`${project.title} fullscreen ${lightboxIndex + 1}`}
                                    className="h-full w-full object-contain"
                                />

                                {galleryImages.length > 1 ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#0d1117]/85 p-2 text-gray-200 transition hover:border-cyan-300/40"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#0d1117]/85 p-2 text-gray-200 transition hover:border-cyan-300/40"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
}

export default ProjectDetails;
