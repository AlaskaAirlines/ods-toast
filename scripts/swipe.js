export default class Swipe {
  constructor(toast) {
    this.xDown = null;
    this.yDown = null;
    toast.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this),
      false
    );
    toast.addEventListener("touchmove", this.handleTouchMove.bind(this), false);
  }

  getTouches(evt) {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  }

  handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  handleTouchMove(evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        alert("WHY DID YOU LEAVE ME");
      } else {
        /* right swipe */
        alert("WHY DID YOU COME BACK???");
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }
}
