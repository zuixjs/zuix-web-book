# {title}

Content files are place in the `./content` folder and can contain both
[Markdown](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)
and [HTML](https://wikipedia.org/wiki/HTML) code despite of the `.md` or `.html`
file extension.

Each file must also be added to the [./site_config.js](./site_config.js) configuration file.
This is described in the next chapter.


### Content loading

To open a content in the website the following URL is used:

```javascript
/#[/section_id]/<file_id>
```

For instance, this is the URL to open the *Theme* page: [/#/docs/theme](/#/docs/theme) .
Where `docs` is the `id` assigned to the documentation section and `theme` the `id`
of the *Theme* page.
