# DataMail

[![npm](https://img.shields.io/npm/v/datamail)](https://www.npmjs.com/package/datamail)

Build data-driven emails using [Liquid](https://shopify.github.io/liquid/) template engine and [MJML](https://mjml.io/). This is a small library to render HTML from Liquid templates populated with data from any public API.

## Usage

Install the package globally:

```bash
npm install -g datamail
```

Then use the command to render a HTML from a template file:

```bash
datamail template.liquid
```

This will generate the HTML file and put it next to the provided template. You can use clear HTML in templates but DataMail was initially developed for emails therefore it understands MJML out of the box. The following example will get data from [GitHub API](https://developer.github.com/v3/) and render HTML with the search results.

```html
{% import repositories from 'https://api.github.com/search/repositories?q=liquid+template+engine&per_page=5' %}

<mjml>
  <mj-body>
    <mj-section background-color="#fff">
      <mj-column>
        <mj-text font-size="20px">Top 5 Liquid Template Engines on GitHub</mj-text>

        {% for item in repositories.items %}
          <mj-text><a href="{{ item.url }}">{{ item.full_name }}</a></mj-text>
          <mj-text padding-top="0">{{ item.description }}</mj-text>
        {% endfor %}
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

## License

This project is available under the [MIT License](https://github.com/kbychkov/dailychart/blob/master/LICENSE).
