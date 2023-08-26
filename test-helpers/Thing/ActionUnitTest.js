import chai from "chai"

const should = chai.should()

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Action from "../Thing/Action.js"
import ActionUnitTest from "../test-helpers/Thing/ActionUnitTest.js"
ActionUnitTest(Action)
* ============================================================================ *
* @param {Function} Thing as an enpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ActionUnitTest = async Action => {
  let typeName = Action.name
  describe(`${typeName} Unit Test`, () => {
    it("returns a `thing` from undefined input", async () => {
      let action = await Action()
      should.equal(action.identifier, undefined)
      action.mainEntityOfPage.should.be.eql(typeName)
      action.ItemList.itemListElement.should.be.eql([])
    })

    it("returns a `thing` for a `thing`", async () => {
      let action = await Action({ identifier: "action-0001" })
      action.identifier.should.be.eql("action-0001")
      action.mainEntityOfPage.should.be.eql(typeName)
      action.ItemList.itemListElement.should.be.eql([])
    })

    it("returns an `action` for an `action`", async () => {
      let action = await Action({
        identifier: "action-0001",
        Action: {
          object: {
            identifier: "thing-0001",
            mainEntityOfPage: "Thing",
          },
        },
      })
      // As proven elsewhere.
      action.identifier.should.be.eql("action-0001")
      action.mainEntityOfPage.should.be.eql(typeName)
      action.ItemList.itemListElement.should.be.eql([])
      // Input becomes `object` `thing`.
      action.Action.object.identifier.should.be.eql("thing-0001")
      action.Action.object.mainEntityOfPage.should.be.eql("Thing")
      action.Action.object.ItemList.itemListElement.should.be.eql([])
    })

    it("`name` and `description`", async () => {
      let action = await Action({
        Action: {
          object: {
            identifier: "thing-0001",
            mainEntityOfPage: "Thing",
          },
        },
      })
      // Input becomes `object` `thing`.
      action.name.should.be.eql("thing-0001 Thing Action")
      action.description.should.be.eql("Action [instrument:{}] supported")
    })

    it("pipes default Action.target", async () => {
      const actualThing = await Action()
      actualThing.Action.target({}).should.be.eql({
        Action: {
          actionStatus: "CompletedActionStatus",
        },
      })
    })

    it("pipes blank Action", async () => {
      const actualThing = await Action()
      // Can't test for equality against functions.
      delete actualThing.Action.target
      actualThing.name.should.eql("Thing Action")
      actualThing.description.should.eql(
        "Action [instrument:{}] supported",
      )
      actualThing.mainEntityOfPage.should.eql(typeName)
      actualThing.Action.should.eql({
        actionStatus: "PotentialActionStatus",
        instrument: {},
      })
      actualThing.object.should.eql({
        mainEntityOfPage: "Thing",
        ItemList: {
          itemListElement: [],
        },
      })
    })
  })
}

export default ActionUnitTest
