import React from "react";
import { Link } from "react-router-dom";
import GlassCard from "./GlassCard";

function ProjectCard({ project, image }) {
    const hasLive = Boolean(project.liveUrl);
    const hasGithub = Boolean(project.githubUrl);

    return (
        <div className="transition-all duration-300 hover:-translate-y-1">
            <GlassCard className="group h-full p-0 hover:border-cyan-300/35 hover:shadow-cyan-500/20">
                <div className="p-4 sm:p-5">
                    <Link to={`/projects/${project.slug}`} className="block">
                        <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">{project.category}</p>
                        <h3 className="mt-2 font-display text-lg font-semibold text-white">{project.title}</h3>

                        <div className="relative mb-4 mt-3 h-44 overflow-hidden rounded-lg border border-cyan-300/20 bg-black/40">
                            {image ? (
                                <img
                                    src={image}
                                    alt={`${project.title} preview`}
                                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,156,0.2),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(99,179,255,0.2),transparent_45%),linear-gradient(145deg,#050708,#0a1118)]" />
                            )}
                        </div>

                        <p className="text-sm text-gray-300">{project.shortDesc}</p>
                    </Link>

                    <p className="mt-2 text-sm text-gray-300">{project.tech.slice(0, 4).join(" | ")}</p>
                    <p className="mt-1 text-xs text-gray-500">
                        {project.timeline}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <a
                            href={project.liveUrl || "#"}
                            target={hasLive ? "_blank" : undefined}
                            rel={hasLive ? "noreferrer" : undefined}
                            aria-disabled={!hasLive}
                            className={`rounded-md border px-3 py-2 text-center text-xs font-semibold transition ${hasLive
                                ? "border-cyan-300/35 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20"
                                : "pointer-events-none border-white/10 bg-white/5 text-gray-500"
                                }`}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {hasLive ? "Live Demo" : "Live Demo N/A"}
                        </a>

                        <a
                            href={project.githubUrl || "#"}
                            target={hasGithub ? "_blank" : undefined}
                            rel={hasGithub ? "noreferrer" : undefined}
                            aria-disabled={!hasGithub}
                            className={`rounded-md border px-3 py-2 text-center text-xs font-semibold transition ${hasGithub
                                ? "border-blue-300/35 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
                                : "pointer-events-none border-white/10 bg-white/5 text-gray-500"
                                }`}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {hasGithub ? "GitHub" : "GitHub N/A"}
                        </a>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

export default ProjectCard;
