# {{data.title}}

<img src="images/banners/about.jpg" alt="cover" class="mdl-shadow--8dp" style="max-width:100%">
<div class="vertical-spacer-16"></div>

A ready to use web app template powered by
[zUIx](https://genielabs.github.io/zuix).
Site structure and content management are based on a simple configuration file.

### Features

- Responsive layout design, best fit all device sizes
- Mixed mode content authoring: HTML / Markdown / Front Matter / Swig Templates
- Component-based web development with lazy-loading facility
- Integrated build system and resource packing
- Progressive Web App, also works offline
- Framework agnostic

### UI setup

#### Layout & Animations

- Flex Layout Attribute (FLA)<br/>
  [http://progressivered.com/fla](http://progressivered.com/fla)
- AnimateCSS<br/>
  [https://daneden.github.io/animate.css](https://daneden.github.io/animate.css)

#### User Interface

The following libraries are installed by default but feel free to replace
them with your favourite ones.

- Material Design Lite<br/>
  [https://getmdl.io](https://getmdl.io)
- Prism<br/>
  [http://prismjs.com](http://prismjs.com)


### Installation

Download or clone this repository

     git clone https://github.com/genielabs/zuix-web-book.git
     cd zuix-web-book.git

Install development dependencies

    npm install


### Build system

This template is based on [zuix-web-starter](https://github.com/genemars/zuix-web-starter)
build system.

#### Usage

Start local web server

    npm start

Start auto-build script (watch file tree for changes and auto-rebuild)

    npm run watch

Or manual building

    npm run build

website source files are located in the `./source` folder and are
generated in the `./docs` folder.
This setting can be changed by modifying the `./config/default.json` file.


### Configuration options

The default configuration is read from `config/default.json`:
See [zuix-web-starter](https://github.com/genemars/zuix-web-starter) repository
for all features and documentation.


### Lighthouse PWA report

![LightHouse Score](https://genielabs.github.io/zuix-web-book/images/lighthouse_score.jpg)

### Got any question or request?

File a ticket via the repository [issue tracker](https://github.com/genielabs/zuix-web-template/issues).
