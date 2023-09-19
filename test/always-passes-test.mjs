import chai from "chai"

const should = chai.should()

describe("Mocha", () => {
  it.skip("always passes", () => {
    let a = { a: 1 }
    let b = { a: 1 }

    it.skip("always passes", () => {
      should.equal(1, 1)
    })
    it.skip("never fails", () => {
      true.should.be.ok
    })
    it.skip("equal", () => {
      a.should.not.be.equal(b)
    })
    it.skip("eql", () => {
      a.should.eql(b)
    })
  })
})
