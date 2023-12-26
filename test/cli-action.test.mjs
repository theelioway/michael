import { should } from "chai";

import { cliAction } from "../src/cli-action.js";

should();

describe("function | cliAction", () => {
  it("a basic action", async () => {
    let action = await cliAction(undefined);
    action.should.eql({
      mainEntityOfPage: "Action",
      Action: {
        actionStatus: "CompletedActionStatus",
        object: undefined,
        result: {},
      },
    });
  });
  it("`thing` cloned to `object` and `result`", async () => {
    let action = await cliAction({ potentialAction: "ReadAction" });
    action.should.eql({
      mainEntityOfPage: "Action",
      Action: {
        actionStatus: "CompletedActionStatus",
        object: { potentialAction: "ReadAction" },
        result: { potentialAction: "ReadAction" },
      },
    });
    action.Action.object.should.not.equal(action.Action.result);
  });
  it("handles argv to `action`", async () => {
    const originalArgs = process.argv;
    process.argv = [
      "/usr/bin/node",
      "/home/tim/Dev/elioway/elioangels/michael/bin/index.js",
      "identifier=test-cliAction",
      "potentialAction=cliAction",
      "sameAs=command",
      "Action.error=Not Found",
    ];
    let thing = { identifier: "test-thing", name: "thing", sameAs: "expected" };
    let action = await cliAction(thing);
    action.should.eql({
      identifier: "test-cliAction",
      mainEntityOfPage: "Action",
      potentialAction: "cliAction",
      sameAs: "command",
      Action: {
        actionStatus: "CompletedActionStatus",
        error: "Not Found",
        object: thing,
        result: thing,
      },
    });
    process.argv = originalArgs;
  });
});
