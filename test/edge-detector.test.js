import EdgeDetector from "../src/edge-detector";

describe('EdgeDetector', () => {
  xdescribe("#new()", () => {
  });

  xdescribe("#setLeftEdge()", () => {
    beforeEach(() => {
      spyOn(EdgeDetector, "computeOffsetLeftFromDocument");
    });

    it("calls the left offset computation function for the container", () => {
      expect(EdgeDetector.computeOffsetLeftFromDocument).toHaveBeenCalledWith();
    })
  });
  xdescribe("#setRightEdge()", () => {
    let options, edgeDetector;
    beforeEach(() => {
      options = {
        scrollableContainer: document.documentElement
      };
      edgeDetector = new EdgeDetector(options);
      spyOn(edgeDetector, "computeRightEdge");
    });

    it("calls the edgeDetector with the entire options hash", () => {
      expect(edgeDetector.computeRightEdge).toHaveBeenCalledWith(options.scrollableContainer);
    })
  });
  xdescribe("#setTopEdge()", () => {
    beforeEach(() => {
      spyOn(EdgeDetector, "computeOffsetTopFromDocument");
    });
  });
  xdescribe("#setBottomEdge()", () => {
    beforeEach(() => {
      spyOn(EdgeDetector, "computeBottomEdge");
    });
  });
});
