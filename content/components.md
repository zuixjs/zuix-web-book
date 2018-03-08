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

<div data-ui-include="app/templates/mdl_card">
    <img data-ui-field="image" src="https://tfirdaus.github.io/mdl/images/laptop.jpg">
    <h1 data-ui-field="title">Leraning Web Design</h1>
    <div data-ui-field="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam accusamus, consectetur.</p>
    </div>
    <a data-ui-field="link-read" href="./#/about">Read More</a>
</div>

##### Code

```html
<div data-ui-include="app/templates/mdl_card">
    <img data-ui-field="image" src="https://tfirdaus.github.io/mdl/images/laptop.jpg">
    <h1 data-ui-field="title">Leraning Web Design</h1>
    <div data-ui-field="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam accusamus, consectetur.</p>
    </div>
    <a data-ui-field="link-read" href="./#/about">Read More</a>
</div>
```
