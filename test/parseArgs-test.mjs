import { should } from "chai";
import { parseArgs } from "../lib/parseArgs.js";

should();

const transformer = () => "found!";
const parseToFound = parseArgs(transformer);

describe("function | parseArgs", () => {
  it("handles none", () => {
    parseToFound().should.eql({});
    parseToFound("").should.eql({});
    parseToFound(undefined).should.eql({});
  });
  it("handles args", () => {
    parseToFound().should.eql({});
    parseToFound(["x=0"]).should.eql({ x: "found!" });
    parseToFound(["x=1"]).should.eql({ x: "found!" });
    parseToFound(["x=true"]).should.eql({ x: "found!" });
    parseToFound(["x=false"]).should.eql({ x: "found!" });
    parseToFound(["x=fun"]).should.eql({ x: "found!" });
  });
  it("parses nultiple", () => {
    parseToFound(["x=0 y=1 z=false"]).should.eql({
      x: "found!",
      y: "found!",
      z: "found!",
    });
  });
  it("ignores non args", () => {
    parseToFound([
      "TestAction",
      "--tip=true",
      "x=2023-10-11",
      "--help",
      "y=1",
      "z=x",
      "-t=1",
      "-f",
      "z=",
      "=z",
    ]).should.eql({ x: "found!", y: "found!", z: "found!" });
  });
});
