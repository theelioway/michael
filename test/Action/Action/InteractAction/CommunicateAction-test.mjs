import { should } from "chai"
import ThingUnitTest from "../../../test-helpers/ThingUnitTest.js"
import ActionStateTest from "../../../test-helpers/Action/ActionStateTest.js"
import CommunicateAction from "../../../Action/Action/CommunicateAction.js"

should()

describe("Action | CommunicateAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(CommunicateAction))
  it("ActionStateTest", () => ActionStateTest(CommunicateAction))
  it("returns nothing if fields not present", async () => {
    let action = await CommunicateAction(["identifier"])
    action.Action.result.should.eql({})
  })
  it("returns fields if fields present", async () => {
    let action = await CommunicateAction(["mainEntityOfPage"])
    action.Action.result.should.eql({ mainEntityOfPage: "CommunicateAction" })
  })
  it("has ItemList even for blank `thing`", async () => {
    let action = await CommunicateAction(["ItemList"])
    action.Action.result.should.eql({
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("returns fields if fields present", async () => {
    let action = await CommunicateAction({ Cons: { ["identifier", "mainEntityOfPage"]})
    quoteAction({ identifier: "test" }).should.eql({
      identifier: "test",
      mainEntityOfPage: "CommunicateAction",
    })
  })
})
