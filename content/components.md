# Components


`// TODO: describe components used in this template....`

`// TODO: include media-browser and other zUIx components too`

#### Simple Image Roller/Viewer

<div layout="columns center-center">
<div data-ui-load="https://genielabs.github.io/glabs.it/ui/controllers/image_ticker"
     data-ui-options="contentOptions.imageTicker"
     class="max-width-400">

    <img src="https://picsum.photos/400/300/?image=10"
         data-src-full="https://picsum.photos/1600/1200/?image=10">
    <img src="https://picsum.photos/400/300/?image=20"
         data-src-full="https://picsum.photos/1600/1200/?image=20">
    <img src="https://picsum.photos/400/300/?image=30"
         data-src-full="https://picsum.photos/1600/1200/?image=30">
    <img src="https://picsum.photos/400/300/?image=40"
         data-src-full="https://picsum.photos/1600/1200/?image=40">
    <img src="https://picsum.photos/400/300/?image=50"
         data-src-full="https://picsum.photos/1600/1200/?image=50">
    <img src="https://picsum.photos/400/300/?image=60"
         data-src-full="https://picsum.photos/1600/1200/?image=60">

</div></div>

##### Code

```html

<div layout="columns center-center">
<div data-ui-load="https://genielabs.github.io/glabs.it/ui/controllers/image_ticker"
     data-ui-options="contentOptions.imageTicker"
     class="max-width-400">

    <img src="https://picsum.photos/400/300/?image=10"
         data-src-full="https://picsum.photos/1600/1200/?image=10">
    <img src="https://picsum.photos/400/300/?image=20"
         data-src-full="https://picsum.photos/1600/1200/?image=20">
    <img src="https://picsum.photos/400/300/?image=30"
         data-src-full="https://picsum.photos/1600/1200/?image=30">
    <img src="https://picsum.photos/400/300/?image=40"
         data-src-full="https://picsum.photos/1600/1200/?image=40">
    <img src="https://picsum.photos/400/300/?image=50"
         data-src-full="https://picsum.photos/1600/1200/?image=50">
    <img src="https://picsum.photos/400/300/?image=60"
         data-src-full="https://picsum.photos/1600/1200/?image=60">

</div></div>
```


# Templates

#### Material Design Card

<div data-ui-include="app/templates/mdl_card"
     data-ui-context="my-card-1">
    <img data-ui-field="image" src="https://tfirdaus.github.io/mdl/images/laptop.jpg">
    <h1 data-ui-field="title">Leraning Web Design</h1>
    <div data-ui-field="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam accusamus, consectetur.</p>
    </div>
    <a data-ui-field="link_read" href="./#/about">Read More</a>
</div>

##### Code

HTML

```html
<div data-ui-include="app/templates/mdl_card">
    <img data-ui-field="image" src="https://tfirdaus.github.io/mdl/images/laptop.jpg">
    <h1 data-ui-field="title">Leraning Web Design</h1>
    <div data-ui-field="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam accusamus, consectetur.</p>
    </div>
    <a data-ui-field="link_read" href="./#/about">Read More</a>
</div>
```

or providing the JSON model

```html
<div data-ui-include="app/templates/mdl_card"
     data-ui-options="cardOptions"><script>
cardOptions = { model: {
    image: 'https://tfirdaus.github.io/mdl/images/laptop.jpg',
    title: 'Test JS model',
    text: '<p>Lorem ipsum dolor sit amet...</p>',
    link_read: '/#/docs/side_menu'
}};
</script></div>
```

and for changing the template data model at runtime

```javascript
zuix.context('my-card-1').model({
    image: 'https://tfirdaus.github.io/mdl/images/laptop.jpg',
    title: 'Test JS model',
    text: '<p>Lorem ipsum dolor sit amet...</p>',
    link_read: '/#/docs/side_menu'
});
```

<div layout="row center-left">
    <form action="#">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <label class="mdl-textfield__label">Enter a new title</label>
        <input data-ui-field="card-template-demo-title" class="mdl-textfield__input" type="text" value="Hello world!">
      </div>
    </form>
    <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
       href="javascript:card_template_demo_1()">Change title</a>
</div>
<script>
function card_template_demo_1() {
    var titleInput = zuix.field('card-template-demo-title').value();
    var card = zuix.context('my-card-1');
    card.model({
        title: titleInput
    });
    scrollTo(card.view(), 500);
}
</script>
