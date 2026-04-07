import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import { PROJECT_CATEGORIES, PROJECT_IMAGES, PROJECTS } from "../data/projects";

function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = useMemo(() => {
        const base = activeCategory === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === activeCategory);
        return base.map((project) => ({
            ...project,
            image: project.imagesKey ? PROJECT_IMAGES[project.imagesKey]?.[0] : null,
        }));
    }, [activeCategory]);

    return (
        <section id="projects" className="relative bg-[#0a0a0f] py-32">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem]" />

            <div className="relative z-10 mx-auto max-w-7xl px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
                        <Folder className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            All Projects
                        </span>
                    </div>
                    <h2 className="mb-4 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent" style={{ fontFamily: "Orbitron, sans-serif" }}>
                        Projects
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                        A collection of real projects spanning UI/UX, mobile apps, web development, and analytics.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        {PROJECT_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full border px-6 py-2 transition-all ${activeCategory === category
                                    ? "border-blue-400 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                                    : "border-white/10 bg-white/5 text-gray-400 hover:border-blue-400/50 hover:text-blue-400"
                                    }`}
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, index) => (
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

                {filteredProjects.length === 0 ? (
                    <p className="mt-8 text-center text-sm text-gray-500" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        No projects found in this category.
                    </p>
                ) : null}
            </div>

        </section>
    );
}

export default Projects;
