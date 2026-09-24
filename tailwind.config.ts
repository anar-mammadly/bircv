import type { Config } from "tailwindcss";

// Every colour is a CSS variable (see app/globals.css) so light and dark themes share one set of classes.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: v("bg"), surface: v("surface"), "surface-2": v("surface-2"), "surface-3": v("surface-3"),
        line: v("line"), "line-strong": v("line-strong"),
        ink: v("ink"), "ink-2": v("ink-2"), muted: v("muted"),
        primary: v("primary"), "primary-hover": v("primary-hover"), "primary-soft": v("primary-soft"), "on-primary": v("on-primary"),
        accent: v("accent"), "accent-soft": v("accent-soft"),
        success: v("success"), "success-soft": v("success-soft"),
        warning: v("warning"), "warning-soft": v("warning-soft"),
        danger: v("danger"), "danger-soft": v("danger-soft"),
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 6.2vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "700" }],
        h1: ["clamp(2rem, 4vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "700" }],
        h2: ["clamp(1.5rem, 2.6vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" }],
        body: ["0.9375rem", { lineHeight: "1.6" }],
        small: ["0.8125rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
      },
      borderRadius: { control: "10px", card: "16px", sheet: "20px" },
      boxShadow: {
        sm: "0 1px 2px rgb(var(--shadow) / .06), 0 1px 1px rgb(var(--shadow) / .04)",
        md: "0 2px 4px rgb(var(--shadow) / .05), 0 8px 24px rgb(var(--shadow) / .08)",
        lg: "0 4px 8px rgb(var(--shadow) / .06), 0 24px 56px rgb(var(--shadow) / .14)",
        focus: "0 0 0 3px rgb(var(--primary) / .28)",
      },
      transitionTimingFunction: { out: "cubic-bezier(.2,.8,.2,1)" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        pop: { from: { opacity: "0", transform: "scale(.96)" }, to: { opacity: "1", transform: "none" } },
        sheet: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "none" } },
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        rise: "rise .45s cubic-bezier(.2,.8,.2,1) both",
        pop: "pop .18s cubic-bezier(.2,.8,.2,1) both",
        sheet: "sheet .28s cubic-bezier(.2,.8,.2,1) both",
        fade: "fade .2s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
