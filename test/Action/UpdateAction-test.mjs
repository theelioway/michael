import { should } from "chai"
import UpdateAction from "../../Thing/Action/UpdateAction.js"

should()

describe("module | UpdateAction", () => {
  it("UpdateAction on blank", () => {
    UpdateAction("ActiveActionStatus")().should.eql({
      mainEntityOfPage: "UpdateAction",
      Action: {
        actionStatus: "ActiveActionStatus",
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
    })
  })
})
