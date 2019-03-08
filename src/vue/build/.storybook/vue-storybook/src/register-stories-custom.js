const Vue = require("vue").default;
const upperFirst = require("lodash").upperFirst;
const camelCase = require("lodash").camelCase;
// import { /* configure, */ addDecorator } from '@storybook/vue';


// import i18n from '../../../../../src/plugins/i18n';
// import store from '../../../../../src/store';
// import App from '../../../../../src';
// console.log(App);

// import '../../../../../src/assets/styles/main.styl'

export default function registerStories(req, fileName, sbInstance, plugins, extensions) {
  const {
    action,
    withNotes,
    text,
    boolean,
    number,
    color,
    object,
    array,
    select,
    date,
    withKnobs,
    withInfo,
  } = plugins;
  const componentConfig = req(fileName);
  const componentName = componentConfig.default.name || upperFirst(
    camelCase(fileName.replace(/^\.\/[\W_]*?/, "").replace(/\.\w+$/, ""))
  );
  const stories =
    componentConfig.__stories || componentConfig.default.__stories;
  
  if (!stories) return;

  // addDecorator(withInfo)

  stories.forEach(story => {
    console.log({story});
    

    let storiesOf = sbInstance(story.group, module);
    
    const component = componentConfig.default || componentConfig
    const componentDoc = component.__docs

    Vue.component(componentName, component);

    let addOptions = {};

    if(withInfo){
      storiesOf.addDecorator(withInfo) 

      if(componentDoc){
        addOptions.info = {
          summary: componentDoc
        }
      }
    }
    
    const cpt = {
      components: {
        [componentName] : component
      },
      template: story.template,
    }

    storiesOf.add(story.name, () => cpt, addOptions);


    // let addFunc;
    // let addOptions = {};
    // let baseFunc = () => {
    //   let data = story.knobs ? eval(`(${story.knobs})`) : {};
    //   return {
    //     ...extensions,
    //     component: {
    //       componentName : componentConfig.default || componentConfig
    //     },
    //     data() {
    //       return data;
    //     },
    //     template: story.template,
    //     methods: eval(`(${story.methods})`)
    //   };
    // };

    // story.notes
    //   ? (addFunc = withNotes(story.notes)(baseFunc))
    //   : (addFunc = baseFunc);

    // story.knobs ? storiesOf.addDecorator(withKnobs) : false;

    // console.log({stories, story, plugins, withInfo});
    
    // if(withInfo){
    //   console.log('add withinfo');
      
    //   storiesOf.addDecorator(withInfo)
    //   addOptions.info = {
    //     header: false,
    //     // summary: MyButton.__docs,
    //   }
    // }

    // storiesOf.add(story.name, addFunc, addOptions);

    // Vue.component(componentName, componentConfig.default || componentConfig);
  });
}
