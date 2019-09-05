export default class Swipe {
  constructor(toast, destroy) {
    this.destroy = destroy;
    this.xDown = null;
    toast.addEventListener("touchstart", this.handleTouchStart.bind(this), false);
    toast.addEventListener("touchmove", this.handleTouchMove.bind(this), false);
  }

  getTouches(evt) {
    return evt.touches ||           // browser API
      evt.originalEvent.touches;    // jQuery
  }

  handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[0];
    this.xDown = firstTouch.clientX;
  }

  handleTouchMove(evt) {
    if (!this.xDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let xDiff = this.xDown - xUp;

    if (xDiff < 0) {
      this.destroy(xDiff);
    } else {
      this.destroy(xDiff);
    }

    this.xDown = null;
  }
}
