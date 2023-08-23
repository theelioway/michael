import { should } from "chai"
import SearchAction from "../../Thing/Action/SearchAction.js"

should()

describe("module | SearchAction", () => {
  it("the least SearchAction for a `thing` undefined", () => {
    SearchAction().should.eql({
      description: 'Search ""',
      mainEntityOfPage: "SearchAction",
      name: "Search Results",
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("SearchAction on list", () => {
    SearchAction({
      SearchAction: { query: "identifier:2" },
      ItemList: {
        itemListElement: new Array(1, 2, 3).map(
          id => new Object({ identifier: id }),
        ),
      },
    }).should.eql({
      description: 'Search "identifier:2"',
      mainEntityOfPage: "SearchAction",
      name: "Search Results",
      ItemList: {
        itemListElement: [{ identifier: 2 }],
      },
    })
  })
})
