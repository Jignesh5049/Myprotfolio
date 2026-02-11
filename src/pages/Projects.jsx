import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects";

function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") {
            return PROJECTS;
        }
        return PROJECTS.filter((project) => project.category === activeCategory);
    }, [activeCategory]);

    return (
        <section className="section projects-page">
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">
                Scroll through the project gallery and open any project for a detailed case study.
            </p>

            <div className="filter-row">
                {PROJECT_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-chip ${activeCategory === cat ? "filter-chip-active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="project-grid project-grid-page">
                {filteredProjects.map((project) => (
                    <Link
                        key={project.id}
                        to={`/projects/${project.slug}`}
                        className="project-card"
                    >
                        <div className="corner-decor" />
                        <div className="view-indicator">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="project-tag">{project.category}</div>
                        <h3>{project.title}</h3>
                        <p>{project.shortDesc}</p>
                        <div className="project-tech">
                            {project.tech.map((tech) => (
                                <span key={tech} className="tech-pill">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="project-footer">
                            <span className="project-timeline">{project.timeline}</span>
                            <span className="project-role">{project.role}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <p className="empty-state">No projects in this category yet.</p>
            )}
        </section>
    );
}

export default Projects;
