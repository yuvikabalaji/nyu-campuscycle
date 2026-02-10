import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nyu: {
          purple: "#57068c",
          "purple-light": "#7b2d9e",
          violet: "#6c2d91",
        },
      },
    },
  },
  plugins: [],
};
export default config;
