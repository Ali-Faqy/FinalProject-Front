/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'muted-foreground': 'hsl(var(--muted-foreground, 240 5% 64%))',
      },
    },
  },
  plugins: [],
}
