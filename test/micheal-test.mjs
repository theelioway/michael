import { should } from "chai"
import { callMichael } from "../michael.js"

should()

describe("module | callMichael", () => {
  it("gets a Michael", () => {
    callMichael().should.eql({ potentialAction: "Action" })
  })
})
