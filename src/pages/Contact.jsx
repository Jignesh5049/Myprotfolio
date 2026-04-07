import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import { ABOUT_COPY, SOCIAL_LINKS } from "../data/profile";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Contact() {
    const [contactStatus, setContactStatus] = useState({ type: null, message: "" });
    const [contactLoading, setContactLoading] = useState(false);
    const [errors, setErrors] = useState({ name: "", email: "", message: "" });

    const validate = (formData) => {
        const nextErrors = { name: "", email: "", message: "" };
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (name.length < 2) {
            nextErrors.name = "Please enter at least 2 characters.";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (message.length < 10) {
            nextErrors.message = "Please add at least 10 characters.";
        }

        setErrors(nextErrors);
        return !nextErrors.name && !nextErrors.email && !nextErrors.message;
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        if (!validate(formData)) {
            setContactStatus({ type: "error", message: "Please fix the highlighted fields." });
            return;
        }

        const templateParams = {
            from_name: formData.get("name"),
            from_email: formData.get("email"),
            message: formData.get("message"),
            to_email: ABOUT_COPY.email,
        };

        setContactLoading(true);
        setContactStatus({ type: null, message: "" });

        try {
            if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
                throw new Error(
                    "EmailJS is not configured. Please create a .env file with your EmailJS credentials. See EMAILJS_SETUP.md for instructions."
                );
            }

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            form.reset();
            setErrors({ name: "", email: "", message: "" });
            setContactStatus({
                type: "success",
                message: "Thanks for reaching out! I will get back to you soon.",
            });
        } catch (error) {
            setContactStatus({
                type: "error",
                message: error?.message || "Something went wrong. Please try again later.",
            });
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="rounded-3xl border border-pink-500/20 bg-[#0d1117]/75 p-5 backdrop-blur-xl sm:p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-pink-300">Contact</p>
                <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">Contact Interface</h1>
                <p className="mt-2 text-sm text-gray-300">Send a message using the form below.</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                    <GlassCard className="h-full p-6">
                        <h3 className="mb-3 font-display text-lg font-semibold text-white">Contact Details</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <span className="text-accent-secondary">Name:</span> Jignesh Prajapati
                            </li>
                            <li>
                                <span className="text-accent-secondary">Email:</span> {ABOUT_COPY.email}
                            </li>
                            <li>
                                <span className="text-accent-secondary">Location:</span> {ABOUT_COPY.location}
                            </li>
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="rounded-md border border-cyan-400/35 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 }}
                >
                    <GlassCard className="p-6">
                        <form className="space-y-4" onSubmit={handleContactSubmit} noValidate>
                            <label className="block text-sm text-gray-200">
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="[********]"
                                    required
                                    disabled={contactLoading}
                                    className="mt-1 w-full rounded-md border border-white/15 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-pink-400/50"
                                />
                                {errors.name ? <span className="mt-1 block text-xs text-rose-300">{errors.name}</span> : null}
                            </label>

                            <label className="block text-sm text-gray-200">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="[********]"
                                    required
                                    disabled={contactLoading}
                                    className="mt-1 w-full rounded-md border border-white/15 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-pink-400/50"
                                />
                                {errors.email ? <span className="mt-1 block text-xs text-rose-300">{errors.email}</span> : null}
                            </label>

                            <label className="block text-sm text-gray-200">
                                Message:
                                <textarea
                                    rows="4"
                                    name="message"
                                    placeholder="[________]"
                                    required
                                    disabled={contactLoading}
                                    className="mt-1 w-full rounded-md border border-white/15 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-pink-400/50"
                                />
                                {errors.message ? <span className="mt-1 block text-xs text-rose-300">{errors.message}</span> : null}
                            </label>

                            <AnimatedButton type="submit" disabled={contactLoading} className="w-full justify-center">
                                {contactLoading ? "Sending..." : "Send Message"}
                            </AnimatedButton>

                            {contactStatus.message ? (
                                <p
                                    className={`rounded-lg border px-3 py-2 text-sm ${contactStatus.type === "success"
                                        ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                                        : "border-rose-400/50 bg-rose-400/10 text-rose-200"
                                        }`}
                                >
                                    {contactStatus.message}
                                </p>
                            ) : null}
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;
