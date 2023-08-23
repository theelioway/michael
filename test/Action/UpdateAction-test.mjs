import { should } from "chai"
import UpdateAction from "../../Thing/Action/UpdateAction.js"

should()

describe("module | UpdateAction", () => {
  it("the least UpdateAction for a `thing` undefined", () => {
    UpdateAction("ActiveActionStatus")().should.eql({
      mainEntityOfPage: "UpdateAction",
      Action: {
        actionStatus: "ActiveActionStatus",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("UpdateAction on `thing`", () => {
    UpdateAction("ActiveActionStatus")({
      identifier: "updateaction",
    }).should.eql({
      identifier: "updateaction",
      mainEntityOfPage: "UpdateAction",
      Action: {
        actionStatus: "ActiveActionStatus",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })
})
