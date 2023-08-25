import fs from "fs/promises"
import { should } from "chai"
import WriteAction from "../../Thing/Action/WriteAction.js"

should()

describe("module | WriteAction", () => {
  it("handles `url`-less WriteAction", async () => {
    let writeAction = await WriteAction()
    writeAction.should.eql({
      mainEntityOfPage: "WriteAction",
      name: "Write Error",
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("handles `url` WriteAction", async () => {
    const filePath = "./test/Action/writeAction.json"
    // Delete the file
    try {
      await fs.unlink(filePath)
    } catch (error) {}
    // Rewrite the file
    let writeAction = await WriteAction({ url: filePath })
    // File Exists
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false)
    // Tests
    fileExists.should.eql(true)
    writeAction.should.eql({
      mainEntityOfPage: "WriteAction",
      url: filePath,
      ItemList: {
        itemListElement: [],
      },
    })
  })
})
