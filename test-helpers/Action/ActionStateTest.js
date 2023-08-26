import chai from "chai"

const should = chai.should()

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Action from "../Action/Action.js"
import ActionStateTest from "../test-helpers/Action/ActionStateTest.js"
ActionStateTest(Action)
* ============================================================================ *
* @param {Function} Thing as an enpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ActionStateTest = async Action => {
  let typeName = Action.name
  describe(`${typeName} State Test`, () => {
    it("mutates a `thing`", async () => {
      let thing = { identifier: "thing-0001", name: "BlueThing" }
      let action = await Action(thing)
      action.Action.object.should.be.eql(thing)
      action.Action.result.should.not.be.eql(thing)
    })
  })
}

export default ActionStateTest
