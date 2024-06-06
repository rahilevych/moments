module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // укажите путь к вашим файлам
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
