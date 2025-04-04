import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			primary: 'var(--primary)',
  			secondary: 'var(--secondary)',
  			text: 'var(--text)',
  			success: 'var(--success)',
  			info: 'var(--info)',
  			warning: 'var(--warning)',
  			danger: 'var(--danger)',
  			"accent-primary": 'var(--accent-primary)',
  		},
  		fontFamily: {
  			jakarta: [
  				'Plus Jakarta Sans',
  				'sans-serif'
  			]
  		},
  	}
  },
  plugins: [heroui(), require("tailwindcss-animate")],
};
