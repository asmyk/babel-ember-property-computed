# babel-plugin-ember-property-computed

Migrate from function prototype fn.property(args) into Ember.computed(args, fn).

Convert computed properties into Ember.computed() to not use prototype anymore. This plugin can be used along with Webpack and other babel plugins just to test in dev server. If you want to overwrite existing files, you can execute this plugin in Node env as well.

## Example

**In**

```js
fullname: function () {
  return `${this.firstName} ${this.lastName}`;
}.property("firstName", "lastName")
```

**Out**

```js
fullname: Ember.computed("firstName", "lastName", function () {
  return `${this.firstName} ${this.lastName}`;
})
```

## Installation

```sh
$ npm install babel-plugin-ember-property-computed
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["ember-property-computed"]
}
```

### Via CLI

```sh
$ babel --plugins ember-property-computed script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["ember-property-computed"]
});
```

sample traverse script

```javascript
const fs = require("fs"),
  path = require("path"),
  babel = require('babel-core');

// transform only .js files
const onlyJSFiles = (name) => /\.js$/.test(name);

function traverse(dir, callback, fileFilter) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      var filepath = path.join(dir, file);
      fs.stat(filepath, function (err, stats) {
        if (stats.isDirectory()) {
          traverse(filepath, callback, fileFilter);
        } else if (stats.isFile() && fileFilter(filepath)) {
          callback(filepath, stats);
        }
      });
    });
  });
}


const manageFile = (filepath) => fs.readFile(filepath, function (err, data) {
  if (err) throw err;

  // convert from a buffer to a string
  var src = data.toString();

  // use our plugin to transform the source
  var out = babel.transform(src, {
    plugins: ["ember-property-computed"]
  });

  // print the generated code to screen
  // implement save code to files - replace original one or create a new one.
  // for this case I don't overwrite existing ones. Just create a new transformed file.
  // I decided to not overwrite anything to avoid unexpected problems.
  fs.writeFile(filepath + "_new.js", out.code, function (err) {
    if (err) throw err;
  }) 
});


traverse("./app/components", manageFile, onlyJSFiles);
```
