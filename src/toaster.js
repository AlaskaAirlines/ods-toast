export default class Toaster {
  constructor(displayTime) {
    this.toasts = [];
    this.waitTime = 7000;
    this.nextToast = 300;
    this.zero = 0;
    this.one = 1;
    this.esc = 27;
    this.return = 13;
    this.displayTime = displayTime || this.waitTime;
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
    toast.destroyCallback = this.destroyCurrentToast.bind(this);
    toast.clickCallback = this.setAutoDismissal.bind(this);

    this.toasts.push(toast);
    if (this.toasts.length === this.one) {
      this.showNextToast();
    }
  }

  showNextToast() {
    if (this.toasts.length > this.zero) {
      const currentToast = this.toasts[this.zero];

      this.container.appendChild(currentToast);
      currentToast.classList.add("ods-toast__showToast");
      currentToast.tabIndex = this.zero;
      currentToast.addEventListener("keydown", (ex) => {

        // Supports either the esc or return keys
        if (ex.keyCode === this.esc || ex.keyCode === this.return) {
          this.destroyCurrentToast();
        }
      });

      /* global Swipe */

      if (typeof Swipe !== "undefined") {
        new Swipe(currentToast, this.destroyCurrentToast.bind(this));
      }

      this.setAutoDismissal();
    }
  }

   // animation-duration(css) must match _destroyCurrentToast() setTimeout value
  destroyCurrentToast(xDiff) {
    if (this.toasts.length) {
      const currentToast = this.toasts[this.zero];

      currentToast.classList.remove("ods-toast__showToast");

      if (xDiff < this.zero) {
        currentToast.classList.add("ods-toast__exitToast--right");
      } else if (xDiff > this.zero) {
        currentToast.classList.add("ods-toast__exitToast--left");
      } else {
        currentToast.classList.add("ods-toast__exitToast--down");
      }

      setTimeout(() => {
        this.container.removeChild(currentToast);
        this.toasts.shift();
        this.showNextToast();
      }, this.nextToast);
    }
  }

  setAutoDismissal() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(
      this.destroyCurrentToast.bind(this),
      this.displayTime
    );
  }
}
