/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#030303",
          card: "#0C0C0E",
          border: "rgba(255, 255, 255, 0.07)",
          purple: "#A855F7",
          indigo: "#6366F1",
          violet: "#7C3AED"
        },
        risk: {
          low: "#10B981",
          medium: "#F59E0B",
          high: "#EF4444",
          lowGlow: "rgba(16, 185, 129, 0.15)",
          mediumGlow: "rgba(245, 158, 11, 0.15)",
          highGlow: "rgba(239, 68, 68, 0.15)"
        }
      },
      boxShadow: {
        glow: "0 0 20px rgba(168, 85, 247, 0.25)",
        glowAccent: "0 0 25px rgba(99, 102, 241, 0.35)",
        glowLow: "0 0 20px rgba(16, 185, 129, 0.3)",
        glowMedium: "0 0 20px rgba(245, 158, 11, 0.3)",
        glowHigh: "0 0 20px rgba(239, 68, 68, 0.3)"
      }
    },
  },
  plugins: [],
}
