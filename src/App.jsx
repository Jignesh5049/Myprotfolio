import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

import f1 from "./assets/f1.png";
import f2 from "./assets/f2.png";
import f3 from "./assets/f3.png";
import f4 from "./assets/f4.png";
import fa1 from "./assets/fa1.png";
import fa2 from "./assets/fa2.png";
import fa3 from "./assets/fa3.png";
import fe1 from "./assets/fe-1.png";
import fe2 from "./assets/fe-2.png";
import fe3 from "./assets/fe-3.png";
import fe4 from "./assets/fe-4.png";
import hcPic1 from "./assets/hc-pic1.PNG";
import hcPic2 from "./assets/hc-pic2.PNG";
import hcPic3 from "./assets/hc-pic3.PNG";
import km1 from "./assets/km1.png";
import km2 from "./assets/km2.png";
import km3 from "./assets/km3.png";
import km4 from "./assets/km4.png";
import sm1 from "./assets/sm1.png";
import sm2 from "./assets/sm2.png";
import sm3 from "./assets/sm3.png";
import vrh1 from "./assets/vrh-1.png";
import vrh2 from "./assets/vrh-2.png";
import vrh3 from "./assets/vrh-3.png";
import vrh4 from "./assets/vrh-4.png";
import vrh5 from "./assets/vrh-5.png";
import cvmLogo from "./assets/cvm.png";
import jjisLogo from "./assets/jjis.png";
import heroPortrait from "./assets/me.jpg";
import jpLogo from "./assets/jp.png";

const PROJECT_IMAGES = {
  fa: [fa1, fa2, fa3],
  f: [f1, f2, f3, f4],
  fe: [fe1, fe2, fe3, fe4],
  hc: [hcPic1, hcPic2, hcPic3],
  km: [km1, km2, km3, km4],
  sm: [sm1, sm2, sm3],
  vrh: [vrh1, vrh2, vrh3, vrh4, vrh5],
};

// EmailJS configuration - Load from .env file
// Create a .env file in the root directory with your EmailJS credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const PROJECT_CATEGORIES = [
  "All",
  "Web Development",
  "UI/UX",
  "Mobile Apps",
  "Data & Analytics",
];

const EXPERIENCE = [
  {
    id: 1,
    position: "UI/UX Design Intern",
    company: "Venom Technology",
    companyUrl: "https://www.venomtechnologies.in/",
    location: "Anand",
    timeline: "15 days(2025)",
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
    timeline: "2022 – 2026",
    stats: ["CGPA: 7.15 / 10"],
    logo: cvmLogo,
    logoAlt: "CVM University logo",
  },
  {
    id: 2,
    degree: "Secondary & Higher Secondary",
    institution: "Jay Jalaram International School, Anand",
    timeline: "Class 12 (2022) • Class 10 (2020)",
    stats: ["Class 12: 50%", "Class 10: 61%"],
    logo: jjisLogo,
    logoAlt: "Jay Jalaram International School logo",
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Flipkart Mobile Sales Data Visualization & Price Prediction",
    category: "Data & Analytics",
    shortDesc:
      "Comprehensive data analysis and predictive modeling on mobile phone sales data with interactive visualizations.",
    tech: ["Python", "Pandas", "Matplotlib", "Scikit-learn", "Jupyter"],
    timeline: "2025",
    role: "Data Analyst & ML Engineer",
    highlights: [
      "Analyzed Flipkart mobile sales dataset to uncover pricing trends, brand performance, and market insights.",
      "Created interactive visualizations for price distribution, specifications correlation, and sales patterns.",
      "Developed predictive models using machine learning algorithms to forecast mobile phone prices.",
      "Generated actionable insights on feature importance and market segmentation for pricing strategies.",
    ],
  },
  {
    id: 2,
    title: "FlightAware – Travel Booking Web Platform",
    category: "UI/UX",
    shortDesc:
      "End-to-end travel-booking website concept with hero search, service clusters, and rich destination stories.",
    tech: ["Figma", "UI Design", "Web"],
    timeline: "2025",
    role: "Product Designer",
    imagesKey: "fa",
    highlights: [
      "Structured navigation with hero search, destination filters, and newsletter capture.",
      "Crafted gradient hero, icon-driven services, and card-based travel packages for clarity.",
      "Prioritized a seamless booking flow using large imagery and grouped travel services.",
    ],
  },
  {
    id: 3,
    title: "foodieExpress – Food Delivery Mobile App",
    category: "Mobile Apps",
    shortDesc:
      "Modern food delivery platform UI with restaurant discovery, menu browsing, cart management, and real-time order tracking.",
    tech: ["Figma", "Mobile UI", "Prototyping"],
    timeline: "2025",
    role: "UI/UX Designer",
    imagesKey: "fe",
    highlights: [
      "Designed intuitive restaurant discovery with search, filters, ratings, and quick restaurant cards.",
      "Created seamless menu browsing experience with food categorization, descriptions, prices, and food images.",
      "Built smooth cart and checkout flow with item customization, quantity selection, and secure payment options.",
      "Implemented real-time order tracking screen with delivery progress, estimated arrival, and live location updates.",
    ],
  },
  {
    id: 4,
    title: "Frutify – Fresh Fruits & Juice Ordering App",
    category: "Mobile Apps",
    shortDesc:
      "Mobile commerce UI with splash, auth flow, category browsing, product cards, and cart experience.",
    tech: ["Figma", "Mobile UI", "Proto"],
    timeline: "2025",
    role: "UI/UX Designer",
    imagesKey: "f",
    highlights: [
      "Applied bold fruit palette, rounded cards, and pricing tags that feel instantly shoppable.",
      "Designed rating icons, filters, add-to-cart buttons, and a sticky bottom navigation.",
      "Mapped full journey from splash and login to cart review for a cohesive app-like feel.",
    ],
  },
  {
    id: 5,
    title: "HobbyClass – Online Hobby Learning Website",
    category: "UI/UX",
    shortDesc:
      "Exploration platform for art, dance, music, and tech classes with tutor discovery and quick signup.",
    tech: ["Figma", "Component Library", "Web"],
    timeline: "2024",
    role: "Product Designer",
    imagesKey: "hc",
    highlights: [
      "Laid out hero signup form, category tabs, and carousel tutor highlights for effortless scanning.",
      "Created mentor cards with hover states plus top tutor rail for credibility.",
      "Used a calm blue palette, airy spacing, and scroll-friendly sections to keep focus on content.",
    ],
  },
  {
    id: 6,
    title: "KrishiMitra – Farmer-to-Consumer Ecommerce App",
    category: "Mobile Apps",
    shortDesc:
      "Farm marketplace app connecting rural producers to cities with transparent listings and orders.",
    tech: ["Figma", "Design Systems", "Mobile"],
    timeline: "2024",
    role: "Product Designer",
    imagesKey: "km",
    highlights: [
      "Built flows for category browsing, product detail, farmer profiles, cart, and summary screens.",
      "Used clean white/green palette, dropdown navigation, and readable typography for trust.",
      "Highlighted farmer info and simple menu system tailored for rural-to-urban commerce.",
    ],
  },
  {
    id: 7,
    title: "StayMajestic – Hotel Booking Website",
    category: "Web Development",
    shortDesc:
      "Premium hotel booking UI with night-themed hero, location search, loyalty CTA, and FAQ accordions.",
    tech: ["Figma", "UI Design", "Web"],
    timeline: "2025",
    role: "Product Designer",
    imagesKey: "sm",
    highlights: [
      "Composed dark hero banner, membership CTA, and destination cards to feel luxurious.",
      "Blended location-based search, modern layouts, and smooth spacing for clarity.",
      "Added FAQ accordion and curated content blocks to keep the experience concise yet rich.",
    ],
  },
  {
    id: 8,
    title: "Vintage Rides Hub – Car Rental & Sales Platform",
    category: "Web Development",
    shortDesc:
      "Full-stack car marketplace with rental, buying, selling, and price prediction features powered by machine learning.",
    tech: ["React", "Python", "Flask", "ML", "Data Analytics"],
    timeline: "2025",
    role: "Full Stack Developer",
    imagesKey: "vrh",
    highlights: [
      "Developed integrated platform for car rentals, purchases, and sales with seamless user workflows.",
      "Built ML-powered price prediction model for accurate vehicle valuations using historical data.",
      "Implemented search, filtering, and booking modals with real-time inventory management.",
      "Created responsive React UI with context API for state management and dynamic car listings.",
    ],
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState("dark");
  const modalGalleryRef = useRef(null);
  const [contactStatus, setContactStatus] = useState({ type: null, message: "" });
  const [contactLoading, setContactLoading] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const selectedImages =
    selectedProject?.imagesKey && PROJECT_IMAGES[selectedProject.imagesKey]
      ? PROJECT_IMAGES[selectedProject.imagesKey]
      : [];

  useEffect(() => {
    if (modalGalleryRef.current) {
      modalGalleryRef.current.scrollLeft = 0;
    }
  }, [selectedProject]);

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
      // Check if EmailJS is configured
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error(
          "EmailJS is not configured. Please create a .env file with your EmailJS credentials. See EMAILJS_SETUP.md for instructions."
        );
      }

      // Validate service ID format
      if (!EMAILJS_SERVICE_ID.startsWith("service_")) {
        throw new Error(
          "Invalid EmailJS Service ID format. It should start with 'service_'. Please check your .env file."
        );
      }

      // Validate template ID format
      if (!EMAILJS_TEMPLATE_ID.startsWith("template_")) {
        throw new Error(
          "Invalid EmailJS Template ID format. It should start with 'template_'. Please check your .env file."
        );
      }

      console.log("Sending email with:", {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY.substring(0, 10) + "...",
      });

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", response);

      form.reset();
      setContactStatus({
        type: "success",
        message: "Thanks for reaching out! I will get back to you soon.",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      let errorMessage = "Something went wrong. Please try again later.";
      
      // Handle EmailJS specific errors
      if (error.status) {
        if (error.status === 400) {
          if (error.text && error.text.includes("service ID not found")) {
            errorMessage = "EmailJS Service ID not found. Please verify your Service ID in the EmailJS dashboard and update your .env file.";
          } else if (error.text && error.text.includes("template")) {
            errorMessage = "EmailJS Template ID not found. Please verify your Template ID in the EmailJS dashboard and update your .env file.";
          } else {
            errorMessage = `EmailJS Error (${error.status}): ${error.text || "Invalid request. Please check your EmailJS configuration."}`;
          }
        } else if (error.status === 401) {
          errorMessage = "EmailJS authentication failed. Please check your Public Key in the .env file.";
        } else {
          errorMessage = `EmailJS Error (${error.status}): ${error.text || error.message || "Unknown error"}`;
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
    <div className={`portfolio-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      {/* Top Navigation */}
      <header className="portfolio-header">
        <div className="logo">
          <img src={jpLogo} alt="JP Logo" />
        </div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-tag">Portfolio / 2025</p>
          <h1>
            Hi, I’m <span className="highlight">Jignesh Prajapati</span>
          </h1>
          <h2>Frontend Developer & UI/UX Designer & Python Enthusiast</h2>
          <p className="hero-subtitle">
            I craft seamless digital experiences through web development, intuitive UI/UX design, and data-driven solutions. Passionate about building real-world applications with React, Python, and machine learning.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn primary">
              View My Work
            </a>
            <a href="#contact" className="btn secondary">
              Let’s Collaborate
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-portrait">
            <img src={heroPortrait} alt="Jignesh Prajapati portrait" />
          </div>
          <p className="hero-pill">Available for Internship & Freelance</p>
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

      {/* About Section */}
      <section id="about" className="section about">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Aspiring Python Developer with hands-on experience in building data-driven and machine learning–based projects. I combine technical expertise in web development, UI/UX design, and Python to create impactful digital solutions. From designing intuitive mobile interfaces to developing full-stack applications with ML-powered features, I'm driven by the challenge of solving real-world problems through technology
        </p>

        {/* Education Section */}
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
              <li>Design modern UI/UX interfaces in Figma for web & mobile apps.</li>
              <li>Build responsive full-stack applications with React, Python & Flask.</li>
              <li>Develop ML models for price prediction and data-driven insights.</li>
              <li>Analyze complex datasets and create interactive visualizations.</li>
            </ul>
          </div>
          <div className="about-card">
            <h3>Currently Learning</h3>
            <ul>
              <li>Advanced Python & machine learning algorithms.</li>
              <li>Building scalable full-stack applications with React & backend frameworks.</li>
              <li>Data visualization and exploratory data analysis techniques.</li>
              <li>Cloud deployment and database optimization.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          Professional experience in design, development, and collaboration.
        </p>

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
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          window.open(exp.companyUrl, "_blank")
                        }
                      >
                        {exp.company}
                      </span>
                      • {exp.location}
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

      {/* Projects Section */}
      <section id="projects" className="section projects">
        <h2 className="section-title">Selected Projects</h2>
        <p className="section-subtitle">
          Explore a curated list of my work across UI/UX, web development, and analytics.
        </p>

        {/* Category Filter */}
        <div className="filter-row">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${
                activeCategory === cat ? "filter-chip-active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-tag">{project.category}</div>
              <h3>{project.title}</h3>
              <p>{project.shortDesc}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-footer">
                <span className="project-timeline">{project.timeline}</span>
                <span className="project-role">{project.role}</span>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="empty-state">No projects in this category yet.</p>
        )}
      </section>

      {/* Skills Section */}
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

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2 className="section-title">Let’s Connect</h2>
        <p className="section-subtitle">
          Open to internships, project collaborations, and UI/UX or frontend opportunities.
        </p>

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
                <strong>Location:</strong> Anand,Gujarat, India
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

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Jignesh Prajapati. All rights reserved.</p>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ✕
            </button>
            <div className="modal-layout">
              <div className="modal-details">
                <p className="modal-tag">{selectedProject.category}</p>
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-role">
                  {selectedProject.role} • {selectedProject.timeline}
                </p>
                <div className="modal-tech-row">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="modal-list">
                  {selectedProject.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
              {selectedImages.length > 0 && (
                <div className="modal-gallery-pane">
                  <div className="modal-gallery" ref={modalGalleryRef}>
                    {selectedImages.map((src, idx) => (
                      <img
                        key={`${selectedProject.imagesKey}-${idx}`}
                        src={src}
                        alt={`${selectedProject.title} screen ${idx + 1}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
