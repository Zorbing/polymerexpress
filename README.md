# PolymerExpress


## Setup

Intall all dependencies of the repository (including the ones from bower):

```
$ npm install
```

For simpler use in development, it is recommended to install `polymer-cli` and `bower` globally:

```
$ npm install -g bower polymer-cli
```

Otherwise you have to write `./node_modules/.bin/polymer` instead of just `polymer` for each of the following commands.


## Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL routing for the app:

```
$ polymer serve --open
```


## Build your application

```
$ polymer build
```

This will create a `build/` folder with `bundled/` and `unbundled/` sub-folders containing a bundled (Vulcanized) and unbundled builds, both run through HTML, CSS, and JS optimizers.

You can serve the built versions by giving `polymer serve` a folder to serve from:

```
$ polymer serve build/bundled
```

## Run tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester).
Run `polymer test` to run your application's test suite locally.

Test test only Google Chrome, type:
```
$ polymer test -l chrome
```
