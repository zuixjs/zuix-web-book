## WebBook Template

This is a ready to use webapp template powered by
[zUIx](https://genielabs.github.io/zuix).
Its structure and content management are based on a simple configuration file.

![LightHouse Score](https://genielabs.github.io/zuix-web-book/images/lighthouse_score.png)

### Features

- Responsive design, best fit all device sizes
- Markdown, Front Matter, Swig Templates
- Component-based web development
- Integrated build system with resource packing
- Progressive Web App, can also work offline
- Also featuring
    - Material Design Lite<br/>
      [https://getmdl.io](https://getmdl.io)
    - Flex Layout Attribute (FLA)<br/>
      [http://progressivered.com/fla](http://progressivered.com/fla)
    - AnimateCSS<br/>
      [https://daneden.github.io/animate.css](https://daneden.github.io/animate.css)
    - Prism<br/>
      [http://prismjs.com](http://prismjs.com)
    - ...and off course zUIx for component-based development :)<br/>
      [http://zuix.it](https://genielabs.github.io/zuix)

<!-- TODO: wip - Generated application consist of a single .html file that can be opened locally, without a web server -->

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

This template is built on [zuix-web-starter](https://github.com/genemars/zuix-web-starter),
see its repository for all features and documentation.
