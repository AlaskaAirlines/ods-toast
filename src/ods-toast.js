// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
// import the processed CSS file into the scope of the component
import componentProperties from "./tokens/componentShapeProperties-css.js";
import styleCss from "./style-css.js";

// build the component class
class OdsToast extends LitElement {
  constructor() {
    super();
    this.setAutoDismissal();

    //   /*
    //     If the component requires a touch detection,
    //     please use this function to determine if a user is
    //     activelly touching a device, versus detecting if
    //     the device is touch enables or a handheld device.

    //     Also uncomment the touch detection lib above
    //   */
    //   this.addEventListener('touchstart', function() {
    //     this.classList.add('is-touching');
    //   });
  }

  // function to define props used within the scope of thie component
  static get properties() {
    return {
      title: { type: String },
      message: { type: String },
      icon: { type: String }
    };
  }

  destroy() {
    console.log(this);
    this.shadowRoot.querySelector(".toast").classList.add("exit");
    setTimeout(() => {
      this.parentElement.removeChild(this);
    }, 1500);
  }

  setAutoDismissal() {
    if (!!this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(this.destroy.bind(this), 10000);
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      ${componentProperties} ${styleCss}
      <div
        class="toast"
        aria-role="status"
        @click=${this.setAutoDismissal.bind(this)}
      >
        <div class="normalContent">
          <div class="normalContent-iconContainer">
            🦁
          </div>
          <div class="normalContent-textContainer">
            <div class="normalContent-textContainer-title">${this.title}</div>
            <div class="normalContent-textContainer-message">
              ${this.message}
            </div>
          </div>
          <div class="normalContent-exitContainer">
            <button @click=${this.destroy.bind(this)}>
              🦄
            </button>
          </div>
        </div>
        <div class="actionContainer">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

// define the name of the custom component
customElements.define("ods-toast", OdsToast);
