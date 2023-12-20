import { should } from "chai";
import { parseCliArgs } from "../lib/parse-cli-args.js";

should();

const transformer = () => "found!";
const parseToFound = parseCliArgs(transformer);

describe("function | parseCliArgs", () => {
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
