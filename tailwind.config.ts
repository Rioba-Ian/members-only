import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
 content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 plugins: [daisyui],
 daisyui: {
  themes: {
   mytheme: {
    primary: "#b300ff",
    secondary: "#00f6f9",
    accent: "#00db98",
    neutral: "#011c11",
    "base-100": "#292529",
    info: "#0064ff",
    success: "#00c7a0",
    warning: "#ff7800",
    error: "#ff97a2",
   },
   extend: {
    animation: {
     shimmer: "shimmer 2s linear infinite",
    },
    keyframes: {
     shimmer: {
      from: {
       backgroundPosition: "0 0",
      },
      to: {
       backgroundPosition: "-200% 0",
      },
     },
    },
   },
  },
 },
};
export default config;
