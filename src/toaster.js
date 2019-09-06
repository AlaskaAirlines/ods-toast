export default class Toaster {
  constructor(displayTime) {
    this.toasts = [];
    this.displayTime = displayTime || 7000;
    this.container = document.createElement("div");
    this.container.setAttribute("aria-live", "polite");
    document.body.appendChild(this.container);
    this.container.className = "ods-toast__toastContainer";
  }

  add(title, message, slotHTML) {
    const toast = document.createElement("ods-toast");
    toast.setAttribute("title", title);
    toast.setAttribute("message", message || "");
    toast.innerHTML = slotHTML || "";
    toast.destroyCallback = this._destroyCurrentToast.bind(this);
    toast.clickCallback = this._setAutoDismissal.bind(this);

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

        // Supports either the esc or return keys
        if (e.keyCode == 27 || e.keyCode == 13) {
          this._destroyCurrentToast();
        }
      });

      if (typeof Swipe !== "undefined") {
        new Swipe(currentToast, this._destroyCurrentToast.bind(this));
      }

      this._setAutoDismissal();
    }
  }

   // animation-duration(css) must match _destroyCurrentToast() setTimeout value
  _destroyCurrentToast(xDiff) {
    if (this.toasts.length) {
      const currentToast = this.toasts[0];
      currentToast.classList.remove("ods-toast__showToast");

      if (xDiff < 0) {
        currentToast.classList.add("ods-toast__exitToast--right");
      } else if (xDiff > 0) {
        currentToast.classList.add("ods-toast__exitToast--left");
      } else {
        currentToast.classList.add("ods-toast__exitToast--down");
      }

      setTimeout(() => {
        this.container.removeChild(currentToast);
        this.toasts.shift();
        this._showNextToast();
      }, 300);
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
