import chai from "chai"

const should = chai.should()

describe("Mocha Example Test", () => {
  it("never fails", () => {
    true.should.be.ok
    should.equal(1, 1)
  })
})
