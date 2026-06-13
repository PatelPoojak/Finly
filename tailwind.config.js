/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF6EC",
        surface: "#FFFFFF",
        surfacewarm: "#FCFAF2",
        ink: "#1A1F1A",
        muted: "#5B6159",
        forest: "#1B5E45",
        forestdeep: "#16482F",
        gold: "#C98A2E",
        goldsoft: "#E7B86B",
        line: "#E7DFCC",
        correctbg: "#E8F1EB",
        wrongbg: "#FBEBE4",
        wrong: "#B5532B",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 48px -28px rgba(26,31,26,0.4)",
        lift: "0 22px 44px -30px rgba(26,31,26,0.45)",
      },
    },
  },
  plugins: [],
};
