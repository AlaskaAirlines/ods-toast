# toaster.js

`toaster.js` is used to manipulate \<ods-toast>.

Toaster, manages multiple toasts instances, and controls the order they display, and their dismissal from the screen.

## Install

```shell
$ npm i @alaskaairux/ods-toast
```

## Import

```javascript
import Toaster from "@alaskaairux/ods-toast/scripts/toaster";
```

### Constructor Parameters:

| Param       | Value type | Description                                                 |
| ----------- | ---------- | ----------------------------------------------------------- |
| displayTime | int, null  | display time for each toast component before auto dismissal |

### Create a toaster instance

```javascript
// Constructor auto dismissal time as ms
const toaster = new Toaster(8000);
```

### add

`add`

```javascript
const toaster = new Toaster();
toaster.add("Title 1");

toaster.add("Title 2", "Message 2");

toaster.add(
  "Title3",
  "Message 3",
  `
    <button>Click me!</button>
    <button>No click me!</button>
`
);
```
