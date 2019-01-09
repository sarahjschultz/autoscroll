export default class EdgeDetector {
  constructor(options = {}) {
    this.marginFromEdge = options.scrollThreshhold || 30;
    this.setLeftEdge(options);
    this.setRightEdge(options);
    this.setTopEdge(options);
    this.setBottomEdge(options);
  }

  // Set edges
  setLeftEdge(options) {
    this.leftEdge = options.hasOwnProperty('offsetOverrideLeft') ? options.offsetOverrideLeft : options.scrollableContainer.offsetLeft;
  }

  setRightEdge(options) {
    this.rightEdge = options.hasOwnProperty('offsetOverrideRight') ? options.offsetOverrideRight : this.computeRightEdge(options.scrollableContainer);
  }

  setTopEdge(options) {
    this.topEdge = options.hasOwnProperty('offsetOverrideTop') ? options.offsetOverrideTop : options.scrollableContainer.offsetTop;
  }

  setBottomEdge(options) {
    this.bottomEdge = options.hasOwnProperty('offsetOverrideBottom') ? options.offsetOverrideBottom : this.computeBottomEdge(options.scrollableContainer);
  }

  computeRightEdge(container) {
    return container.offsetLeft + container.offsetWidth;
  }

  computeBottomEdge(container) {
    return container.offsetTop + container.offsetHeight;
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
