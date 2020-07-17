export default class Swipe {
  constructor(toast, destroy) {
    this.destroy = destroy;
    this.xDown = null;
    this.zero = 0;
    toast.addEventListener("touchstart", this.handleTouchStart.bind(this), false);
    toast.addEventListener("touchmove", this.handleTouchMove.bind(this), false);
  }

  getTouches(evt) {
    // browser API
    return evt.touches ||
      // jQuery
      evt.originalEvent.touches;
  }

  handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[this.zero];

    this.xDown = firstTouch.clientX;
  }

  handleTouchMove(evt) {
    if (!this.xDown) {
      return;
    }

    const xUp = evt.touches[this.zero].clientX,
     xDiff = this.xDown - xUp;

    if (xDiff < this.zero) {
      this.destroy(xDiff);
    } else {
      this.destroy(xDiff);
    }

    this.xDown = null;
  }
}
