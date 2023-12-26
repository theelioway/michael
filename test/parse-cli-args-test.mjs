import { should } from "chai";

import { parseCliArgs } from "../src/parse-cli-args.js";

should();

const EXPECTED = "found!";
const foundTransformer = () => EXPECTED;
const valueTransformer = (value) => value;
const parseToFound = parseCliArgs(foundTransformer);
const parseToValue = parseCliArgs(valueTransformer);

describe("function | parseCliArgs", () => {
  it("handles none", () => {
    parseToFound().should.eql({});
    parseToFound("").should.eql({});
    parseToFound(undefined).should.eql({});
  });
  it("handles args", () => {
    parseToFound(["x=0"]).should.eql({ x: EXPECTED });
    parseToFound(["x=1"]).should.eql({ x: EXPECTED });
    parseToFound(["x=true"]).should.eql({ x: EXPECTED });
    parseToFound(["x=false"]).should.eql({ x: EXPECTED });
    parseToFound(["x=fun"]).should.eql({ x: EXPECTED });
  });
  it("parses multiple", () => {
    parseToFound(["x=0", "y=1", "z=false"]).should.eql({
      x: EXPECTED,
      y: EXPECTED,
      z: EXPECTED,
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
    ]).should.eql({ x: EXPECTED, y: EXPECTED, z: EXPECTED });
  });
  it("handles dot notation", () => {
    parseToFound(["x.y.z=yo!"]).should.eql({ x: { y: { z: EXPECTED } } });
    parseToFound(["x.y=1", "x.z=yo!"]).should.eql({
      x: { y: EXPECTED, z: EXPECTED },
    });
  });
  it("parses value", () => {
    parseToValue(["a=[w,i,z,y]", "x=0", "y=1", "z=false"]).should.eql({
      a: "[w,i,z,y]",
      x: "0",
      y: "1",
      z: "false",
    });
  });
});
