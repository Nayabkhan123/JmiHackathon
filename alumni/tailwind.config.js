/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // adjust path based on your project
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        primaryDark: "var(--primary-dark)",
        accent: "var(--accent-color)",
        bgLight: "var(--bg-light)",
        bgDark: "var(--bg-dark)",
        textColor: "var(--text-color)",
        borderColor: "var(--border-color)",
        deccent: "var(--deccent-color)",

      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionDuration: {
        custom: "var(--transition-speed)",
      },
    },
  },
  plugins: [],
}
