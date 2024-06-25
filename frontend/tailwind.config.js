/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-green': '#ccd5ae',
        'soft-cream': '#dad7cd',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        "hero-image":
        'url("https://images.unsplash.com/photo-1494949649109-ecfc3b8c35df?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
      gradientColorStops: theme => ({
        'opacity-green': `${theme('colors.light-green')}CC`,
        'opacity-cream': `${theme('colors.soft-cream')}CC`, 
      }),
    },
  },
  plugins: [],
};
