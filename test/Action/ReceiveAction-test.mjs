import { should } from "chai"
import ReceiveAction from "../../Thing/Action/ReceiveAction.js"

should()

describe("module | ReceiveAction", () => {
  it("the least ReceiveAction for a `thing` undefined", () => {
    ReceiveAction().should.eql({
      mainEntityOfPage: "ReceiveAction",
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("recieves a JSON as string `thing`", () => {
    ReceiveAction(
      `{ "identifier": "receiveaction", "name": "ReceiveAction thing" }`,
    ).should.eql({
      identifier: "receiveaction",
      mainEntityOfPage: "ReceiveAction",
      name: "ReceiveAction thing",
      ItemList: {
        itemListElement: [],
      },
    })
  })
})
