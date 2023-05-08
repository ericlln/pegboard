/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./node_modules/flowbite-react/**/*.js',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
	],
	theme: {
		colors: {
			background: '#DCEED1',
			'pale-blue': '#7697d6',
			'pale-purple': '#E5D9F2',
			gunmetal: '#253237',
			'ash-gray': '#AAC0AA',
			'off-white': '#f2f3f4',
			viridian: '#417B5A',
		},
		fontFamily: {
			Inter: ['Inter', 'sans-serif'],
			Lexend: ['Lexend', 'sans-serif'],
		},
		extend: {
			animation: {
				shortpulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
