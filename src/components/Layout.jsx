import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import jpLogo from "../assets/jp.png";

function Layout() {
    const [theme, setTheme] = useState("light");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const handleSectionNav = (event, sectionId) => {
        event.preventDefault();
        if (location.pathname !== "/") {
            navigate(`/#${sectionId}`);
            return;
        }

        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleProjectsNav = (event) => {
        event.preventDefault();
        navigate("/projects");
    };

    return (
        <div
            className={`portfolio-root ${theme === "dark" ? "theme-dark" : "theme-light"
                } ${isLoaded ? "is-loaded" : ""}`}
        >
            <button
                className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>

            <header className="portfolio-header">
                <Link to="/" className="logo-link" aria-label="Go to home">
                    <div className="logo">
                        <img src={jpLogo} alt="JP Logo" />
                    </div>
                </Link>
                <nav className="nav-links">
                    <a href="/#about" onClick={(event) => handleSectionNav(event, "about")}>
                        About
                    </a>
                    <a
                        href="/#experience"
                        onClick={(event) => handleSectionNav(event, "experience")}
                    >
                        Experience
                    </a>
                    <a href="/projects" onClick={handleProjectsNav}>
                        Projects
                    </a>
                    <a href="/#skills" onClick={(event) => handleSectionNav(event, "skills")}>
                        Skills
                    </a>
                    <a
                        href="/#contact"
                        onClick={(event) => handleSectionNav(event, "contact")}
                    >
                        Contact
                    </a>
                </nav>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "dark" ? "Light" : "Dark"}
                </button>
            </header>

            <main className="page-shell">
                <Outlet />
            </main>

            <footer className="footer">
                <p>(c) {new Date().getFullYear()} Jignesh Prajapati. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Layout;
