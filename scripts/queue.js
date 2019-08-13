//import { html } from "lit-element";

const style = `
  <style>
    .toastContainer {
      max-width: 400px;
      position: fixed;
      bottom: 20px;
      left: 20px;
    }
  </style>
`;
document.body.appendChild(createElementFromHTML(style));

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

class QueueToasts {
  constructor() {
    this.toasts = [];
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.className = "toastContainer";
  }

  add(title) {
    const toast = document.createElement("ods-toast");
    toast.setAttribute("title", title);
    this.toasts.push(toast);
    this.container.appendChild(toast);
  }

  render() {
    this.toasts.forEach(toast => this.container.appendChild(toast));
  }
}

const toasts = new QueueToasts();
toasts.add("1");
//setTimeout(() => toasts.add("2"), 4000);
