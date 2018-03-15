# {title}

Content files are place in the `./content` folder and can contain both
[Markdown](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)
and [HTML](https://wikipedia.org/wiki/HTML) code regardless of the `.md` or `.html`
file extension.

Each file must also be added to the
[./site_config.js](https://github.com/genielabs/zuix-web-template/blob/master/site_config.js#L1)
configuration file.
This is described in the next chapter.


### Content loading

To open a content in the website the following URL is used:

```
/#[/section_id]/<file_id>
```

For instance, this is the URL to open the *Theme* page: [./#/docs/theme](./#/docs/theme) .
Where `docs` is the `id` assigned to the documentation section and `theme` the `id`
of the *Theme* page.


### Curly braces

A content file may contain `{}` curly braces variables that can be defined
in the `site_config.js` file.

**Example**

```html
The title of this page is
    "{-title}"
and the name of this site is
    "{-strings.title}".
```

**Result**

```html
The title of this page is
    "{title}"
and the name of this site is
    "{strings.title}"
```

If the variable name has the prefix **strings.**, then it will point to values
declared at line [#74](https://github.com/genielabs/zuix-web-template/blob/master/site_config.js#L74)
of the configuration file, otherwise it will reference variables declared
in the `data` object of the current page, like you can see at line
[#26](https://github.com/genielabs/zuix-web-template/blob/master/site_config.js#L23)
for this very page (see the `data.title` field).

Continue reading to the next page for better understanding how the configuration
file works.


### Components and templates

A content file may also include components and templates.

zUIx components and templates aim to transform and enhance functionality
and presentation of the page, or a part of it.

The good thing about using components and templates is that even if you
already filled in and placed all the contents of your website, you can
continue to improve its look, usability and functionality without ever
touching the pages where the content is placed.

This topic is detailed in the [Examples](#/examples/components) section.
