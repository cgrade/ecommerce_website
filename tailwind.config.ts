import type { Config } from "tailwindcss";
import type { ConfigWithDaisyUI } from "./types/daisyui";
const daisyui = require("daisyui");

/**
 * @description Tailwind CSS configuration with DaisyUI.
 */
const config: ConfigWithDaisyUI = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Scan app directory for Tailwind classes
    './components/**/*.{js,ts,jsx,tsx}', // Scan components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00ff00', // Green
          secondary: '#000000', // Black
          accent: '#ffffff', // White
        },
      },
    ],
  },
};

export default config;