import { should } from "chai";
import { objectDotNotatedSet } from "@elioway/abdiel";

import { pipeActions } from "../src/pipe-actions.js";

should();

describe("function | pipeActions", () => {
  it("pipeActions `blank` with no `actions`", async () => {
    let pipedThing = await pipeActions();
    pipedThing.should.eql({
      mainEntityOfPage: "Action",
      Action: {
        actionStatus: "CompletedActionStatus",
        object: undefined,
        result: {},
      },
    });
  });
  it("pipeActions processes a pipeline", async () => {
    let ORIGINAL_THING = { identifier: "testMicheal" };
    let pipedThing = await pipeActions(ORIGINAL_THING, [
      (action) => objectDotNotatedSet(action, "Action.result.name", "NAME"),
      (action) => objectDotNotatedSet(action, "Action.result.sameAs", "SAMEAS"),
      (action) => objectDotNotatedSet(action, "Action.result.url", "URL"),
    ]);
    pipedThing.should.eql({
      mainEntityOfPage: "Action",
      Action: {
        actionStatus: "CompletedActionStatus",
        object: ORIGINAL_THING,
        result: {
          identifier: "testMicheal",
          name: "NAME",
          sameAs: "SAMEAS",
          url: "URL",
        },
      },
    });
    pipedThing.Action.object.should.equal(ORIGINAL_THING);
  });
});
