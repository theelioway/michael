import { should } from "chai"
import Thing from "../Thing.js"

should()

describe("module | Thing", () => {
  it("returns `thing` from blank", () => {
    Thing().should.eql({
      mainEntityOfPage: "Thing",
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("returns `thing` from `thing`", () => {
    Thing({ identifier: "thing" }).should.eql({
      identifier: "thing",
      mainEntityOfPage: "Thing",
      ItemList: {
        itemListElement: [],
      },
    })
  })
})
