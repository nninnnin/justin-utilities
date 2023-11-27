const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
chai.use(require("sinon-chai"));
const { renderHook, act } = require("@testing-library/react-hooks");

const { useTimer } = require("../dist/index.js");

describe("useTimer function test", () => {
  it("The callback should be called right times", function (done) {
    this.timeout(10000);

    const { result } = renderHook(() => useTimer(3));

    const callback = sinon.spy(() => {
      console.log(result.current.timeLeft);
    });

    act(() => {
      result.current.reset(callback);
    });

    setTimeout(() => {
      expect(callback).to.have.been.calledThrice;

      done();
    }, 4000);
  });

  it("Should reset only once while running timeout callback", function (done) {});
});
