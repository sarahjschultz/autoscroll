import EdgeDetector from "../src/edge-detector";

describe('EdgeDetector', () => {
  let detector, options;
  beforeEach(() => {
    options = {
      scrollableContainer: document.documentElement,
      scrollThreshhold:    10
    };

    detector = new EdgeDetector(options);
  });

  afterEach(() => {
    detector = undefined;
  });

  describe("#setLeftEdge()", () => {
    beforeEach(() => {
      spyOn(detector, "computeOffsetLeftFromDocument");
    });

    it("calls the left offset computation function for the container", () => {
      detector.setLeftEdge(options);
      expect(detector.computeOffsetLeftFromDocument).toHaveBeenCalledWith(options.scrollableContainer);
    })
  });

  describe("#setRightEdge()", () => {
    beforeEach(() => {
      spyOn(detector, "computeRightEdge");
    });

    it("calls the right offset computation function for the container", () => {
      detector.setRightEdge(options);
      expect(detector.computeRightEdge).toHaveBeenCalledWith(options.scrollableContainer);
    })
  });

  describe("#setTopEdge()", () => {
    beforeEach(() => {
      spyOn(detector, "computeOffsetTopFromDocument");
    });
    it("calls the top offset computation function for the container", () => {
      detector.setTopEdge(options);
      expect(detector.computeOffsetTopFromDocument).toHaveBeenCalledWith(options.scrollableContainer);
    })
  });

  describe("#setBottomEdge()", () => {
    beforeEach(() => {
      spyOn(detector, "computeBottomEdge");
    });
    it("calls the bottom offset computation function for the container", () => {
      detector.setBottomEdge(options);
      expect(detector.computeBottomEdge).toHaveBeenCalledWith(options.scrollableContainer);
    })
  });

  describe("#computeRightEdge()", () => {
    let container;
    beforeEach(() => {
      detector.leftEdge = 22;
      document.body.innerHTML = '<div id="container">' + '</div>';
      container = document.getElementsByClassName('container');
      container.offsetWidth = 44;
    });

    it("performs a sum of the left edge value plus the width of the container to return the right edge", () => {
      expect(detector.computeRightEdge(container)).toBe(66);
    });
  });

  describe("#computeBottomEdge()", () => {
    let container;
    beforeEach(() => {
      detector.topEdge = 15;
      document.body.innerHTML = '<div id="container">' + '</div>';
      container = document.getElementsByClassName('container');
      container.offsetHeight = 5;
    });

    it("performs a sum of the top edge value plus the height of the container to compute the bottom edge", () => {
      expect(detector.computeBottomEdge(container)).toBe(20);
    });
  });

  describe("#eventWithinThreshholdFromRight()", () => {
    describe("when the event is well within threshhold", () => {
      beforeEach(() => {
        detector.eventX = 13;
        detector.rightEdge = 15;
        detector.marginFromEdge = 5;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromRight()).toBe(true);
      });
    });
    describe("when the event is ON threshhold boundary", () => {
      beforeEach(() => {
        detector.eventX = 10;
        detector.rightEdge = 15;
        detector.marginFromEdge = 5;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromRight()).toBe(true);
      });

    });
    describe("when the event is NOT within threshhold boundary", () => {
      beforeEach(() => {
        detector.eventX = 6;
        detector.rightEdge = 15;
        detector.marginFromEdge = 5;
      });

      it("returns FALSE", () => {
        expect(detector.eventWithinThreshholdFromRight()).toBe(false);
      });
    });
  });

  describe("#eventWithinThreshholdFromLeft()", () => {
    describe("when the event is well within threshhold", () => {
      beforeEach(() => {
        detector.eventX = 20;
        detector.leftEdge = 5;
        detector.marginFromEdge = 20;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromLeft()).toBe(true);
      });
    });
    describe("when the event is ON threshhold boundary", () => {
      beforeEach(() => {
        detector.eventX = 25;
        detector.leftEdge = 5;
        detector.marginFromEdge = 20;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromLeft()).toBe(true);
      });

    });
    describe("when the event is NOT within threshhold boundary", () => {
      beforeEach(() => {
        detector.eventX = 100;
        detector.leftEdge = 5;
        detector.marginFromEdge = 20;
      });

      it("returns FALSE", () => {
        expect(detector.eventWithinThreshholdFromLeft()).toBe(false);
      });
    });
  });

  describe("#eventWithinThreshholdFromTop()", () => {
    describe("when the event is well within threshhold", () => {
      beforeEach(() => {
        detector.eventY = 20;
        detector.topEdge = 5;
        detector.marginFromEdge = 20;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromTop()).toBe(true);
      });
    });
    describe("when the event is ON threshhold boundary", () => {
      beforeEach(() => {
        detector.eventY = 25;
        detector.topEdge = 5;
        detector.marginFromEdge = 20;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromTop()).toBe(true);
      });

    });
    describe("when the event is NOT within threshhold boundary", () => {
      beforeEach(() => {
        detector.eventY = 100;
        detector.topEdge = 5;
        detector.marginFromEdge = 20;
      });

      it("returns FALSE", () => {
        expect(detector.eventWithinThreshholdFromTop()).toBe(false);
      });
    });
  });

  describe("#eventWithinThreshholdFromBottom()", () => {
    describe("when the event is well within threshhold", () => {
      beforeEach(() => {
        detector.eventY = 38;
        detector.bottomEdge = 50;
        detector.marginFromEdge = 20;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromBottom()).toBe(true);
      });
    });
    describe("when the event is ON threshhold boundary", () => {
      beforeEach(() => {
        detector.eventY = 30;
        detector.bottomEdge = 50;
        detector.marginFromEdge = 20;
      });

      it("returns TRUE", () => {
        expect(detector.eventWithinThreshholdFromBottom()).toBe(true);
      });

    });
    describe("when the event is NOT within threshhold boundary", () => {
      beforeEach(() => {
        detector.eventY = 10;
        detector.bottomEdge = 50;
        detector.marginFromEdge = 20;
      });

      it("returns FALSE", () => {
        expect(detector.eventWithinThreshholdFromBottom()).toBe(false);
      });
    });
  });
});
