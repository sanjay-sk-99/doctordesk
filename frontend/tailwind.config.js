  /** @type {import('tailwindcss').Config} */
  export default {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Light Mode
          "light-bg": "#dbeafe",
          "light-text": "#1F2937",
          "light-border": "#dbeafe",
          "light-card": "#ffffff",

          // Dark Mode
          "dark-bg": "#000",
          "dark-text": "#F3F4F6",
          "dark-border": "#4f5154",
          "dark-card": "#1f2937",
        },
        boxShadow: {
          light: "0 4px 8px rgba(0, 0, 0, 0.1)",
          dark: "0 4px 8px rgba(0, 0, 0, 0.4)",
        },
      },
    },
    plugins: [
    require('tailwind-scrollbar-hide'), //  Add this line
  ],
  };
