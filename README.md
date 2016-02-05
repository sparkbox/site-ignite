# Site Igniter

Site Igniter is a GUI wrapper around the Sparkbox static template build process. 

## Requirements

Site Igniter requires a few things:

- [node](https://nodejs.org/en/download/) must be installed, this gives us `node` and `npm`.
- There must be a valid `package.json` file in the root of the project. It must also define a `start` [npm script](https://docs.npmjs.com/misc/scripts).
- The output of the `start` script should contain the port that the server is running on. Something like:
`The app is running on localhost:3000`.

## How it works

Site Igniter is a giant drag and drop target. To get started you drag the project directory onto the window.

Once the app recognizes your project it will find and parse the `package.json` file for the dependencies to install and the command to start the app.

## Development

Site Igniter is an [Electron](http://electron.atom.io) app that uses [React](http://facebook.github.io/react/) for all it's views. It uses [SCSS](http://sass-lang.com) for generating CSS. We also use [Webpack](https://webpack.github.io) which lets us use ES6.

- `npm start` should compile new JS and CSS and start watching the JS for new changes.

- `npm rebuild` will run the [`electron-rebuild` command](https://github.com/electronjs/electron-rebuild).

- `npm package` will generate a built app file for Mac OS X.
