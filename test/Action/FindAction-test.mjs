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
        instrument: "sameAs:Dog,additionalType:Small",
      },
      ItemList: {
        itemListElement: [
          { sameAs: "Dog", identifier: "Alsation", additionalType: "Big" },
          { sameAs: "Cat", identifier: "Siamese", additionalType: "Small" },
          { sameAs: "Cat", identifier: "Tabby", additionalType: "Small" },
          { sameAs: "Dog", identifier: "Poodle", additionalType: "Small" },
          { sameAs: "Dog", identifier: "Terrier", additionalType: "Small" },
        ],
      },
    }).should.eql({
      description: 'Find "sameAs:Dog,additionalType:Small"',
      mainEntityOfPage: "FindAction",
      name: "Find Results",
      Action: {
        instrument: "sameAs:Dog,additionalType:Small",
      },
      ItemList: {
        itemListElement: [
          { sameAs: "Dog", identifier: "Poodle", additionalType: "Small" },
          { sameAs: "Dog", identifier: "Terrier", additionalType: "Small" },
        ],
      },
    })
  })
})
