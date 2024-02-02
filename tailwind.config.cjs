/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{html,js,vue}"],
	theme: {
		extend: {
			screens: {
				'3xl': '2560px',
			},
		},
	},
	plugins: [],
};
