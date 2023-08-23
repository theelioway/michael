import { should } from "chai"
import QuoteAction from "../../Thing/Action/QuoteAction.js"

should()

describe("module | QuoteAction", () => {
  it("returns nothing if fields not present", async () => {
    let quoteAction = await QuoteAction(["identifier"])
    quoteAction().should.eql({})
  })
  it("returns fields if fields present", async () => {
    let quoteAction = await QuoteAction(["mainEntityOfPage"])
    quoteAction().should.eql({ mainEntityOfPage: "QuoteAction" })
  })
  it("returns fields if fields present", async () => {
    let quoteAction = await QuoteAction(["identifier", "mainEntityOfPage"])
    quoteAction({ identifier: "test" }).should.eql({
      identifier: "test",
      mainEntityOfPage: "QuoteAction",
    })
  })
})
