const should = require("chai").should()
const michael = require("../michael")

describe("module | michael", function (hooks) {
  it("fetches michael", () => {
    michael().should.equal("michael")
  })
})
