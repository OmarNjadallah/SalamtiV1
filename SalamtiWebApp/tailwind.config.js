/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray-light": "#bfbfbf",
        "custom-gray": "#7f7f7f",
        "custom-dark-gray": "#404040",
        "custom-black": "#000000",
        "custom-white": "#ffffff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"], // Enable rounded scrollbars if needed
  },
};
