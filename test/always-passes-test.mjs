import chai from "chai"

const should = chai.should()

describe("Mocha", () => {
  it.skip("always passes", () => {
    should.equal(1, 1)
  })
  it.skip("never fails", () => {
    true.should.be.ok
  })
})
