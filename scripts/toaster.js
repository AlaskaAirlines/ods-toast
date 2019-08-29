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

    .ods-toast__toastContainer {
      max-width: 400px;
      width: 100%;
      position: fixed;
      bottom: 20px;
      left: 0;
    }

    @media screen and (min-width: 420px) {
      .ods-toast__toastContainer {
        left: 20px;
      }
    }

    ods-toast {
      transform: translateY(calc(20px + 100%));
      display: inline-block;
    }

    .ods-toast__showToast {
      animation-name: entrance;
      animation-duration: 2s;
      transform: translateY(0%);
    }

    .ods-toast__exitToast {
      animation-name: exit;
      animation-duration: 1500ms;
    }

    @media screen and (max-width: 420px) {
      ods-toast {
        width: 100%;
      }
    }
  </style>
`;

export default class Toaster {
  constructor(displayTime) {
    this.toasts = [];
    this.displayTime = displayTime || 8000;
    this.container = document.createElement("div");
    this.container.innerHTML = style;
    this.container.setAttribute("aria-live", "polite");
    document.body.appendChild(this.container);
    this.container.className = "ods-toast__toastContainer";
  }

  add(title, message, actionHTML) {
    const toast = document.createElement("ods-toast");
    toast.setAttribute("title", title);
    toast.setAttribute("message", message || "");
    toast.innerHTML = actionHTML || "";
    toast.onDestroy = this._destroyCurrentToast.bind(this);
    toast.onClick = this._setAutoDismissal.bind(this);

    this.toasts.push(toast);
    if (this.toasts.length == 1) {
      this._showNextToast();
    }
  }

  _showNextToast() {
    if (this.toasts.length > 0) {
      const currentToast = this.toasts[0];
      this.container.appendChild(currentToast);
      currentToast.classList.add("ods-toast__showToast");
      currentToast.tabIndex = 0;
      currentToast.addEventListener("keydown", e => {
        console.log(e);
        if (e.keyCode == 27) {
          this._destroyCurrentToast();
        }
      });

      /*
      if (!!Swipe) {
        new Swipe(currentToast, this._destroyCurrentToast.bind(this));
      }
      */

      this._setAutoDismissal();
    }
  }

  _destroyCurrentToast() {
    console.log(this.toasts.length);
    if (this.toasts.length) {
      const currentToast = this.toasts[0];
      currentToast.classList.remove("ods-toast__showToast");
      currentToast.classList.add("ods-toast__exitToast");
      setTimeout(() => {
        this.container.removeChild(currentToast);
        this.toasts.shift();
        this._showNextToast();
      }, 1500);
    }
  }

  _setAutoDismissal() {
    if (!!this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(
      this._destroyCurrentToast.bind(this),
      this.displayTime
    );
  }
}
