import { should } from "chai"
import ReadAction from "../../Thing/Action/ReadAction.js"

should()

describe("module | ReadAction", () => {
  it("handles `url`-less ReadAction", async () => {
    let readAction = await ReadAction()
    readAction.should.eql({
      mainEntityOfPage: "ReadAction",
      name: "Read Error",
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("handles `url` ReadAction", async () => {
    let readAction = await ReadAction({ url: "./test/Action/readAction.json" })
    let expectedJSON = JSON.stringify(
      {
        description: "A ReadAction from `*.json` file test",
        identifier: "readAction",
        mainEntityOfPage: "ReadAction",
        name: "ReadAction Test",
        url: "https://ReadAction.theElioWay.com",
        ItemList: {
          itemListElement: [],
        },
      },
      null,
      2,
    )
    readAction.trim().should.eql(expectedJSON.trim())
  })
})
