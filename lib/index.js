const { Liquid } = require('liquidjs');
const mjml2html = require('mjml');

module.exports = async (template, options = {}) => {
  const engine = new Liquid(options.liquid);

  engine.registerTag('import', require('./tags/import'));

  let html = await engine.parseAndRender(template);

  if (options.mjml) {
    const result = mjml2html(html);
    html = result.html;
  }

  return html;
}
