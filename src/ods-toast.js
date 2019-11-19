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
import checkmark from "@alaskaairux/orion-icons/dist/icons/interface/classic-checkmark_es6";
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
  }

  // function to define props used within the scope of thie component
  static get properties() {
    return {
      title:          { type: String },
      message:        { type: String },
      clickCallback:  { type: Function }
    };
  }

  destroyCallback() {
    this.parentElement.removeChild(this);
  }

  clickCallback() {}

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
      ${componentProperties}
      ${iconProperties}
      ${styleCss}

      <div class="ods-toast" aria-role="status" aria-live="assertive"  @click=${this.clickCallback.bind(this)}>

        <div class="primaryContent" @click=${this.destroyCallback.bind(this)}>
          <div class="primaryContent-container primaryContent-container--icon">
            ${this.checkmarksvg}
          </div>
          <div class="primaryContent-container primaryContent-container--text">
            <div class="primaryContent-title">${this.title}</div>
            <div class="primaryContent-message">${this.message}</div>
            <div class="secondaryContent">
              <slot></slot>
            </div>
          </div>
          <div class="primaryContent-container primaryContent-container--exit" alt="Close">
            ${this.closesvg}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("ods-toast", OdsToast);
