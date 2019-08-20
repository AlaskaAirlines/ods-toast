//import { html } from "lit-element";

const style = `
  <style>
  @keyframes entrance {
    0% {
      transform: translateY(calc(20px + 100%));
    }
    35% {
      transform: translateY(calc(20px - 15%));
    }
    60% {
      transform: translateY(calc(20px + 8%));
    }
    100% {
      transform: translateY(0%);
    }
  }
  
  @keyframes exit {
    from {
      opacity: 1;
      transform: translateY(0%);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
    .toastContainer {
      max-width: 400px;
      position: fixed;
      bottom: 20px;
      left: 20px;
    }

    ods-toast {
      transform: translateY(calc(20px + 100%));
      display: block;
    }

    ods-toast.show {
      animation-name: entrance;
      animation-duration: 2s;
      transform: translateY(0%);
    }
  
    ods-toast.exit {
      animation-name: exit;
      animation-duration: 1500ms;
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

export default class QueueToasts {
  constructor() {
    this.toasts = [];
    // this.currentToast = 0;
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.className = "toastContainer";
  }

  add(title) {
    const toast = document.createElement("ods-toast");
    toast.setAttribute("title", title);
    this.toasts.push(toast);
    if (this.toasts.length == 1) {
      this.showNextToast();
    }
  }

  showNextToast() {
    console.log(this.toasts);
    const currentToast = this.toasts[0];
    if (this.toasts.length > 0) {
      console.log(currentToast.shadowRoot); //.querySelector(".toast"));
      this.container.appendChild(currentToast);
      currentToast.classList.add("show");
      setTimeout(() => {
        currentToast.classList.remove("show");
        currentToast.classList.add("exit");
        setTimeout(() => {
          this.container.removeChild(currentToast);
        }, 1500);
        this.toasts.shift();
        this.showNextToast();
      }, 4000);
    }
  }

  setAutoDismissal() {
    console.log("setting auto dismissal!");
    if (!!this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(this.destroy.bind(this), 4000);
  }

  render() {
    this.toasts.forEach(toast => this.container.appendChild(toast));
  }
}

const toasts = new QueueToasts();
toasts.add("1");
//toasts.add("2");
