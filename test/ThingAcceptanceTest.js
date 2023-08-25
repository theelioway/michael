import { set } from "lodash-es"
import chai from "chai"

const should = chai.should()

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
mochaSuite("POST /Thing", () => {
  it("tests something requiring the app and mongoose servers", done => {
    chai
      .request(app)
      .get("/Thing/20")
      .end((err, res) => {
        res.body.name.equals("Thing 20, bady")
        done()
      })
  })
})
* ============================================================================ *
* @param {Function} Thing as an enpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ThingAcceptanceTest = async Thing => {
  let typeName = Thing.name
  describe(`${typeName} Acceptance Test`, () => {
    // const Action = (thing) => set(thing, "Action.actionStatus", "ActiveActionStatus")
    // before(async () => {})
    // beforeEach(async () => {})
    // after(async () => { })
    // afterEach(async () => { })

    it.only("returns a `thing` from undefined input", async () => {
      let thing = await Thing()
      should.equal(thing.identifier, undefined)
      thing.mainEntityOfPage.should.be.eql(typeName)
      thing.ItemList.itemListElement.should.be.eql([])
    })
    it.only(`returns the \`thing\` that was input`, async () => {
      let thing = await Thing({ identifier: "thing" })
      thing.identifier.should.be.eql("thing")
      thing.mainEntityOfPage.should.be.eql(typeName)
      thing.ItemList.itemListElement.should.be.eql([])
    })

    // testsCallBack()
  })
}

export default ThingAcceptanceTest
