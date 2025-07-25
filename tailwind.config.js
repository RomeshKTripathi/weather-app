// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                clouds: "url('./public/clouds.jpg')",
                // add more as needed
            },
            keyframes: {
                typing: {
                    from: { width: "0" },
                    to: { width: "100%" },
                },
                blink: {
                    "50%": { borderColor: "transparent" },
                },
            },
            // animation: {
            "--animate-typing": "typing 3s steps(30, end) forwards",
            "--animate-blink": "blink 0.7s step-end infinite",
            // },
        },
    },
    plugins: [],
};
