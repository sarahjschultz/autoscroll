import EdgeDetector from "./edge-detector";

const AutoScroll = {
  initialize(options = {}){
    this.timerId = null;
    this.setScrollableContainer(options);
    this.setRecursionDelay(options);
    this.setScrollDistance(options);

    this.edgeDetector = new EdgeDetector(options);
  },

  // Container to scroll in autoScroll event
  // All offsets + threshholds measured from this
  setScrollableContainer(options){
    // Add guards for type before setting
    this.scrollableContainer = options.scrollableContainer || document.documentElement;
  },

  // Milliseconds
  setRecursionDelay(options){
    // Add guards for type before setting
    this.recursionDelay = options.recursionDelay || 50;
  },

  // Distance autoScroller should increase scroll, each call
  // Measured in pixels
  setScrollDistance(options){
    // Add guards for type before setting
    this.scrollDistance = options.scrollDistance || 10;
  },

  scroll(event) {
    if (event === undefined) return;
    const self = this;
    let scrollYBy = 0;
    let scrollXBy = 0;

    clearInterval(self.timerId);
    // Event location in document coordinates
    self.edgeDetector.translateEventCoords(event);

    // if event occurs close to the bottom, scroll down
    if (self.edgeDetector.eventWithinThreshholdFromBottom()) {
      scrollYBy = self.scrollDistance;
    }

    // if event occurs close to the top, scroll up
    if (self.edgeDetector.eventWithinThreshholdFromTop()) {
      scrollYBy = -self.scrollDistance;
    }

    //   if event occurs close to the left, scroll left
    if (this.edgeDetector.eventWithinThreshholdFromLeft()) {
      scrollXBy = -self.scrollDistance;
    }

    //   if event occurs close to the right, scroll right
    if (self.edgeDetector.eventWithinThreshholdFromRight()) {
      scrollXBy = self.scrollDistance;
    }

    clearInterval(self.timerId);
    self.timerId = setTimeout(function scrollContainer() {
      clearInterval(self.timerId);
      self.scrollableContainer.scrollBy(scrollXBy, scrollYBy);
      self.timerId = setTimeout(scrollContainer, self.recursionDelay);
    }, self.recursionDelay);
  },

  reset() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.scrollableContainer = this.scrollDistance = this.recursionDelay = null;
    delete this.edgeDetector;
  }
};

export default AutoScroll;
