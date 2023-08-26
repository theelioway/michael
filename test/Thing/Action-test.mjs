import Action from "../../Thing/Action.js"
import ThingUnitTest from "../../test-helpers/ThingUnitTest.js"
import ActionUnitTest from "../../test-helpers/Thing/ActionUnitTest.js"

describe("Action Thing", () => {
  it("ThingUnitTest", () => ThingUnitTest(Action))
  it("ActionUnitTest", () => ActionUnitTest(Action))
})

// describe("module | Action", () => {
//   it.skip("blank Action.target", () => {
// const targetFunc = function (thing) {
//   set(thing || {}, "Action.actionStatus", "CompletedActionStatus")
// }
//     const actualThing = Action()
//     actualThing.Action.target().should.eql(expectedTarget())
//     actualThing.Action.target({ identifier: "test" }).should.eql(
//       expectedTarget({ identifier: "test" }),
//     )
//     actualThing.Action.target({
//       Action: { actionStatus: "test" },
//     }).should.eql(expectedTarget({ Action: { actionStatus: "test" } }))
//   })
// })
