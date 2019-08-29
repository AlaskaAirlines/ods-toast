<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-toast.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-toast)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/ods-toast.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/ods-toast.svg?color=blue)

# \<ods-toast>

\<ods-toast> is a wrapper component for a HTML \<toast> element containing styling and behavior.

## Docs

All information regarding Project Setup, Technical Details, Tests and information regarding ODS Stateless Components can be found in the [./docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/tree/master/docs) repository.

## Install

```shell
$ npm i @alaskaairux/ods-toast
```

## Toaster

It is recommended that you use the bundled [Toaster.js](docs/Toaster.md) tool to display and manage toasts on a given screen. [Toaster.js](docs/Toaster.md) is a optional utility class containing logic for managing toasts.

### Design Token CSS Custom Property dependency

The use of any ODS Component has a dependency on the [ODS Design Tokens (npm install)](https://www.npmjs.com/package/@alaskaairux/orion-design-tokens). See repository and API information [here](https://github.com/AlaskaAirlines/OrionDesignTokens).

For additional details in regards to using Orion Design Tokens with components, please see [./docs/TECH_DETAILS.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/TECH_DETAILS.md)

### CSS Custom Property fallbacks

CSS Custom Properties are not supported in older browsers. For this, fallback properties are pre-generated and included with the npm. Any update to the Orion Design Tokens will be immediately reflected with browsers that support CSS Custom Properties, legacy browsers will require updated components with pre-generated fallback properties.

**Reference component in HTML**

```html
<ods-toast title="This is the title"></ods-toast>
```

## Element \<ods-toast>

```javascript
class Odstoast extends LitElement
```

### Toast use cases

The \<ods-toast> element should be used in situations where users may:

- be alerted of successful actions

### Properties:

| Attribute | Value type   | Description                                             |
| --------- | ------------ | ------------------------------------------------------- |
| title     | string       | large bold-faced text at the top of the toast component |
| message   | string, null | smaller text that appears below the title               |

### API Code Examples

Default toast

```html
<ods-toast title="This is a toast"></ods-toast>
```

Toast with slotting

```html
<ods-toast title="This is a toast" message="This is the message">
  <button>Click me!</button>
  <button>No, click me!</button>
</ods-toast>
```

### Custom callbacks

### onClick

`onClick` is a callback that is fired when a user clicks on the toast component.

```html
<ods-toast id="toast" title="This is the title"></ods-toast>
```

```javascript
const toast = document.querySelector("#toast");
toast.onClick = () => {
  alert("I have been clicked");
};
```

## onDestroy

`onDestroy` is a callback that is fired when a user clicks on the X icon of a toast component.

```html
<ods-toast id="toast" title="This is the title"></ods-toast>
```

```javascript
const toast = document.querySelector("#toast");
toast.onDestroy = () => {
  alert("I have been clicked");
};
```

## Alternate build solutions

Included with the distributed npm are two additional directories, `./altImportsCanonical` and `./altImportsVariable`.

| directory            | description                                                   |
| -------------------- | ------------------------------------------------------------- |
| altImportsCanonical† | Sass using canonical values within the scope of the file      |
| altImportsVariable\* | Sass using CSS Custom Properties within the scope of the file |

† Using canonical CSS properties breaks inheritance chain from Orion Design Tokens

\* Orion Design Tokens are required to import any file using CSS Custom Properties. Also see Orion Design Tokens [pre-processed resources](https://github.com/AlaskaAirlines/OrionDesignTokens#install-pre-processed-resources). PostCSS using `postcss-custom-properties` will need to be added to your project if you are supporting legacy browsers.

Within the respective directories is the `style_clean.scss` file.

```bash
├── altImports
|  ├── canonical
|  |  ├── style.css
|  |  └── style_clean.scss
|  └── variable
|     ├── style.css
|     └── style_clean.scss
```

It is highly recommended that you import the `style_clean.scss` this into a name-space as not to create style collisions. For example:

```scss
.ods-toast {
  @import "./node_modules/@alaskaairux/ods-toast/altImports/variable/style_clean.scss";
}
```

This pattern will produce all the selectors within `style_clean.scss` with the prefixed selector.

```scss
.ods-toast .toast {
  display: var(--ods-toast-display);
  font-family: var(--ods-toast-font-family);
  border-width: var(--ods-toast-border-width);
  border-radius: var(--ods-toast-border-radius);
  ...
}
```

**Warning!** Using the canonical CSS will break the chain of using Design Tokens. If Tokens are updated, this will require the update of the components and their canonical output. Use with caution.

##

Alaska Airlines Orion Design System<br>
Copyright 2019 Alaska Airlines, Inc. or its affiliates. All Rights Reserved.
