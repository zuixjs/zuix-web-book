# {{data.title}}

<img src="images/banners/content-files.jpg" alt="cover" class="mdl-shadow--8dp" style="max-width:100%">
<div class="vertical-spacer-16"></div>

Content files are place in the `./content` folder and can contain both
[Markdown](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)
and [HTML](https://wikipedia.org/wiki/HTML) code regardless of the `.md` or `.html`
file extension.

In order to be visible in the side menu, each file must also be added to the
[./site_config.js](https://github.com/genielabs/zuix-web-template/blob/master/site_config.js#L1)
configuration file, which is described in the next chapter.


### Content loading

To open a content in the website the following URL is used:

```
/#[/section_id]/<file_id>
```

For instance, this is the URL to open the *Theme* page: [./#/docs/theme](./#/docs/theme) .
Where `docs` is the `id` assigned to the documentation section and `theme` the `id`
of the *Theme* page.


### Curly braces

{% raw %}
A content file may contain `{{}}` curly braces variables that can be defined
in the `site_config.js` file.
{% endraw %}

**Example**

{% raw %}
```html
The title of this page is
    "{{data.title}}"
and the name of this site is
    "{{app.title}}".
```
{% endraw %}

**Result**

```html
The title of this page is
    "{{data.title}}"
and the name of this site is
    "{{app.title}}"
```

Variables with the prefix **data.** are defined in the **./source/site_config.js** file,
while vars starting with **app.** prefix are defined in the **./config/default.js** file.


### Components and templates

A content file may also include components and templates.

zUIx components and templates aim to transform and enhance functionality
and presentation of the page, or a part of it.

The good thing about using components and templates is that even if you
already filled in and placed all the contents of your website, you can
continue to improve its look, usability and functionality without ever
touching the pages where the content is placed.

Refer to [zUIx](https://genielabs.github.io/zuix) website for
a complete documentation about this topic.
