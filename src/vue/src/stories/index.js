import { storiesOf } from '@storybook/vue';
import { upperFirst, camelCase } from 'lodash';
import Vue from 'vue';

// Storybook Addons
import { withInfo } from 'storybook-addon-vue-info';

// base app to access default plugins (store, i18n, (@todo router))
import BaseApp from '..';

// parse all .vue files inside src dir
const req = require.context('../', true, /\.vue$/);

req.keys().forEach((filename) => {
  const componentConfig = req(filename);
  const component = componentConfig.default || componentConfig;
  const componentName = component.name || upperFirst(
    camelCase(filename.replace(/^\.\/[\W_]*?/, '').replace(/\.\w+$/, '')),
  );

  const componentStories = component.__stories;
  const componentDoc = component.__docs;

  // console.log({
  //   componentConfig,
  //   component,
  //   componentName,
  //   componentStories,
  //   componentDoc,
  // });

  if (!componentStories) return;

  componentStories.forEach((componentStory) => {
    const story = storiesOf(componentStory.group, module);

    Vue.component(componentName, component);

    const addOptions = {};

    if (componentStory.name === 'moc data') {
      console.log({ componentStory, component });
      console.log(eval(componentStory.props)); // eslint-disable-line no-eval
    }


    // Add `withInfo` addon
    if (withInfo) {
      story.addDecorator(withInfo);
      if (componentDoc) {
        addOptions.info = {
          summary: componentDoc,
        };
      }
    }

    const cpt = {
      store: BaseApp.$store,
      i18n: BaseApp.$i18n,
      components: {
        [componentName]: component,
      },
      template: componentStory.template,
    };

    story.add(componentStory.name, () => cpt, addOptions);
  });
});
