# {{data.title}}

<img src="images/banners/side-menu.jpg" alt="cover" class="mdl-shadow--8dp" style="max-width:100%">
<div class="vertical-spacer-16"></div>

The side menu shown on the left is defined in the [./source/site_config.js](./source/site_config.js)
file by the `siteConfig.content` list (array).

Each entry in this list is an object with the following fields: `id`, `template`, `data`
and `list` (optional).

**Example**

```javascript
{
  id: 'about',
  template: 'app/layout/side_menu_item',
  data: {
    title: 'About',
    icon: 'info_outline',
    link: '#/about',
    file: 'content/about.md'
  }
}
```

The `template` field determines how the item is rendered. The item in the example
above is rendered like this:

![](images/menu_template_preview_1.png)

{% raw %}
The `data` field contains properties that can be rendered in the template by
using the double curly braces.
So, for instance, the `data.title` property is rendered by using the
`{{data.title}}` text in the template.

The following templates are currently being used for the side menu:

1) **menu item** [./app/layout/side\_menu\_item](./app/layout/side_menu_item)
```html
<a href="{{data.link}}" {{data.attr}} layout="row center-left">
  <i class="material-icons">{{data.icon}}</i>
  <span>{{data.title}}</span>
</a>
```
2) **sub menu item** [./app/layout/side\_menu\_subitem](./app/layout/side_menu_subitem)
```html
<a href="{{data.link}}" {{data.attr}} class="sub_item" layout="row center-left">
  <span>{{data.title}}</span>
</a>
```
{% endraw %}

The first template contains also a `data.icon` field whose value can be a
  [Material Design Icons](https://material.io/icons/) icon name.
Note that, in order to work, any space character in the name of the icon must be
replaced with the `_` symbol.

The `data.link` property can be a standard url (either absolute or relative) or
it can be a link to an item of the `./source/site_config.js` file.
In this case the link will start with the `#/` character sequence followed
by the `id` of the item to load.

The `data.file` property will point to the content file to load that can be
a standard `.html` file or a `.md` markdown file.

An item can also be a **section** containing other sub-items, in which case the
field `list` will be used to store an array with the items of the section (as
it happens for the *Documentation* section in this side menu).

```javascript
{
  id: 'docs',
  template: 'app/layout/side_menu_item',
  data: {
    title: 'Documentation',
    icon: 'import_contacts',
    link: '#/docs/usage'
  },
  list: [   //   <-- items in this section
    {
      id: 'content_loading',
      template: 'app/layout/side_menu_subitem',
      data: {
        title: 'Content loading',
        link: '#/docs/content_loading',
        file: 'content/docs/content_loading.md'
      }
    },
    {
      id: 'side_menu',
      template: 'app/layout/side_menu_subitem',
      data: {
        title: 'The side menu',
        link: '#/docs/side_menu',
        file: 'content/docs/side_menu.md'
      }
    },
    {
      id: 'theme',
      template: 'app/layout/side_menu_subitem',
      data: {
        title: 'Theme',
        link: '#/docs/theme',
        file: 'content/docs/theme.md'
      }
    },
    {
      id: 'site_bundling',
      template: 'app/layout/side_menu_subitem',
      data: {
        title: 'Bundling',
        link: '#/docs/site_bundling',
        file: 'content/docs/site_bundling.md'
      }
    }
  ]
}
```