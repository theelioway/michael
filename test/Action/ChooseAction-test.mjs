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
        actionOption: "sameAs:Dog,additionalType:Small",
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
      sameAs: "Dog",
      identifier: "Poodle",
      additionalType: "Small",
    })
  })
})
