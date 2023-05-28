/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: ["winter", "night"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",   
    darkTheme: "night" 
  },
};
