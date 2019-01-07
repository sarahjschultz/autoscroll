const AutoScroll = {
  scrollableContainer: document.documentElement,
  scrollThreshhold: 30,
  scrollDistance: 10,
  recursionDelay: 50,
  timerId: null,

  initialize(scrollableContainer, scrollThreshhold, recursionDelay, scrollDistance){
    clearInterval(this.timerId);

    this.setScrollableContainer(scrollableContainer);
    this.setScrollThreshhold(scrollThreshhold);
    this.setRecursionDelay(recursionDelay);
    this.setScrollDistance(scrollDistance);

    this.scrollableContainer.addEventListener("mousemove", (evt) => {
      this.scroll(evt);
    });
    this.scrollableContainer.addEventListener("mouseout", () => {
      clearInterval(this.timerId);
    });
  },

  setScrollableContainer(container){
    // Add guards for type before setting
    this.scrollableContainer = container;
  },

  setScrollThreshhold(distance){
    // Add guards for type before setting
    this.scrollThreshhold = distance;
  },

  setRecursionDelay(delay){
    // Add guards for type before setting
    this.recursionDelay = delay;
  },

  setScrollDistance(distance){
    // Add guards for type before setting
    this.scrollDistance = distance;
  },

  scroll(event) {
    clearInterval(this.timerId);
    const documentClickX = event.pageX;
    const documentClickY = event.pageY;

    const redCoordsClickX = documentClickX - this.scrollableContainer.offsetLeft;
    const redCoordsClickY = documentClickY - this.scrollableContainer.offsetTop;

    const bottomOfRed = this.scrollableContainer.offsetTop + this.scrollableContainer.offsetHeight;
    const topOfRed = this.scrollableContainer.offsetTop;
    const leftOfRed = this.scrollableContainer.offsetLeft;
    const rightOfRed = this.scrollableContainer.offsetLeft + this.scrollableContainer.offsetWidth;

    /* if my mouse is close to the bottom, scroll down*/
    if (redCoordsClickY >= bottomOfRed - this.scrollThreshhold) {
      clearInterval(this.timerId);
      this.timerId = setTimeout(function scrollBottom() {
        clearInterval(AutoScroll.timerId);
        AutoScroll.scrollableContainer.scrollBy(0, this.scrollDistance);
        AutoScroll.timerId = setTimeout(scrollBottom, AutoScroll.recursionDelay);
      }, AutoScroll.recursionDelay);
    }

    /*   if my mouse is close to the top, scroll up*/
    if (redCoordsClickY <= topOfRed + this.scrollThreshhold) {
      clearInterval(this.timerId);
      this.timerId = setTimeout(function scrollTop() {
        clearInterval(AutoScroll.timerId);
        AutoScroll.scrollableContainer.scrollBy(0, -this.scrollDistance);
        AutoScroll.timerId = setTimeout(scrollTop, AutoScroll.recursionDelay);
      }, AutoScroll.recursionDelay);
    }

    /*   if my mouse is close to the left, scroll left*/
    if (redCoordsClickX <= leftOfRed + this.scrollThreshhold) {
      clearInterval(this.timerId);
      this.timerId = setTimeout(function scrollLeft() {
        clearInterval(AutoScroll.timerId);
        AutoScroll.scrollableContainer.scrollBy(-this.scrollDistance, 0);
        AutoScroll.timerId = setTimeout(scrollLeft, AutoScroll.recursionDelay);
      }, AutoScroll.recursionDelay);
    }

    /*   if my mouse is close to the right, scroll right*/
    if (redCoordsClickX >= rightOfRed - this.scrollThreshhold) {
      clearInterval(AutoScroll.timerId);
      AutoScroll.timerId = setTimeout(function scrollRight() {
        clearInterval(AutoScroll.timerId);
        AutoScroll.scrollableContainer.scrollBy(this.scrollDistance, 0);
        AutoScroll.timerId = setTimeout(scrollRight, AutoScroll.recursionDelay);
      }, AutoScroll.recursionDelay);
    }
  },

  reset() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
};

export default AutoScroll;
