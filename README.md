## WebBook Template

A ready to use web app template powered by
[zUIx](https://genielabs.github.io/zuix).
Site structure and content management are based on a simple configuration file.

![LightHouse Score](https://genielabs.github.io/zuix-web-book/images/lighthouse_score.png)


### Features

- Responsive layout design, best fit all device sizes
- Mixed mode content authoring: HTML / Markdown / Front Matter / Swig Templates
- Component-based web development with lazy-loading facility
- Integrated build system and resource packing
- Progressive Web App, also works offline
- Framework agnostic


### UI Setup

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


## Prerequisites

This project requires [Node.js/npm](https://www.npmjs.com/get-npm) to be installed.


### Usage

Download or clone this repository

     git clone https://github.com/genielabs/zuix-web-template.git
     cd zuix-web-template.git

Install development dependencies

    npm install

Start local web server

    npm start

Start auto-rebuild script (watch file tree for changes and auto-rebuild)

    npm run watch

Manual building

    npm run build

website source files are located in the `./source` folder and are
generated in the `./docs` folder.
This setting can be changed by modifying the `./config/default.json` file.


![zUIx build system](https://genielabs.github.io/zuix-web-book/images/gifs/zuix-build.gif)


This template is built on [zuix-web-starter](https://github.com/genemars/zuix-web-starter)
build system. See its repository for all features and documentation.
