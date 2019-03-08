const loaderUtils = require('loader-utils');
const serialize = require('serialize-javascript');

function generateCode(source, ctx) {
  let code = '';
  const options = loaderUtils.parseQuery(ctx.resourceQuery || '');
  const { group, name, other } = options;

  const story = {
    template: source.trim(),
    name: name || '',
    group: group || 'Stories',
    methods: options.methods,
    notes: options.notes,
    knobs: options.knobs,
    ...other,
  };

  code += `function (Component) {
    Component.options.__stories = Component.options.__stories || []
    Component.options.__stories.push(${serialize(story)})
  }\n`;
  return code;
}

module.exports = function (source) { // eslint-disable-line func-names
  const story = generateCode(source, this);
  this.callback(null, `module.exports = ${story}`);
};
