export default class EdgeDetector {
  constructor(options = {}) {
    if (options.length === 0) return;

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
    return parseInt(this.leftEdge + container.offsetWidth);
  }

  computeBottomEdge(container) {
    return parseInt(this.topEdge + container.offsetHeight);
  }

  computeOffsetTopFromDocument(elem) {
    if (!elem.offsetParent) {
      return elem.offsetTop
    }
    return elem.offsetTop + this.computeOffsetTopFromDocument(elem.offsetParent);
  }

  computeOffsetLeftFromDocument(elem) {
    if (!elem.offsetParent) {
      return elem.offsetLeft
    }
    return elem.offsetLeft + this.computeOffsetLeftFromDocument(elem.offsetParent);
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
}
