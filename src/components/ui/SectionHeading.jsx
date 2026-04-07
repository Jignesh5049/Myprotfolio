import React from "react";

function SectionHeading({ eyebrow, title, subtitle }) {
    return (
        <div className="max-w-3xl space-y-3">
            {eyebrow ? (
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
            ) : null}
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
            {subtitle ? <p className="text-sm text-gray-300 sm:text-base">{subtitle}</p> : null}
        </div>
    );
}

export default SectionHeading;
