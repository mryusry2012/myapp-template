/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb",
        foreground: "#111827",
        card: "#ffffff",
        "card-foreground": "#1f2937",
        input: "#f3f4f6",
        ring: "#3b82f6",
        border: "#e5e7eb",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
        primary: "#3b82f6",
        "primary-foreground": "#ffffff",
      },
    },
  },
  plugins: [],
}
