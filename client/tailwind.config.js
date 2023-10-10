/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: () => ({
			primary: {
				default: "#fafafa",
				hover: "#e3e3e3",
			},
			accent: {
				default: "#ff8200",
				hover: "#cc6800",
			},
			background: {
				default: "#282828",
				hover: "#545454",
			},
		}),
		extend: {
			fontFamily: {
				libre: ['"Questrial"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
