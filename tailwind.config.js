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
        },
    },
    plugins: [],
};
