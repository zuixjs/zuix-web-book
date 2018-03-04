# Usage

The content index shown in the left panel is defined by the
[./site_config.js](./site_config.js) file.

Each item is defined by three fields: `id`, `template` and `data`.

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

The `template` field determines how the item is rendered.

The `data` field contains properties that can be rendered in the template by
using the curly braces. So, for instance, the `data.title` property is rendered
by using the `{title}` text in the template.

These two templates are currently available:

1) **menu item** [./app/layout/side\_menu\_item](./app/layout/side_menu_item)
```html
<a href="{link}" {attr} layout="row center-left">
    <i class="material-icons">{icon}</i>
    <span>{title}</span>
</a>
```
2) **sub menu item** [./app/layout/side\_menu\_subitem](./app/layout/side_menu_subitem)
```html
<a href="{link}" {attr} class="sub_item" layout="row center-left">
    <span>{title}</span>
</a>
```

The **menu item** template is using [Material Design Icons](https://material.io/icons/) for the `data.icon`
property. See the linked site for a list of all available icons. Note that any space
character in the name of the icon must be replaced with the `_` symbol.

The `data.link` property.... `// TODO: ...` ...

The `data.file` property.... `// TODO: ...` ...

## Content management

`// TODO: how to edit/add content`

`// TODO: content capabilities: mixed markdown-html, material design components and icons, prism, zUIx components, ...`

## Bundling

`// TODO: how to bundle website into a single file`