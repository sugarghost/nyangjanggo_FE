const colors = require('windicss/colors');
const lineClamp = require('windicss/plugin/line-clamp');
const typography = require('windicss/plugin/typography');

module.exports = {
  darkMode: 'class',
  plugins: [typography, lineClamp],
  theme: {
    extend: {
      colors: {
        main: '235,49,32', // #EB3120
        title: '63,63,63', // #3F3F3F
        context: '103,103,103', // #676767
        subContext: '154,154,154', // #9A9A9A
        box: '239,239,240', // #EFEFF0
        empty: '217,217,217', // #CCCCCC
        teal: colors.teal,
      },
    },
  },
};
