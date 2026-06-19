/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#001736",
        "primary-light": "#0a2d5e",
        accent: "#1a5cc8",
        "accent-soft": "#e8f0fe",
        "on-primary": "#ffffff",
        surface: "#fafbfc",
        "surface-alt": "#f0f2f5",
        "surface-elevated": "#ffffff",
        muted: "#6b7280",
        "muted-light": "#9ca3af",
        border: "#e2e5ea",
        "border-light": "#eef0f3",
        "text-primary": "#111827",
        "text-secondary": "#4b5563",
        error: "#dc2626",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      spacing: {
        "grid-margin": "clamp(1rem, 4vw, 2.5rem)",
        "section-gap": "clamp(4rem, 8vw, 7rem)",
      },
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        body: ["Hanken Grotesk", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 3.5rem)", { lineHeight: "1.08", fontWeight: "700", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.25", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        "label": ["0.8125rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.04em" }],
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
