import { should } from "chai"
import ViewAction from "../../Thing/Action/ViewAction.js"

should()

describe("module | ViewAction", () => {
  it("blank ViewAction", () => {
    ViewAction().should.eql({
      mainEntityOfPage: "ViewAction",
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("ViewAction list summary", () => {
    ViewAction({
      ItemList: {
        itemListElement: new Array("1", "2", "3").map(
          id => new Object({ identifier: id }),
        ),
      },
    }).should.eql({
      mainEntityOfPage: "ViewAction",
      ItemList: {
        itemListElement: ["1", "2", "3"],
      },
    })
  })
  it("ViewAction logs all", () => {
    ViewAction({
      alternateName: "ViewAction, the elioWay",
      identifier: "thing",
      mainEntityOfPage: "Thing",
      Action: {
        actionStatus: "PotentialActionStatus",
      },
      ItemList: {
        itemListElement: new Array("1", "2", "3").map(
          id => new Object({ identifier: id }),
        ),
      },
    }).should.eql({
      alternateName: "ViewAction, the elioWay",
      identifier: "thing",
      mainEntityOfPage: "Thing",
      Action: {
        actionStatus: "PotentialActionStatus",
      },
      ItemList: {
        itemListElement: ["1", "2", "3"],
      },
    })
  })
})
