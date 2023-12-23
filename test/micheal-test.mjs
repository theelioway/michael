import { should } from "chai";

import { michael } from "../src/michael.js";

should();

describe("function | michael", () => {
  it("michael `blank` with no `actions`", async () => {
    let michaeledThing = await michael();
    michaeledThing.should.eql({});
  });
  it("michael processes a pipeline", async () => {
    let pipelineActions = [
      {
        Action: {
          target: (thing) =>
            new Object({ ...thing, potentialAction: "Resolve" }),
        },
      },
      {
        Action: {
          target: (thing) => new Object({ ...thing, sameAs: "the" }),
        },
      },
      {
        Action: {
          target: (thing) => new Object({ ...thing, url: "pipeline" }),
        },
      },
    ];
    let michaeledThing = await michael(
      { identifier: "testMicheal" },
      pipelineActions,
    );
    michaeledThing.should.eql({
      identifier: "testMicheal",
      potentialAction: "Resolve",
      sameAs: "the",
      url: "pipeline",
    });
  });
});
