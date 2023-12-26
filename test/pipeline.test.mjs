import { should } from "chai";

import { pipeline } from "../src/pipeline.js";

should();

const delayAsync = async (thing, ms) =>
  await new Promise((resolve) => setTimeout(() => resolve(thing), ms));
const delayPromise = (thing, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(thing), ms));

describe("test-util | delayAsync", () => {
  it("async awaiter", async () => {
    let MS = 500;
    let start = Date.now();
    await delayAsync({ identifier: "promiser" }, MS);
    let end = Date.now();
    let duration = end - start;
    duration.should.gt(MS - MS / 10);
    duration.should.lt(MS + MS / 10);
  });
  it("async then", async () => {
    let MS = 500;
    let start = Date.now();
    /** await  */ delayAsync({ identifier: "promiser" }, MS).then(
      (thenThing) => {
        let end = Date.now();
        let duration = end - start;
        duration.should.gt(MS - MS / 10);
        duration.should.lt(MS + MS / 10);
        thenThing.should.eql({ identifier: "promiser" });
        return true;
      },
    );
  });
});
describe("test-util | delayPromise", () => {
  it("await promiser", async () => {
    let MS = 500;
    let start = Date.now();
    await delayPromise({ identifier: "promiser" }, MS);
    let end = Date.now();
    let duration = end - start;
    duration.should.gt(MS - MS / 10);
    duration.should.lt(MS + MS / 10);
  });
  it("promiser then", async () => {
    let MS = 500;
    let start = Date.now();
    /** await  */ delayPromise({ identifier: "promiser" }, MS).then(
      (thenThing) => {
        let end = Date.now();
        let duration = end - start;
        duration.should.gt(MS - MS / 10);
        duration.should.lt(MS + MS / 10);
        thenThing.should.eql({ identifier: "promiser" });
        return true;
      },
    );
  });
});

describe("function | pipeline", () => {
  it("handles undefined actions", async () => {
    let pipelineThing = await pipeline({ identifier: "pipelineThing" });
    pipelineThing.should.eql({ identifier: "pipelineThing" });
  });
  it("processes a pipeline", async () => {
    let pipelineActions = [
      (thing) => new Object({ ...thing, potentialAction: "Resolve" }),
      (thing) => new Object({ ...thing, sameAs: "the" }),
      (thing) => new Object({ ...thing, url: "pipeline" }),
    ];
    let pipedThing = await pipeline(
      { identifier: "testMicheal" },
      pipelineActions,
    );
    pipedThing.should.eql({
      identifier: "testMicheal",
      potentialAction: "Resolve",
      sameAs: "the",
      url: "pipeline",
    });
  });
  it("pipes asyncronously", async () => {
    let MS = 50;
    let start = Date.now();
    let DelayAction = (num) => (action) => delayPromise(action, num * MS);
    await pipeline(
      { identifier: "testMicheal" },
      new Array(1, 2, 3, 4).map(DelayAction),
    );
    let end = Date.now();
    let duration = end - start;
    duration.should.gt(MS * 10 - MS);
    duration.should.lt(MS * 10 + MS);
  });
});
