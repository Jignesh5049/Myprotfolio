import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import cvmLogo from "../assets/cvm.png";
import jjisLogo from "../assets/jjis.png";
import heroPortrait from "../assets/me.jpg";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EXPERIENCE = [
    {
        id: 1,
        position: "Flutter Developer Intern",
        company: "TenUp Software Service",
        companyUrl: "https://www.tenupsoft.com/",
        location: "Vadodara",
        timeline: "Jan 2026 - Present",
        responsibilities: [
            "Developing cross-platform mobile applications using Flutter and Dart framework.",
            "Building responsive UI components and implementing state management solutions.",
            "Collaborating with the development team on real-world client projects and feature implementations.",
            "Learning best practices for mobile app architecture and clean code principles.",
        ],
    },
    {
        id: 2,
        position: "UI/UX Design Intern",
        company: "Venom Technology",
        companyUrl: "https://www.venomtechnologies.in/",
        location: "Anand",
        timeline: "2025",
        responsibilities: [
            "Created wireframes, modern UI screens, and interactive prototypes using Figma.",
            "Worked on layout structuring, component design, spacing systems, and user flow optimization.",
            "Collaborated with the design team in fast-paced tasks, improving visual hierarchy and usability.",
        ],
    },
];

const EDUCATION = [
    {
        id: 1,
        degree: "B.Tech. in Information Technology",
        institution: "Madhuben & Bhanubhai Patel Institute of Technology",
        university: "CVM University, V.V. Nagar",
        timeline: "2022 - 2026",
        stats: ["CGPA: 7.15 / 10"],
        logo: cvmLogo,
        logoAlt: "CVM University logo",
    },
    {
        id: 2,
        degree: "Secondary & Higher Secondary",
        institution: "Jay Jalaram International School, Anand",
        timeline: "Class 12 (2022) - Class 10 (2020)",
        stats: ["Class 12: 50%", "Class 10: 61%"],
        logo: jjisLogo,
        logoAlt: "Jay Jalaram International School logo",
    },
];

function Home() {
    const [contactStatus, setContactStatus] = useState({ type: null, message: "" });
    const [contactLoading, setContactLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") {
            return PROJECTS;
        }
        return PROJECTS.filter((project) => project.category === activeCategory);
    }, [activeCategory]);

    const handleContactSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const templateParams = {
            from_name: formData.get("name"),
            from_email: formData.get("email"),
            message: formData.get("message"),
            to_email: "prajapatijignesh255@gmail.com",
        };

        setContactLoading(true);
        setContactStatus({ type: null, message: "" });

        try {
            if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
                throw new Error(
                    "EmailJS is not configured. Please create a .env file with your EmailJS credentials. See EMAILJS_SETUP.md for instructions."
                );
            }

            if (!EMAILJS_SERVICE_ID.startsWith("service_")) {
                throw new Error(
                    "Invalid EmailJS Service ID format. It should start with 'service_'. Please check your .env file."
                );
            }

            if (!EMAILJS_TEMPLATE_ID.startsWith("template_")) {
                throw new Error(
                    "Invalid EmailJS Template ID format. It should start with 'template_'. Please check your .env file."
                );
            }

            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            form.reset();
            setContactStatus({
                type: "success",
                message: "Thanks for reaching out! I will get back to you soon.",
            });

            return response;
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again later.";

            if (error.status) {
                if (error.status === 400) {
                    if (error.text && error.text.includes("service ID not found")) {
                        errorMessage =
                            "EmailJS Service ID not found. Please verify your Service ID in the EmailJS dashboard and update your .env file.";
                    } else if (error.text && error.text.includes("template")) {
                        errorMessage =
                            "EmailJS Template ID not found. Please verify your Template ID in the EmailJS dashboard and update your .env file.";
                    } else {
                        errorMessage = `EmailJS Error (${error.status}): ${error.text || "Invalid request. Please check your EmailJS configuration."
                            }`;
                    }
                } else if (error.status === 401) {
                    errorMessage =
                        "EmailJS authentication failed. Please check your Public Key in the .env file.";
                } else {
                    errorMessage = `EmailJS Error (${error.status}): ${error.text || error.message || "Unknown error"
                        }`;
                }
            } else if (error.text) {
                errorMessage = `Failed to send: ${error.text}`;
            } else if (error.message) {
                errorMessage = error.message;
            }

            setContactStatus({
                type: "error",
                message: errorMessage,
            });
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <div className="page-content">
            <section className="hero">
                <div className="hero-text">
                    <p className="hero-tag">Portfolio / 2026</p>
                    <h1>
                        <span className="hero-intro">Hi, I'm</span>
                        <br />
                        <span className="highlight">Jignesh Prajapati</span>
                    </h1>
                    <h2>Frontend Developer & UI/UX Designer & Python Enthusiast</h2>
                    <p className="hero-subtitle">
                        I craft seamless digital experiences through web development, intuitive UI/UX design, and data-driven
                        solutions. Passionate about building real-world applications with React, Python, and machine learning.
                    </p>

                    <div className="hero-actions">
                        <Link to="/projects" className="btn primary">
                            View My Work
                        </Link>
                        <Link to="/#contact" className="btn secondary">
                            Let's Collaborate
                        </Link>
                    </div>
                </div>

                <div className="hero-card">
                    <div className="hero-portrait">
                        <img src={heroPortrait} alt="Jignesh Prajapati portrait" />
                    </div>
                    <p className="hero-pill">Available for Freelance</p>
                    <div className="hero-stat-grid">
                        <div className="stat-card">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">UI Screens</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">5+</span>
                            <span className="stat-label">Mini Projects</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">2+</span>
                            <span className="stat-label">Domains</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="section about">
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">
                    Aspiring Python Developer with hands-on experience in building data-driven and machine learning based projects.
                    I combine technical expertise in web development, UI/UX design, and Python to create impactful digital
                    solutions. From designing intuitive mobile interfaces to developing full-stack applications with ML-powered
                    features, I'm driven by the challenge of solving real-world problems through technology.
                </p>

                <div className="education-grid" style={{ marginTop: "24px", marginBottom: "32px" }}>
                    {EDUCATION.map((edu) => (
                        <article key={edu.id} className="education-card">
                            <div className="education-card-top">
                                <div className="education-logo">
                                    <img src={edu.logo} alt={edu.logoAlt} loading="lazy" />
                                </div>
                                <div>
                                    <p className="education-degree">{edu.degree}</p>
                                    <p className="education-institution">{edu.institution}</p>
                                    {edu.university && <p className="education-university">{edu.university}</p>}
                                </div>
                            </div>
                            <div className="education-meta">
                                <span>{edu.timeline}</span>
                            </div>
                            <ul>
                                {edu.stats.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                <div className="about-grid">
                    <div className="about-card">
                        <h3>What I Do</h3>
                        <ul>
                            <li>Design modern UI/UX interfaces in Figma for web and mobile apps.</li>
                            <li>Build responsive full-stack applications with React, Python, and Flask.</li>
                            <li>Develop ML models for price prediction and data-driven insights.</li>
                            <li>Analyze complex datasets and create interactive visualizations.</li>
                        </ul>
                    </div>
                    <div className="about-card">
                        <h3>Currently Learning</h3>
                        <ul>
                            <li>Advanced Python and machine learning algorithms.</li>
                            <li>Building scalable full-stack applications with React and backend frameworks.</li>
                            <li>Data visualization and exploratory data analysis techniques.</li>
                            <li>Cloud deployment and database optimization.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="experience" className="section experience">
                <h2 className="section-title">Experience</h2>
                <p className="section-subtitle">Professional experience in design, development, and collaboration.</p>

                <div className="timeline">
                    {EXPERIENCE.map((exp) => (
                        <article key={exp.id} className="timeline-item">
                            <div className="timeline-content">
                                <div className="experience-header">
                                    <div>
                                        <h3 className="experience-position">{exp.position}</h3>
                                        <p className="experience-company">
                                            <span
                                                className="company-link"
                                                onClick={() => window.open(exp.companyUrl, "_blank")}
                                                role="button"
                                                tabIndex="0"
                                                onKeyDown={(e) => e.key === "Enter" && window.open(exp.companyUrl, "_blank")}
                                            >
                                                {exp.company}
                                            </span>
                                            {" "}
                                            - {exp.location}
                                        </p>
                                    </div>
                                    <span className="experience-timeline">{exp.timeline}</span>
                                </div>
                                <ul className="experience-list">
                                    {exp.responsibilities.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="projects" className="section projects">
                <div className="projects-header">
                    <div>
                        <h2 className="section-title">My Projects</h2>
                        <p className="section-subtitle">
                            Explore a curated list of my work across UI/UX, web development, and analytics.
                        </p>
                    </div>
                    <Link to="/projects" className="btn secondary">
                        View All Projects
                    </Link>
                </div>

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

                <div className="project-scroll">
                    <div className="project-grid project-grid-horizontal">
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
                </div >

                {
                    filteredProjects.length === 0 && (
                        <p className="empty-state">No projects in this category yet.</p>
                    )
                }
            </section >

            <section id="skills" className="section skills">
                <h2 className="section-title">Skills & Tools</h2>
                <div className="skills-grid">
                    <div className="skill-block">
                        <h3>Frontend</h3>
                        <div className="skill-chips">
                            <span>HTML5</span>
                            <span>CSS3</span>
                            <span>JavaScript</span>
                            <span>React</span>
                        </div>
                    </div>
                    <div className="skill-block">
                        <h3>Design</h3>
                        <div className="skill-chips">
                            <span>Figma</span>
                            <span>UI/UX</span>
                            <span>Wireframing</span>
                            <span>Prototyping</span>
                        </div>
                    </div>
                    <div className="skill-block">
                        <h3>Data & Others</h3>
                        <div className="skill-chips">
                            <span>Python Basics</span>
                            <span>Data Analysis</span>
                            <span>Charts & Reports</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="section contact">
                <h2 className="section-title">Let's Connect</h2>
                <p className="section-subtitle">Open for project collaborations, and UI/UX or frontend opportunities.</p>

                <div className="contact-grid">
                    <div className="contact-card">
                        <h3>Contact Details</h3>
                        <ul>
                            <li>
                                <strong>Name:</strong> Jignesh Prajapati
                            </li>
                            <li>
                                <strong>Email:</strong> prajapatijignesh255@gmail.com
                            </li>
                            <li>
                                <strong>Location:</strong> Anand, Gujarat, India
                            </li>
                        </ul>
                    </div>
                    <form className="contact-form" onSubmit={handleContactSubmit}>
                        <label>
                            Your Name
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                required
                                disabled={contactLoading}
                            />
                        </label>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                disabled={contactLoading}
                            />
                        </label>
                        <label>
                            Message
                            <textarea
                                rows="3"
                                name="message"
                                placeholder="Tell me about your project..."
                                required
                                disabled={contactLoading}
                            />
                        </label>
                        <button type="submit" className="btn primary full-width">
                            {contactLoading ? "Sending..." : "Send Message"}
                        </button>
                        {contactStatus.message && (
                            <p className={`form-status ${contactStatus.type}`}>{contactStatus.message}</p>
                        )}
                    </form>
                </div>
            </section>
        </div >
    );
}

export default Home;
