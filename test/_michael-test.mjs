"use strict";
import { should } from "chai";
import michael from "../michael.js";

should();

describe("module | michael", () => {
  it("exports these functions", async () => {
    let oldab = await michael();
    Object.keys(oldab).should.be.eql([
      "cli",
      "cliAction",
      "makePipeline",
      "parseCliArgs",
      "pipeActions",
      "pipeline",
    ]);
  });
});
