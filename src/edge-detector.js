export default class EdgeDetector {
  constructor(options = {}) {
    this.marginFromEdge = options.scrollThreshhold || 30;
    this.setLeftEdge(options);
    this.setTopEdge(options);

    this.setBottomEdge(options);
    this.setRightEdge(options);
  }

  // Set edges
  setLeftEdge(options) {
    this.leftEdge = options.hasOwnProperty('offsetOverrideLeft') ? options.offsetOverrideLeft : options.scrollableContainer.offsetLeft;
  }

  setTopEdge(options) {
    this.topEdge = options.hasOwnProperty('offsetOverrideTop') ? options.offsetOverrideTop : options.scrollableContainer.offsetTop;
  }

  setBottomEdge(options) {
    this.bottomEdge = this.computeBottomEdge(options.scrollableContainer);
  }
  setRightEdge(options) {
    this.rightEdge = this.computeRightEdge(options.scrollableContainer);
  }

  computeRightEdge(container) {
    return this.leftEdge + container.offsetWidth;
  }

  computeBottomEdge(container) {
    return this.topEdge + container.offsetHeight;
  }

  // Translate event coordinates from document coordinates to
  // scrollContainer coordinates, if necessary
  // If scrollContainer is not passed, this val is the document and math is moot
  translateEventCoords(event) {
    this.translateEventX(event.pageX);
    this.translateEventY(event.pageY);
  }

  translateEventX(documentCoordX) {
    this.containerX = documentCoordX - this.leftEdge;
  }

  translateEventY(documentCoordY) {
    this.containerY = documentCoordY - this.topEdge;
  }

  // Boundary detection
  eventWithinThreshholdFromRight() {
    return this.containerX >= this.rightEdge - this.marginFromEdge;
  }

  eventWithinThreshholdFromLeft(){
    return this.containerX <= this.leftEdge + this.marginFromEdge;
  }

  eventWithinThreshholdFromTop(){
    return this.containerY <= this.topEdge + this.marginFromEdge;
  }

  eventWithinThreshholdFromBottom() {
    return this.containerY >= this.bottomEdge - this.marginFromEdge;
  }
}
