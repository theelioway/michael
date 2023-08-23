import { should } from "chai"
import ChooseAction from "../../Thing/Action/ChooseAction.js"

should()

describe("module | ChooseAction", () => {
  it("the least ChooseAction for a `thing` undefined", () => {
    ChooseAction().should.eql({
      mainEntityOfPage: "ChooseAction",
      description: "Search ",
      name: "Choose Error",
      Action: {
        error: "Nothing found.",
        actionStatus: "FailedActionStatus",
      },
      ChooseAction: {
        actionOption: "",
      },
      ItemList: {
        itemListElement: [],
      },
    })
  })

  it("ChooseAction first `thing`", () => {
    ChooseAction({
      ChooseAction: {
        actionOption: "sameAs:Dog,alternateType:Small",
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
      sameAs: "Dog",
      identifier: "Poodle",
      alternateType: "Small",
    })
  })
})
