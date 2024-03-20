import type { Config } from 'tailwindcss'
const withMT = require("@material-tailwind/react/utils/withMT");


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    extend: {
      colors: {
        'cord-fundo': '#091B2A',
        'cor-components': '#00A3E9',
        'cor-texto-principal': '#0393D2',
      },
      width: {
        '128': '32rem',
        '120': '30rem',
        '100': '27rem',
      },
      height: {
        '128': '32rem',
        '120': '30rem',
        '100': '27rem',
      },
    },
    fontFamily: {
      
    },
  },
  plugins: [],
}
module.exports = withMT(config);
