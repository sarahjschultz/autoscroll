export default class AutoScroll {
  constructor(options = {}){
    this.timerId = null;
    this.setScrollableContainer(options.scrollableContainer);
    this.setScrollThreshhold(options.scrollThreshhold);
    this.setRecursionDelay(options.recursionDelay);
    this.setScrollDistance(options.scrollDistance);

    clearInterval(this.timerId);
    this.scrollableContainer.addEventListener("mousemove", (evt) => {
      this.scroll(evt);
    });
    this.scrollableContainer.addEventListener("mouseout", () => {
      this.reset();
    });
  }

  // Container to scroll in autoScroll event
  // All offsets + threshholds measured from this
  setScrollableContainer(container){
    // Add guards for type before setting
    this.scrollableContainer = container || document.documentElement;
  }

  // Pixel distance from scrollContainer boundary that will trigger autoScroll
  setScrollThreshhold(scrollThreshhold){
    // Add guards for type before setting
    this.scrollThreshhold = scrollThreshhold || 30;
  }

  // Milliseconds
  setRecursionDelay(delay){
    // Add guards for type before setting
    this.recursionDelay = delay || 50;
  }

  // Distance autoScroller should increase scroll, each call
  // Measured in pixels
  setScrollDistance(distance){
    // Add guards for type before setting
    this.scrollDistance = distance || 10;
  }

  scroll(event) {
    const self = this;

    clearInterval(self.timerId);
    // Event location in document coordinates
    const documentClickX = event.pageX;
    const documentClickY = event.pageY;

    // Convert mouseEvent coordinates from document coordinates to
    // scrollContainer coordinates, if necessary
    // if NO scrollContainer passed in, this math is moot
    const scrollCoordsClickX = documentClickX - self.scrollableContainer.offsetLeft;
    const scrollCoordsClickY = documentClickY - self.scrollableContainer.offsetTop;

    // Boundaries of scrollContainer for edge detection
    const bottomOfScrollContainer = self.scrollableContainer.offsetTop + self.scrollableContainer.offsetHeight;
    const topOfScrollContainer = self.scrollableContainer.offsetTop;
    const leftOfScrollContainer = self.scrollableContainer.offsetLeft;
    const rightOfScrollContainer = self.scrollableContainer.offsetLeft + self.scrollableContainer.offsetWidth;

    // if event occurs close to the bottom, scroll down
    if (scrollCoordsClickY >= bottomOfScrollContainer - self.scrollThreshhold) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollBottom() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(0, self.scrollDistance);
        self.timerId = setTimeout(scrollBottom, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the top, scroll up
    if (scrollCoordsClickY <= topOfScrollContainer + self.scrollThreshhold) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollTop() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(0, -self.scrollDistance);
        self.timerId = setTimeout(scrollTop, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the left, scroll left
    if (scrollCoordsClickX <= leftOfScrollContainer + self.scrollThreshhold) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollLeft() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(-self.scrollDistance, 0);
        self.timerId = setTimeout(scrollLeft, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the right, scroll right
    if (scrollCoordsClickX >= rightOfScrollContainer - self.scrollThreshhold) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollRight() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(this.scrollDistance, 0);
        self.timerId = setTimeout(scrollRight, self.recursionDelay);
      }, self.recursionDelay);
    }
  }

  reset() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}
