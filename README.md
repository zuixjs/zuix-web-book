## Website Template

This is a ready to use website template powered by **zUIx**.
Its structure and content management are based on a simple configuration file.

Setup and usage of this template require only basic web development
knowledge and zero server-side scripting.

Feel free to use and abuse this template for your next website **: )**

### Features

- Responsive design, best fit all device sizes
- Supports markdown and configurable braces **{variables}**
- The whole site can be bundled into a single file
  and also run locally without a web server
- PWA friendly
- Includes following products
    - Material Design Lite<br/>
      [https://getmdl.io](https://getmdl.io)
    - Flex Layout Attribute (FLA)<br/>
      [http://progressivered.com/fla](http://progressivered.com/fla)
    - AnimateCSS<br/>
      [https://daneden.github.io/animate.css](https://daneden.github.io/animate.css)
    - Showdown<br/>
      [http://showdownjs.com](http://showdownjs.com)
    - Prism<br/>
      [http://prismjs.com](http://prismjs.com)
    - ...and off course zUIx :)<br/>
      [http://zuix.it](http://zuix.it)

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

See [zuix-web-starter](https://github.com/genemars/zuix-web-starter) website for all options.