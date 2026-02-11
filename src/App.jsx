import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.error("App error:", error);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-fallback">
                    <h2>Something went wrong.</h2>
                    <p>Please refresh the page. If it happens again, clear the cache and try once more.</p>
                    <button type="button" className="btn primary" onClick={this.handleReload}>
                        Reload page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="projects/:slug" element={<ProjectDetails />} />
                    </Route>
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;
