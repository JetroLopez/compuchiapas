import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Compuchiapas colors
				tech: {
					blue: "#0066FF",
					lightGray: "#F5F7FA",
					gray: "#2D3748",
					orange: "#FF6B00"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				fadeUp: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				gradientShift: {
					"0%, 100%": {
						"background-position": "0% 50%",
					},
					"50%": {
						"background-position": "100% 50%",
					},
				},
				pulseSlow: {
					"0%, 100%": {
						opacity: "0.4",
					},
					"50%": {
						opacity: "0.7",
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				"fade-up": "fadeUp 0.5s ease-out forwards",
				"fade-in": "fadeIn 0.3s ease-out forwards",
				"gradient-shift": "gradientShift 8s ease infinite",
				"pulse-slow": "pulseSlow 4s ease-in-out infinite",
			},
			boxShadow: {
				glow: "0 0 15px rgba(0, 102, 255, 0.5)",
				"glow-light": "0 0 15px rgba(255, 255, 255, 0.5)",
			},
			textShadow: {
				sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
				light: "0 1px 2px rgba(255, 255, 255, 0.5)",
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography'),
		function ({ addUtilities }: { addUtilities: Function }) {
			const newUtilities = {
				".text-shadow-sm": {
					textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
				},
				".text-shadow-light": {
					textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",
				},
				".holographic-text": {
					background: "linear-gradient(45deg, #0066FF, #00D1FF, #0066FF)",
					backgroundSize: "200% 200%",
					animation: "gradientShift 8s ease infinite",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					textShadow: "0 2px 4px rgba(0, 102, 255, 0.3)",
				},
			};
			addUtilities(newUtilities);
		},
	],
} satisfies Config;

export default config;
