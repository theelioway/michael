import Action from "../../Action/Action.js"
import ThingUnitTest from "../../test-helpers/ThingUnitTest.js"
import ActionStateTest from "../../test-helpers/Action/ActionStateTest.js"
import ActionUnitTest from "../../test-helpers/Thing/ActionUnitTest.js"

describe("Action Action", () => {
  it("ThingUnitTest", () => ThingUnitTest(Action))
  it("ActionUnitTest", () => ActionUnitTest(Action))
  it.skip("ActionStateTest", () => ActionStateTest(Action))
})
