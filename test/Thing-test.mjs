import { should } from "chai"
import Thing from "../Thing.js"

should()

describe("module | Thing", () => {
  it.only("returns `thing` from blank", () => {
    Thing().should.eql({
      mainEntityOfPage: "Thing",
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it.only("returns `thing` from `thing`", () => {
    Thing({ identifier: "thing" }).should.eql({
      identifier: "thing",
      mainEntityOfPage: "Thing",
      ItemList: {
        itemListElement: [],
      },
    })
  })
})
