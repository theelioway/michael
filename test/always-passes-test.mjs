import { should } from "chai";

should();

describe("mocha", () => {
  let a = { a: 1 };
  let b = { a: 1 };
  it("always passes", () => {
    should().be.equal(1, 1);
  });
  it("never fails", () => {
    true.should.be.ok;
  });
  it("equal", () => {
    a.should.not.be.equal(b);
  });
  it("eql", () => {
    a.should.eql(b);
  });
});
