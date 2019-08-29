export default class Toaster {
  constructor(displayTime) {
    this.toasts = [];
    this.displayTime = displayTime || 8000;
    this.container = document.createElement("div");
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
