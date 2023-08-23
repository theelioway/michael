import { should } from "chai"
import DiscoverAction from "../../Thing/Action/DiscoverAction.js"

should()

describe("module | DiscoverAction", () => {
  it("DiscoverActions", () => {
    DiscoverAction().should.eql({
      description: `Discover ""`,
      mainEntityOfPage: "DiscoverAction",
      name: "Discover Results",
      Action: {
        instrument: "",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })
  it("DiscoverActions", () => {
    DiscoverAction({
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
      description: 'Discover "sameAs:Dog,alternateType:Small"',
      mainEntityOfPage: "DiscoverAction",
      name: "Discover Results",
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
