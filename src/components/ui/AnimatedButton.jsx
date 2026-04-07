import React from "react";
import { Link } from "react-router-dom";

function baseClasses(variant, className) {
    const variants = {
        primary:
            "border-cyan-300/40 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white hover:border-cyan-200/70 hover:shadow-lg hover:shadow-cyan-500/25",
        ghost:
            "border-white/10 bg-white/5 text-gray-200 hover:border-purple-400/40 hover:text-purple-200 hover:bg-white/10",
    };

    return `group inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 ${variants[variant] || variants.primary} ${className}`;
}

function AnimatedButton({
    to,
    href,
    children,
    className = "",
    variant = "primary",
    ...rest
}) {
    const classes = baseClasses(variant, className);

    if (to) {
        return (
            <Link to={to} className={classes} {...rest}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <button type="button" className={classes} {...rest}>
            {children}
        </button>
    );
}

export default AnimatedButton;
