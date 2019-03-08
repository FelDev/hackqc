// exemple from https://github.com/storybooks/storybook/tree/next/examples/vue-kitchen-sink
import { configure, addDecorator } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';

import { withInfo, setDefaults } from 'storybook-addon-vue-info';
import { storiesOf } from "@storybook/vue";
// import { registerStories } from "./vue-storybook";



import Vue from 'vue';

/**
 * Extend UI options
 * @see https://www.npmjs.com/package/@storybook/addon-options
 * @todo dynamic name and url ?
 */
addDecorator(
  withOptions({
    name: 'Project\'s components',
    url: 'http://localhost:3000',
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\//,
    addonPanelInRight: true,
  })
);
setDefaults({
  header: false
})

// You can require as many stories as you need.
function loadStories() {
  require('../../src/stories');

  // const req = require.context("../../src/components/ui", true, /\.vue$/);
  // req.keys().forEach(filename => {
  //   // The last argument here is an object containing ALL of the plugins you've used in your SFC.
  //   registerStories.default(req, filename, storiesOf, {
  //     // withKnobs,
  //     // withNotes,
  //     // action,
  //     // text
  //     withInfo
  //   });
  // });

  // // const req = require.context('../src/stories', true, /\.stories\.js$/);
  // // req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
