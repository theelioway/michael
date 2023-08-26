import { set } from "lodash-es"
import chai from "chai"

const should = chai.should()

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Thing from "../Thing.js"
ItemListAcceptanceTest(Thing)
* ============================================================================ *
* @param {Function} Thing as an endpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ItemListAcceptanceTest = async ItemList => {
  let typeName = ItemList.name
  describe(`${typeName} Acceptance Test`, () => {
    it("returns `ItemList` for undefined `thing`", async () => {
      let thing = await ItemList()
      thing.ItemList.itemListElement.should.be.eql([])
    })
    it("returns `ItemList` for defined `thing`", async () => {
      let thing = await ItemList({ identifier: "thing" })
      thing.ItemList.itemListElement.should.be.eql([])
    })
    it("returns `ItemList` undisturbed", async () => {
      let thing = await ItemList({
        ItemList: {
          itemListElement: [
            { identifier: "0001" },
            { identifier: "0002" },
            { identifier: "0002" },
          ],
        },
      })
      thing.ItemList.itemListElement.should.be.eql([
        { identifier: "0001" },
        { identifier: "0002" },
        { identifier: "0002" },
      ])
    })

    // testsCallBack()
  })
}

export default ItemListAcceptanceTest
