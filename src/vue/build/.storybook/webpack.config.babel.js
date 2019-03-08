/**
 * custom webpack config
 * note that because we use vue-storybook, we don't use our `webpack/vue` config but a custom one
 */
import WebpackMerge from 'webpack-merge';
import { storyLoader } from './vue-storybook';
import baseConfig from '../webpack/base';
import generateJsConfig from '../webpack/javascript';
import generateCssConfig from '../webpack/styles';
import WebpackHelper from '../webpack/_helper';

const jsConfig = generateJsConfig({
  babel: true,
  eslint: true,
});

const cssConfig = generateCssConfig({
  stylus: true,
  includeCSSPaths: [
    `${WebpackHelper.DIRS.NODE_MODULES}swiper/dist/css/`,
  ],
});




/* build our filan config */
const finalConfig = WebpackMerge(
  {
    node: {
      fs: 'empty'
    },
    resolve:{
      extensions: ['.vue'],
      alias: {
        plugins: `${WebpackHelper.DIRS.SRC}plugins`,
        store: `${WebpackHelper.DIRS.SRC}store`,
        router: `${WebpackHelper.DIRS.SRC}router`,
        routes: `${WebpackHelper.DIRS.ROOT}src/routes.json`,
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'storybook-addon-vue-info/loader',
          enforce: 'post'
        },
        {
          resourceQuery: /blockType=story/,
          loader: storyLoader
        },
        {
          resourceQuery: /blockType=docs/,
          use: [
            'storybook-readme/env/vue/docs-loader',
            'html-loader',
            'markdown-loader',
          ],
        },
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@kazupon/vue-i18n-loader',
        },
      ]
    }
  },
  baseConfig,
  jsConfig,
  cssConfig,
);

// console.log(finalConfig.resolve);


module.exports = finalConfig;
