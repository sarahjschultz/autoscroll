import EdgeDetector from "./edge-detector";

const AutoScroll = {
  initialize(options = {}){
    this.timerId = null;
    this.setScrollableContainer(options.scrollableContainer);
    this.setRecursionDelay(options.recursionDelay);
    this.setScrollDistance(options.scrollDistance);
    this.edgeDetector = new EdgeDetector(options);

    this.scrollableContainer.addEventListener("mouseout", () => {
      clearInterval(this.timerId);
    });
  },

  // Container to scroll in autoScroll event
  // All offsets + threshholds measured from this
  setScrollableContainer(container){
    // Add guards for type before setting
    this.scrollableContainer = container || document.documentElement;
  },

  // Milliseconds
  setRecursionDelay(delay){
    // Add guards for type before setting
    this.recursionDelay = delay || 50;
  },

  // Distance autoScroller should increase scroll, each call
  // Measured in pixels
  setScrollDistance(distance){
    // Add guards for type before setting
    this.scrollDistance = distance || 10;
  },

  scroll(event) {
    const self = this;

    clearInterval(self.timerId);
    // Event location in document coordinates
    self.edgeDetector.translateEventCoords(event);

    // if event occurs close to the bottom, scroll down
    if (self.edgeDetector.eventWithinThreshholdFromBottom()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollBottom() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(0, self.scrollDistance);
        self.timerId = setTimeout(scrollBottom, self.recursionDelay);
      }, self.recursionDelay);
    }

    // if event occurs close to the top, scroll up
    if (self.edgeDetector.eventWithinThreshholdFromTop()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollTop() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(0, -self.scrollDistance);
        self.timerId = setTimeout(scrollTop, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the left, scroll left
    if (this.edgeDetector.eventWithinThreshholdFromLeft()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollLeft() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(-self.scrollDistance, 0);
        self.timerId = setTimeout(scrollLeft, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the right, scroll right
    if (self.edgeDetector.eventWithinThreshholdFromRight()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollRight() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(self.scrollDistance, 0);
        self.timerId = setTimeout(scrollRight, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the top-right, scroll top-right
    if (self.edgeDetector.eventWithinTopRightThreshhold()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollTopRight() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(self.scrollDistance, -self.scrollDistance);
        self.timerId = setTimeout(scrollTopRight, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the top-left, scroll top-left
    if (self.edgeDetector.eventWithinTopLeftThreshhold()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollTopLeft() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(-self.scrollDistance, -self.scrollDistance);
        self.timerId = setTimeout(scrollTopLeft, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the bottom-left, scroll bottom-left
    if (self.edgeDetector.eventWithinBottomLeftThreshhold()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollBottomLeft() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(-self.scrollDistance, self.scrollDistance);
        self.timerId = setTimeout(scrollBottomLeft, self.recursionDelay);
      }, self.recursionDelay);
    }

    //   if event occurs close to the bottom-right, scroll bottom-right
    if (self.edgeDetector.eventWithinBottomRightThreshhold()) {
      clearInterval(self.timerId);
      self.timerId = setTimeout(function scrollBottomRight() {
        clearInterval(self.timerId);
        self.scrollableContainer.scrollBy(self.scrollDistance, self.scrollDistance);
        self.timerId = setTimeout(scrollBottomRight, self.recursionDelay);
      }, self.recursionDelay);
    }
  },

  reset() {
    clearInterval(this.timerId);
    this.timerId = null;
    delete this.edgeDetector;
  }
};

export default AutoScroll;
