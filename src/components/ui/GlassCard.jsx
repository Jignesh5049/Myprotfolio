import React from "react";

function GlassCard({ children, className = "", ...rest }) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl border border-cyan-200/15 bg-[#0d1117]/75 backdrop-blur-xl shadow-2xl shadow-blue-500/10 ${className}`}
            {...rest}
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-violet-300/12" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export default GlassCard;
