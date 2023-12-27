import { should } from "chai";

import { cli } from "../src/cli.js";

should();

describe("function | cli", () => {
  it("returns nought", async () => {
    let thing = await cli();
    thing.should.eql({});
  });
  it("gets a Michael and give argv to `thing`", async () => {
    const originalArgs = process.argv;
    process.argv = [
      "/usr/bin/node",
      "/home/tim/Dev/elioway/elioangels/michael/bin/index.js",
      "identifier=testcli",
      "potentialAction=MichealAction",
      "sameAs=Bears",
      "Action.error=Not Found",
    ];
    let thing = await cli();
    thing.should.eql({
      identifier: "testcli",
      potentialAction: "MichealAction",
      sameAs: "Bears",
      Action: { error: "Not Found" },
    });
    process.argv = originalArgs;
  });
});
