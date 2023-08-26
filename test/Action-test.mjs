import Action from "../Thing/Action.js"
import ActionAcceptanceTest from "../test-helpers/Thing/ActionAcceptanceTest.js"

ActionAcceptanceTest(Action)

// describe("module | Action", () => {
//   it("blank Action.target", () => {
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
