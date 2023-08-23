import { should } from "chai"
import { set } from "lodash-es"
import Action from "../Thing/Action.js"

should()

describe("module | Action", () => {
  it("pipes blank Action", () => {
    const expectedThing = {
      mainEntityOfPage: "Action",
      Action: {
        actionStatus: "PotentialActionStatus",
      },
    }
    const actualThing = Action()
    // Can't test for equality against functions.
    delete actualThing.Action.target
    actualThing.should.eql(expectedThing)
  })

  it("blank Action.target", () => {
    const expectedTarget = thing =>
      set(thing || {}, "Action.actionStatus", "CompletedActionStatus")
    const actualThing = Action()
    actualThing.Action.target().should.eql(expectedTarget())
    actualThing.Action.target({ identifier: "test" }).should.eql(
      expectedTarget({ identifier: "test" }),
    )
    actualThing.Action.target({ Action: { actionStatus: "test" } }).should.eql(
      expectedTarget({ Action: { actionStatus: "test" } }),
    )
  })
})
