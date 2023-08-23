import { should } from "chai"
import FindAction from "../../Thing/Action/FindAction.js"

should()

describe("module | FindAction", () => {
  it("the least FindAction  for a `thing` undefined", () => {
    FindAction().should.eql({
      description: `Find ""`,
      mainEntityOfPage: "FindAction",
      name: "Find Results",
      Action: {
        instrument: "",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("FindActions", () => {
    FindAction({
      Action: {
        instrument: "sameAs:Dog,alternateType:Small",
      },
      ItemList: {
        itemListElement: [
          { sameAs: "Dog", identifier: "Alsation", alternateType: "Big" },
          { sameAs: "Cat", identifier: "Siamese", alternateType: "Small" },
          { sameAs: "Cat", identifier: "Tabby", alternateType: "Small" },
          { sameAs: "Dog", identifier: "Poodle", alternateType: "Small" },
          { sameAs: "Dog", identifier: "Terrier", alternateType: "Small" },
        ],
      },
    }).should.eql({
      description: 'Find "sameAs:Dog,alternateType:Small"',
      mainEntityOfPage: "FindAction",
      name: "Find Results",
      Action: {
        instrument: "sameAs:Dog,alternateType:Small",
      },
      ItemList: {
        itemListElement: [
          { sameAs: "Dog", identifier: "Poodle", alternateType: "Small" },
          { sameAs: "Dog", identifier: "Terrier", alternateType: "Small" },
        ],
      },
    })
  })
})
