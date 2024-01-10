import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        selectionbg: 'rgb(96 105 119 / 60%)',
      },
      boxShadow: { list: '0 4px 8px 0 rgba(0,0,0,.05)' },
      fontSize: {
        xxs: ['0.5rem', '0.5rem'],
      },
    },
  },
  plugins: [],
};
export default config;
