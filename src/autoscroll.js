import EdgeDetector from "./edge-detector";

const AutoScroll = {
  initialize(options = {}) {
    this.setScrollableContainer(options);
    this.setScrollDistance(options);

    this.edgeDetector = new EdgeDetector(options);
  },

  // Container to scroll in autoScroll event
  // All offsets + threshholds measured from this
  setScrollableContainer(options) {
    // Add guards for type before setting
    this.scrollableContainer =
      options.scrollableContainer || document.documentElement;
  },

  // Distance autoScroller should increase scroll, each call
  // Measured in pixels
  setScrollDistance(options) {
    // Add guards for type before setting
    this.scrollDistance = options.scrollDistance || 10;
  },

  scroll(event) {
    if (event === undefined) return;
    const self = this;
    let scrollYBy = 0;
    let scrollXBy = 0;

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

    self.scrollableContainer.scrollBy(scrollXBy, scrollYBy);
  },

  reset() {
    this.scrollableContainer = this.scrollDistance = null;
    delete this.edgeDetector;
  },
};

export default AutoScroll;
