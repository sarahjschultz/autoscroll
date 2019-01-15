import AutoScroll   from "../src/autoscroll";
import EdgeDetector from "../src/edge-detector";

describe('AutoScroll', () => {
  describe("#initialize()", () => {
    describe("with no options specified", () => {
      beforeEach(() => {
        let options = {};
        AutoScroll.initialize(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the default value of the scrollableContainer to the document", () => {
        expect(AutoScroll.scrollableContainer).toBe(document.documentElement);
      });

      it("sets the default recursionDelay to 50 ms", () => {
        expect(AutoScroll.recursionDelay).toBe(50);
      });

      it("sets the default scrollDistance to 10 (pixels)", () => {
        expect(AutoScroll.scrollDistance).toBe(10);
      });
    });

    describe("with options specified", () => {
      let scrollContainer, recursionVal, distanceVal;
      beforeEach(() => {
        scrollContainer = "Yo dawg I heard you like scrollin";
        recursionVal = "We put a scroll in your scroll";
        distanceVal = "So you can scroll while you scroll";
        let options = {
          scrollableContainer: scrollContainer,
          recursionDelay: recursionVal,
          scrollDistance: distanceVal
        };
        AutoScroll.initialize(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the scrollableContainer from options hash", () => {
        expect(AutoScroll.scrollableContainer).toBe(scrollContainer);
      });

      it("sets the recursionVal from options hash", () => {
        expect(AutoScroll.recursionDelay).toBe(recursionVal);
      });

      it("sets the scrollDistance from options hash", () => {
        expect(AutoScroll.scrollDistance).toBe(distanceVal);
      });
    });
  });
});
