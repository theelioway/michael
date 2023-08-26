import { set } from "lodash-es"
import chai from "chai"

const should = chai.should()

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Action from "../Thing/Action.js"
import ActionAcceptanceTest from "../test-helpers/Thing/ActionAcceptanceTest.js"
ActionAcceptanceTest(Action)
})
* ============================================================================ *
* @param {Function} Thing as an enpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ThingAcceptanceTest = async Action => {
  let typeName = Action.name
  describe(`${typeName} Acceptance Test`, () => {
    // const Action = (thing) => set(thing, "Action.actionStatus", "ActiveActionStatus")
    // before(async () => {})
    // beforeEach(async () => {})
    // after(async () => { })
    // afterEach(async () => { })

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
      action.description.should.be.eql("Action [instrument:{}]")
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
      actualThing.should.eql({
        name: "Thing Action",
        description: "Action [instrument:{}]",
        mainEntityOfPage: typeName,
        Action: {
          actionStatus: "PotentialActionStatus",
          instrument: {},
          object: {
            ItemList: {
              itemListElement: [],
            },
            mainEntityOfPage: "Thing",
          },
        },
        ItemList: {
          itemListElement: [],
        },
      })
    })

    // testsCallBack()
  })
}

export default ThingAcceptanceTest
