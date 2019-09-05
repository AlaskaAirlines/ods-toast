<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-toast.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-toast)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/ods-toast.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/ods-toast.svg?color=blue)

# \<ods-toast>

\<ods-toast> is custom functional web component for the purpose of exposing a user feedback interface.

## Docs

All information regarding Project Setup, Technical Details, Tests and information regarding ODS Stateless Components can be found in the [./docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/tree/master/docs) repository.

## Install

```shell
$ npm i @alaskaairux/ods-toast
```

### Toaster.js

Use the bundled [Toaster.js](docs/Toaster.md) tool to display and manage toasts in a given interface. This dependency isn't built into the scope of the component in order to allow for consuming projects to bundle it with other project dependencies as needed.

Toaster.js is an optional--but highly recommended--utility class containing logic to manage toasts. If there is a compelling reason not to use Toaster.js, please submit an issue with the intent to resolve it.

### Swipt.js

Swipe.js is an independent dependency that will only be loaded when the user's device is detected to support [touchstart](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event).

### Design Token CSS Custom Property dependency

The use of any ODS Component has a dependency on the [ODS Design Tokens (npm install)](https://www.npmjs.com/package/@alaskaairux/orion-design-tokens). See repository and API information [here](https://github.com/AlaskaAirlines/OrionDesignTokens).

For additional details in regards to using Orion Design Tokens with components, please see [./docs/TECH_DETAILS.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/TECH_DETAILS.md)

### CSS Custom Property fallbacks

CSS Custom Properties are not supported in older browsers. For this, fallback properties are pre-generated and included with the npm. Any update to the Orion Design Tokens will be immediately reflected with browsers that support CSS Custom Properties, legacy browsers will require updated components with pre-generated fallback properties.

**Reference component in HTML**

```html
<ods-toast title="This is the title"></ods-toast>
```

## UI Theme Support

The \<ods-toast> custom element will support both the Classic Alaska UI and the new Orion Design UI. 

### Classic UI

\<ods-toast> currently supports a Classic Alaska Airlines UI and is to ONLY be used in the Classic context.

### Orion UI

\<ods-toast> does not currently support the Orion Design UI and it not recommended to be used in Orion UI based project at this time.

## Element \<ods-toast>

```javascript
class Odstoast extends LitElement
```

### Toast use cases

The \<ods-toast> element should be used in situations where:

- alert of successful actions is passive
- message does not require interaction from user
- messages, if missed by auto dismiss, is not crucial to the users interaction

### Properties:

| Attribute | Value type   | Description                                             |
| --------- | ------------ | ------------------------------------------------------- |
| title     | string       | large bold-faced text at the top of the toast component |
| message   | string, null | smaller text that appears below the title               |
| clickCallback | function | to allow for external events to be bound within the scope of the shadow DOM |


### API Code Examples

##### Default Classic Toast

![example-img](./images/01.png)

```html
<ods-toast title="This is a title"></ods-toast>
```

![example-img](./images/02.png)

```html
<ods-toast title="This is a title" message="This is a message"></ods-toast>
```

##### Classic Toast with slotting

![example-img](./images/03.png)

```html
<ods-toast title="This is a title" message="This is a message">
  <ods-hyperlink class="util_paddingLeft--none" href="#">Learn more</ods-hyperlink>
</ods-toast>
```

##### Loading Dynamic Toasts

Loading a dynamic experience with \<ods-toast> requires the use of Toaster.js and Swipe.js and follows a slightly different API then that of the static web component. 

The following example illustrates how you could implement a use case:

```html
<script type="module">
  import Swipe from "../src/swipe.js";
  window.Swipe = Swipe;
  import Toaster from "../src/toaster";
  const toastDuration = 7000;
  const initialToastDelay = 500;
  const toasts = new Toaster(toastDuration);
  setTimeout(() => {
    toasts.add("Status updated");
    toasts.add("Flight information updated", "Your seat preference has been saved");
    toasts.add("Status updated", "Your preference has been updated", "<ods-hyperlink class='util_paddingLeft--none' target='_blank' href='#'>ods-hyperlink</ods-hyperlink>");
  }, initialToastDelay);
</script>
```

Each instance of `toasts.add()` will add the \<ods-toast> custom element to the view.

> ods-hyperlink example styling; requires @alaskaairux/ods-hyperlink: ^1.0.6

> The classes `util_paddingLeft--none` and `util_paddingRight--none` can be placed on the `ods-hyperlink` element using the class attribute.


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
