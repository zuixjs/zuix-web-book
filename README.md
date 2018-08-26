## WebBook Template

A ready to use web app template powered by
[zUIx](https://zuixjs.github.io/zuix).
Site structure and content management are based on a simple configuration file.

![LightHouse Score](https://zuixjs.github.io/zuix-web-book/images/lighthouse_score.jpg)


### Features

- Responsive layout design, best fit all device sizes
- Mixed mode content authoring: HTML / Markdown / Front Matter / Swig Templates
- Component-based web development with lazy-loading facility
- Integrated build system and resource packing
- Progressive Web App, also works offline
- Framework agnostic

### Demo & Docs

https://zuixjs.github.io/zuix-web-book


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


## Prerequisites

This project requires [Node.js/npm](https://www.npmjs.com/get-npm) to be installed.


## Installation

Download or clone this repository

     git clone https://github.com/zuixjs/zuix-web-book.git
     cd zuix-web-book.git

Install development dependencies

    npm install


## Build system

This template is based on [zuix-web-starter](https://github.com/zuixjs/zuix-web-starter)
build system.

### Usage

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
See [zuix-web-starter](https://github.com/zuixjs/zuix-web-starter) repository
for all features and documentation of the build system.


![zUIx build system](https://zuixjs.github.io/zuix-web-book/images/gifs/zuix-build.gif)
