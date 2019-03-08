const path = require('path');

/**
 * allow to use es6 even for server side
 * because of babel 7 : https://github.com/webpack/webpack/issues/1403#issuecomment-298977079
 */
require('@babel/register')({
  only: [
    __dirname,
    path.join(__dirname, '/../'),
    path.join(__dirname, '/../webpack/')
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
});

// Now, load our entrypoint `webpack.config.js` - will be overided by some `${stack}/build/webpack.config.js` one
module.exports = require('./webpack.config.babel');
