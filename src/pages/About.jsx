import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Code2, Layers3, MapPinHouse } from "lucide-react";
import profilePhoto from "../assets/me.jpg";
import { ABOUT_COPY, EDUCATION, SKILL_GROUPS } from "../data/profile";

function About() {
    const topEducation = EDUCATION[0];
    const schoolEducation = EDUCATION[1];

    const aboutHighlights = [
        {
            title: "Experience",
            value: "+2 Years",
            description: "UI/UX design, Flutter development, and ongoing product collaboration.",
            icon: BriefcaseBusiness,
        },
        {
            title: "Specialty",
            value: "Scalable UI",
            description: "Systematic components, reusable patterns, and maintainable UI structure.",
            icon: Layers3,
        },
        {
            title: "Technical Basis",
            value: "Flutter + Web",
            description: "From interface design to production implementation and iteration.",
            icon: Code2,
        },
        {
            title: "Work Model",
            value: "Remote",
            description: "Clear communication, async updates, and collaborative delivery.",
            icon: MapPinHouse,
        },
    ];

    return (
        <div className="relative overflow-hidden bg-[#0a0a0f]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%)]" />

            <div className="relative z-10 mx-auto max-w-7xl space-y-7 px-5 pb-12 pt-24 sm:space-y-8 sm:px-8">

                <section className="rounded-3xl border border-cyan-200/20 bg-[#0d1117]/85 p-6 shadow-[0_18px_60px_rgba(8,16,28,0.7)] backdrop-blur-xl sm:p-8 lg:p-9">
                    <div className="grid gap-8 lg:grid-cols-[1.45fr_0.55fr] lg:items-start">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:text-xs" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                <span className="text-cyan-200">*</span> About me
                            </p>
                            <h1 className="mt-3 max-w-3xl font-display text-[2rem] font-bold leading-[1.1] text-white sm:mt-4 sm:text-[2.65rem]">
                                From front-end to product systems, focused on clarity, speed, and collaboration.
                            </h1>
                            <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-300 sm:text-[15px]">{ABOUT_COPY.intro}</p>
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400 sm:text-[15px]">{ABOUT_COPY.background}</p>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-cyan-300/25 bg-cyan-500/10 px-4 py-3 text-[13px] leading-6 text-cyan-100 sm:text-sm">Location: {ABOUT_COPY.location}</div>
                                <div className="rounded-xl border border-fuchsia-300/25 bg-fuchsia-500/10 px-4 py-3 text-[13px] leading-6 text-fuchsia-100 sm:text-sm">Email: {ABOUT_COPY.email}</div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            className="rounded-2xl border border-cyan-300/30 bg-white/5 p-3 sm:p-3.5"
                        >
                            <img src={profilePhoto} alt="Jignesh Prajapati" className="h-[17.5rem] w-full rounded-xl object-cover sm:h-[18.5rem]" />
                            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                                <p className="text-sm font-semibold leading-5 text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Jignesh Prajapati</p>
                                <p className="mt-0.5 text-xs leading-5 text-gray-300">Flutter Developer and UI/UX focused builder</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-7 grid gap-4 md:grid-cols-2 xl:mt-8 xl:grid-cols-4">
                        {aboutHighlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.article
                                    key={item.title}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.35, delay: index * 0.06 }}
                                    className="rounded-2xl border border-white/15 bg-[#101723]/80 p-5 sm:p-6"
                                >
                                    <div className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/10 p-2 text-cyan-200">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.13em] text-gray-400 sm:text-xs" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.title}</p>
                                    <h3 className="mt-1.5 text-[1.35rem] font-semibold leading-tight text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.value}</h3>
                                    <p className="mt-2.5 text-sm leading-6 text-gray-300">{item.description}</p>
                                </motion.article>
                            );
                        })}
                    </div>
                </section>

                <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
                    >
                        <p className="mb-1 text-xs uppercase tracking-[0.14em] text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Education</p>
                        <h3 className="font-display text-xl leading-tight text-white sm:text-[1.4rem]">Academic Background</h3>
                        <div className="mt-4 space-y-4">
                            {EDUCATION.map((edu) => (
                                <div key={edu.id} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                                    {edu.logo && (
                                        <img src={edu.logo} alt={edu.logoAlt || edu.institution} className="h-12 w-12 flex-shrink-0 object-contain" />
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold leading-6 text-white">{edu.degree}</p>
                                        <p className="mt-1 text-sm leading-6 text-gray-300">{edu.institution}</p>
                                        {edu.university && (
                                            <p className="mt-0.5 text-sm leading-6 text-gray-300">{edu.university}</p>
                                        )}
                                        <p className="text-xs leading-5 text-gray-400">{edu.timeline}</p>
                                        {edu.stats && edu.stats.length > 0 && (
                                            <p className="mt-2 text-sm leading-6 text-cyan-200">{edu.stats.join(" | ")}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
                    >
                        <p className="mb-1 text-xs uppercase tracking-[0.14em] text-cyan-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Skills</p>
                        <h3 className="font-display text-xl leading-tight text-white sm:text-[1.4rem]">Tech Stack</h3>
                        <div className="mt-4 space-y-4">
                            {SKILL_GROUPS.map((group) => (
                                <div key={group.title} className="rounded-xl border border-white/10 bg-[#0f1624] p-4 sm:p-5">
                                    <p className="mb-2 text-sm leading-6 text-cyan-200" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{group.title}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((skill) => (
                                            <span key={skill} className="rounded-md border border-cyan-300/30 bg-cyan-500/10 px-2.5 py-1 text-xs leading-5 text-cyan-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}

export default About;
