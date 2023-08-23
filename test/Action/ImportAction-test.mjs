import { should } from "chai"
import ImportAction from "../../Thing/Action/ImportAction.js"

should()

describe("module | ImportAction", () => {
  it("the least ImportAction for a `thing` undefined", async () => {
    let importAction = await ImportAction()
    importAction.should.eql({
      mainEntityOfPage: "ImportAction",
      name: "Import Error",
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("blank ImportAction", async () => {
    let importAction = await ImportAction({
      url: "../../test/Action/importAction.js",
    })
    importAction.should.eql({
      description: "A ImportAction from `*.json` file test",
      identifier: "importAction",
      mainEntityOfPage: "ImportAction",
      name: "ImportAction Test",
      url: "https://ImportAction.theElioWay.com",
      ItemList: {
        itemListElement: [],
      },
    })
  })
})
