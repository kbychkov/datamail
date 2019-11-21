const axios = require('axios').default;
const { Liquid } = require('liquidjs');
const mjml2html = require('mjml');

module.exports = async (template, options = {}) => {
  const engine = new Liquid();

  engine.registerTag('import', {
    parse: function(token) {
      const nameRE = /[^\s]+/;
      const valueRE = /'([^']+)'/;

      let match = nameRE.exec(token.args);
      if (match) this.name = match[0];

      match = valueRE.exec(token.args);
      if (match) this.value = match[1];
    },
    render: function(ctx) {
      return axios.get(this.value).then(response => {
        ctx.front()[this.name] = response.data;
      });
    }
  });

  let html = await engine.parseAndRender(template);

  if (options.mjml) {
    const result = mjml2html(html);
    html = result.html;
  }

  return html;
}
