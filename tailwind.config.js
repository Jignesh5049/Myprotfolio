/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                cyber: {
                    950: "#050710",
                    900: "#090d1a",
                    800: "#111832",
                    700: "#1d2550",
                    neonBlue: "#5d7bff",
                    neonPurple: "#ba8cff",
                    neonViolet: "#7f5cff",
                },
            },
            fontFamily: {
                display: ["Space Grotesk", "Inter", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },
            boxShadow: {
                glow: "0 0 32px rgba(69, 232, 255, 0.26)",
                "glow-purple": "0 0 36px rgba(186, 140, 255, 0.3)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                pulseGlow: "pulseGlow 4s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
