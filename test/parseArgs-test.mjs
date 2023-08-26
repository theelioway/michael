import chai from "chai"
import { convertStringToType, parseArgs } from "../lib/parseArgs.js"

const should = chai.should()

describe("module | convertStringToType", () => {
  it("parses blank", () => {
    convertStringToType().should.eql("")
    convertStringToType("").should.eql("")
  })
  it("parses string numbers", () => {
    convertStringToType("1").should.eql(1)
    convertStringToType("1.0").should.eql(1.0)
  })
  it("parses real numbers", () => {
    convertStringToType(1).should.eql(1)
    convertStringToType(1.0).should.eql(1.0)
  })
  it("parses dates", () => {
    convertStringToType("2023-02-22").should.eql(
      new Date("2023-02-22T00:00:00.000Z"),
    )
  })
  it("parses strings", () => {
    convertStringToType("hello").should.eql("hello")
  })
})

describe("module | parseArgs", () => {
  it("parses blank", () => {
    parseArgs().should.eql({})
  })
  it("parses basics", () => {
    parseArgs(["x=1"]).should.eql({ x: 1 })
  })
  it("ignores non args", () => {
    parseArgs([
      "TestAction",
      "d=2023-10-11",
      "x=1",
      "y=x",
      "--help",
      "--tip=true",
      "-t=1",
      "-f",
      "z=",
      "=z",
    ]).should.eql({ d: new Date(Date.parse("2023-10-11")), x: 1, y: "x" })
  })
})
