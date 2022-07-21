const colors = require('windicss/colors');
const typography = require('windicss/plugin/typography');

module.exports = {
  darkMode: 'class',
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        main: 'EB3120',
        title: '3F3F3F',
        context: '676767',
        subContext: '9A9A9A',
        box: 'EFEFF0',
        empty: 'D9D9D9',
        teal: colors.teal,
      },
    },
  },
};
