export default class EdgeDetector {
  constructor(options = {}) {
    this.marginFromEdge = options.scrollThreshhold >= 0 ? options.scrollThreshhold : 30;
    this.setLeftEdge(options);
    this.setTopEdge(options);

    this.setBottomEdge(options);
    this.setRightEdge(options);
  }

  // Set edges
  setLeftEdge(options) {
    this.leftEdge =  this.computeOffsetLeftFromDocument(options.scrollableContainer);
  }

  setTopEdge(options) {
    this.topEdge = this.computeOffsetTopFromDocument(options.scrollableContainer);
  }

  setBottomEdge(options) {
    this.bottomEdge = this.computeBottomEdge(options.scrollableContainer);
  }

  setRightEdge(options) {
    this.rightEdge = this.computeRightEdge(options.scrollableContainer);
  }

  // Compute various positioning values to support
  // the edge detection
  computeRightEdge(container) {
    return this.leftEdge + container.offsetWidth;
  }

  computeBottomEdge(container) {
    return this.topEdge + container.offsetHeight;
  }

  computeOffsetTopFromDocument(elem) {
    let top = 0;
    if (elem.offsetParent) {
      do {
        top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return top >= 0 ? top : 0;
  }

  computeOffsetLeftFromDocument(elem) {
    let left = 0;
    if (elem.offsetParent) {
      do {
        left += elem.offsetLeft;
        elem = elem.offsetParent;
      } while (elem);
    }
    return left >= 0 ? left : 0;
  }

  translateEventCoords(event) {
    this.eventX = event.pageX;
    this.eventY = event.pageY;
  }

  // Boundary detection
  eventWithinThreshholdFromRight() {
    return this.eventX >= this.rightEdge - this.marginFromEdge;
  }

  eventWithinThreshholdFromLeft(){
    return this.eventX <= this.leftEdge + this.marginFromEdge;
  }

  eventWithinThreshholdFromTop(){
    return this.eventY <= this.topEdge + this.marginFromEdge;
  }

  eventWithinThreshholdFromBottom() {
    return this.eventY >= this.bottomEdge - this.marginFromEdge;
  }

  eventWithinBottomLeftThreshhold() {
    return this.eventWithinThreshholdFromLeft() && this.eventWithinThreshholdFromBottom();
  }

  eventWithinBottomRightThreshhold() {
    return this.eventWithinThreshholdFromRight() && this.eventWithinThreshholdFromBottom();
  }

  eventWithinTopRightThreshhold() {
    return this.eventWithinThreshholdFromRight() && this.eventWithinThreshholdFromTop();
  }

  eventWithinTopLeftThreshhold() {
    return this.eventWithinThreshholdFromLeft() && this.eventWithinThreshholdFromTop();
  }
}
