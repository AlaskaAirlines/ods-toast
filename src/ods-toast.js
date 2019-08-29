// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
// import the processed CSS file into the scope of the component
import componentProperties from "./tokens/componentShapeProperties-css.js";
import styleCss from "./style-css.js";
import iconProperties from "@alaskaairux/orion-icons/dist/tokens/CSSTokenProperties-css.js";
import checkmark from "@alaskaairux/orion-icons/dist/icons/classiccheckmark_es6";
import close from "@alaskaairux/orion-icons/dist/icons/close_es6";

// build the component class
class OdsToast extends LitElement {
  constructor() {
    super();
    this.onDestroy = null;
    this.onClick = null;

    this.dom = new DOMParser().parseFromString(checkmark.svg, "text/html");
    this.checkmarksvg = this.dom.body.firstChild;

    this.dom = new DOMParser().parseFromString(close.svg, "text/html");
    this.closesvg = this.dom.body.firstChild;

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
      message: { type: String }
    };
  }

  destroy() {
    if (!!this.onDestroy) this.onDestroy();
  }

  click() {
    if (!!this.onClick) this.onClick();
  }

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
      ${componentProperties} ${styleCss} ${iconProperties}
      <div
        class="ods-toast"
        aria-role="status"
        aria-live="assertive"
        @click=${this.click.bind(this)}
      >
        <div class="primaryContent">
          <div class="primaryContent-container primaryContent-container--icon">
            ${this.checkmarksvg}
          </div>
          <div class="primaryContent-container primaryContent-container--text">
            <div class="primaryContent-title">${this.title}</div>
            <div class="primaryContent-message">
              ${this.message}
            </div>
          </div>
          <div class="primaryContent-container primaryContent-container--exit">
            <span alt="Close" @click=${this.destroy.bind(this)}>
              ${this.closesvg}
            </span>
          </div>
        </div>
        <div class="secondaryContent">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("ods-toast", OdsToast);
