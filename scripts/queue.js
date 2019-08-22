const html = String.raw;

const style = html`
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
      width: 100%;
      position: fixed;
      bottom: 20px;
      left: 0;
    }

    @media screen and (min-width: 420px) {
      .toastContainer {
        left: 20px;
      }
    }

    ods-toast {
      transform: translateY(calc(20px + 100%));
      display: inline-block;
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
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.className = "toastContainer";
  }

  add(title, message) {
    const toast = document.createElement("ods-toast");
    toast.setAttribute("title", title);
    toast.setAttribute("message", message || "");
    toast.onDestroy = this.destroyCurrentToast.bind(this);
    toast.onClick = this.setAutoDismissal.bind(this);

    this.toasts.push(toast);
    if (this.toasts.length == 1) {
      this.showNextToast();
    }
  }

  showNextToast() {
    if (this.toasts.length > 0) {
      const currentToast = this.toasts[0];
      this.container.appendChild(currentToast);
      currentToast.classList.add("show");
      this.setAutoDismissal();
    }
  }

  destroyCurrentToast() {
    if (this.toasts.length) {
      const currentToast = this.toasts[0];
      currentToast.classList.remove("show");
      currentToast.classList.add("exit");
      setTimeout(() => {
        this.container.removeChild(currentToast);
        this.toasts.shift();
        this.showNextToast();
      }, 1500);
    }
  }

  setAutoDismissal() {
    if (!!this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(
      this.destroyCurrentToast.bind(this),
      400000
    );
  }
}

const toasts = new QueueToasts();
toasts.add("1", "boo wwwwwwwwwwwwwwwwwwwwwwwwwyah");
toasts.add("2");
