const axios = require('axios').default;

module.exports.parse = token => {
  const nameRE = /[^\s]+/;
  const valueRE = /'([^']+)'/;

  let match = nameRE.exec(token.args);
  if (match) this.name = match[0];

  match = valueRE.exec(token.args);
  if (match) this.value = match[1];
}

module.exports.render = ctx => {
  return axios.get(this.value).then(response => {
    ctx.front()[this.name] = response.data;
  });
}
