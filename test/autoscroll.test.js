import AutoScroll   from "../src/autoscroll";
import EdgeDetector from "../src/edge-detector";
jest.mock('../src/edge-detector');

describe('AutoScroll', () => {
  beforeEach(() => {
    EdgeDetector.mockClear();
  });
  describe("#initialize()", () => {
    describe("with no options specified", () => {
      let options;
      beforeEach(() => {
        options = {};
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

      it("constructs a companion EdgeDetector for the AutoScroll configuration from setup", () => {
        expect(EdgeDetector).toHaveBeenCalledWith(options);
      });
    });

    describe("with options specified", () => {
      let scrollContainer, recursionVal, distanceVal, options;
      beforeEach(() => {
        scrollContainer = "Yo dawg I heard you like scrollin";
        recursionVal = "We put a scroll in your scroll";
        distanceVal = "So you can scroll while you scroll";
        options = {
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

      it("constructs a companion EdgeDetector for the AutoScroll configuration from setup", () => {
        expect(EdgeDetector).toHaveBeenCalledWith(options);
      });
    });
  });

  describe("#setScrollableContainer()", () => {
    describe("with no scrollableContainer specified", () => {
      let options;
      beforeEach(() => {
        options = {};
        AutoScroll.setScrollableContainer(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the default value of the scrollableContainer to the document", () => {
        expect(AutoScroll.scrollableContainer).toBe(document.documentElement);
      });
    });
    describe("with a scrollableContainer specified", () => {
      let options, scrollCont;
      beforeEach(() => {
        scrollCont = "Yo dawg I heard you like scrollin";
        options = {
          scrollableContainer: scrollCont
        };
        AutoScroll.setScrollableContainer(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the value of the scrollableContainer to the container argument", () => {
        expect(AutoScroll.scrollableContainer).toBe(scrollCont);
      });
    });
  });

  describe("#setRecursionDelay()", () => {
    describe("with no recursionDelay specified", () => {
      let options;
      beforeEach(() => {
        options = {};
        AutoScroll.setRecursionDelay(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the default value of recursionDelay to the default 50 ms", () => {
        expect(AutoScroll.recursionDelay).toBe(50);
      });
    });
    describe("with a recursionDelay specified", () => {
      let options, delay;
      beforeEach(() => {
        delay = 4444111000;
        options = {
          recursionDelay: delay
        };
        AutoScroll.setRecursionDelay(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the value of recursionDelay to the delay argument", () => {
        expect(AutoScroll.recursionDelay).toBe(delay);
      });
    });
  });

  describe("#setScrollDistance()", () => {
    describe("with no scrollDistance specified", () => {
      let options;
      beforeEach(() => {
        options = {};
        AutoScroll.setScrollDistance(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the default value of scrollDistance to the default 10 px", () => {
        expect(AutoScroll.scrollDistance).toBe(10);
      });
    });
    describe("with a scrollDistance specified", () => {
      let options, distance;
      beforeEach(() => {
        distance = 222222212;
        options = {
          scrollDistance: distance
        };
        AutoScroll.setScrollDistance(options);
      });
      afterEach(() => {
        AutoScroll.reset();
      });

      it("sets the value of scrollDistance to the distance argument", () => {
        expect(AutoScroll.scrollDistance).toBe(distance);
      });
    });
  });

  describe("#reset()", () => {
    let scrollContainer, recursionVal, distanceVal, options, punchline;
    beforeEach(() => {
      scrollContainer = "Yo dawg I heard you like scrollin";
      recursionVal = "We put a scroll in your scroll";
      distanceVal = "So you can scroll while you scroll";
      options = {
        scrollableContainer: scrollContainer,
        recursionDelay: recursionVal,
        scrollDistance: distanceVal
      };
      AutoScroll.initialize(options);
      punchline = "Why did the chicken cross the road?";
      AutoScroll.timerId = punchline;
    });

    afterEach(() => {
      AutoScroll.reset();
    });

    it("resets any timerId set by various timing functions", () => {
      expect(AutoScroll.timerId).toBe(punchline);
      AutoScroll.reset();
      expect(AutoScroll.timerId).toBe(null);
    });
    it("resets the container values to null", () => {
      expect(AutoScroll.scrollableContainer).toBe(scrollContainer);
      AutoScroll.reset();
      expect(AutoScroll.scrollableContainer).toBe(null);
    });

    it("resets the recursion values to null", () => {
      expect(AutoScroll.recursionDelay).toBe(recursionVal);
      AutoScroll.reset();
      expect(AutoScroll.recursionDelay).toBe(null);
    });

    it("resets the scrollDistance values to null", () => {
      expect(AutoScroll.scrollDistance).toBe(distanceVal);
      AutoScroll.reset();
      expect(AutoScroll.scrollDistance).toBe(null);
    });

    it("deletes the edgeDetector instance built during setup", () => {
      expect(AutoScroll.edgeDetector).toBeInstanceOf(EdgeDetector);
      AutoScroll.reset();
      expect(AutoScroll.edgeDetector).not.toBeDefined();
    });
  });

  describe("#scroll()", () => {
    describe("when the event is defined", () => {
      let event;
      beforeEach(() => {
        event = {
          pageX: 10,
          pageY: 20,
          clientX: 5,
          clientY: 10
        };

        AutoScroll.initialize();
        spyOn(AutoScroll.edgeDetector, "translateEventCoords");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromBottom");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromTop");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromLeft");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromRight");

        AutoScroll.scroll(event);
      });

      afterEach(() => {
        AutoScroll.reset();
      });

      it("translates the event coordinates in the detector", () => {
        expect(AutoScroll.edgeDetector.translateEventCoords).toHaveBeenCalledWith(event);
      });
      it("calls the bottom threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromBottom).toHaveBeenCalled();
      });
      it("calls the top threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromTop).toHaveBeenCalled();
      });
      it("calls the left threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromLeft).toHaveBeenCalled();
      });
      it("calls the right threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromRight).toHaveBeenCalled();
      });
    });
    describe("when the event is UNDEFINED", () => {
      let event;
      beforeEach(() => {
        event = undefined;

        AutoScroll.initialize();
        spyOn(AutoScroll.edgeDetector, "translateEventCoords");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromBottom");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromTop");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromLeft");
        spyOn(AutoScroll.edgeDetector, "eventWithinThreshholdFromRight");

        AutoScroll.scroll(event);
      });

      afterEach(() => {
        AutoScroll.reset();
      });

      it("DOES NOT translate the event coordinates in the detector", () => {
        expect(AutoScroll.edgeDetector.translateEventCoords).not.toHaveBeenCalled();
      });
      it("DOES NOT call the bottom threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromBottom).not.toHaveBeenCalled();
      });
      it("DOES NOT call the top threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromTop).not.toHaveBeenCalled();
      });
      it("DOES NOT call the left threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromLeft).not.toHaveBeenCalled();
      });
      it("DOES NOT calls the right threshhold check for each scroll event", () => {
        expect(AutoScroll.edgeDetector.eventWithinThreshholdFromRight).not.toHaveBeenCalled();
      });
    });
  });
});
