# babel-plugin-ember-property-computed

Migrate from function prototype fn.property(args) into Ember.computed(args, fn).


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
