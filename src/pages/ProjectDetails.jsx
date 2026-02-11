import React from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug, PROJECT_IMAGES } from "../data/projects";

function ProjectDetails() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <section className="section project-details">
                <h2 className="section-title">Project not found</h2>
                <p className="section-subtitle">Please choose another project from the list.</p>
                <Link className="btn secondary compact" to="/projects">
                    Back to Projects
                </Link>
            </section>
        );
    }

    const galleryImages = project.imagesKey ? PROJECT_IMAGES[project.imagesKey] : [];
    const heroImage = galleryImages[0];

    return (
        <section className="section project-details">
            <div className="project-details-header">
                <Link className="btn secondary" to="/projects">
                    Back to Projects
                </Link>
                <div className="project-tag">{project.category}</div>
            </div>

            <div className="project-hero">
                <div className="project-hero-content">
                    <h2 className="section-title">{project.title}</h2>
                    <p className="section-subtitle">{project.shortDesc}</p>

                    <div className="project-details-meta">
                        <span className="project-role">{project.role}</span>
                        <span className="project-timeline">{project.timeline}</span>
                    </div>

                    <div className="project-tech">
                        {project.tech.map((tech) => (
                            <span key={tech} className="tech-pill">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={`project-hero-media ${project.hasMobileScreenshots ? 'hide-on-mobile' : ''}`}>
                    {heroImage ? (
                        <img src={heroImage} alt={`${project.title} hero`} loading="lazy" />
                    ) : (
                        <div className="project-hero-placeholder">Preview coming soon</div>
                    )}
                </div>
            </div>

            <div className="project-details-grid">
                <div className="project-details-copy">
                    <h3>Highlights</h3>
                    <ul className="modal-list">
                        {project.highlights.map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                </div>
                <div className="project-details-gallery">
                    <h3>Project Screenshots</h3>
                    {galleryImages.length > 0 ? (
                        <div className="project-gallery">
                            {galleryImages.map((src, idx) => (
                                <img
                                    key={`${project.slug}-${idx}`}
                                    src={src}
                                    alt={`${project.title} screenshot ${idx + 1}`}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="empty-state">Screenshots will be added soon.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProjectDetails;
