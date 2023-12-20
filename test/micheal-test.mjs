import { should } from "chai";
import { cliThing, michael, pipeline } from "../michael.js";

should();

const delayAsync = async (thing, ms) =>
  await new Promise((resolve) => setTimeout(() => resolve(thing), ms));
const delayPromise = (thing, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(thing), ms));


describe("module | cliThing", () => {
  it("gets a Michael", async () => {
    let myMichael = await cliThing();
    myMichael.should.eql({ potentialAction: "Action" });
  });
  it("gets a Michael and give argv to `thing`", async () => {
    const originalArgs = process.argv;
    process.argv = [
      "/usr/bin/node",
      "/home/tim/Dev/elioway/elioangels/michael/bin/index.js",
      "MichealAction",
      "identifier=testcli",
      "sameAs=Bears",
      "Action.error=Not Found",
    ];
    let myMichael = await cliThing();
    myMichael.should.eql({
      identifier: "testcli",
      potentialAction: "MichealAction",
      sameAs: "Bears",
      Action: { error: "Not Found" },
    });
    process.argv = originalArgs;
  });
});

describe("module | michael", () => {
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

describe("module | pipeline", () => {
  it("pipeline not async endpoints", async () => {
    let pipelineThing = await pipeline({ identifier: "pipelineThing" });
    pipelineThing.should.eql({ identifier: "pipelineThing" });
  });
  it("promiser then", async () => {
    let MS = 500;
    let start = Date.now();
    await delayPromise({ identifier: "promiser" }, MS).then((thenThing) => {
      let end = Date.now();
      let duration = end - start;
      duration.should.gt(MS - MS / 10);
      duration.should.lt(MS + MS / 10);
      thenThing.should.eql({ identifier: "promiser" });
      return true;
    });
  });
  it("awaiter then", async () => {
    let MS = 500;
    let start = Date.now();
    await delayAsync({ identifier: "promiser" }, MS).then((thenThing) => {
      let end = Date.now();
      let duration = end - start;
      duration.should.gt(MS - MS / 10);
      duration.should.lt(MS + MS / 10);
      thenThing.should.eql({ identifier: "promiser" });
      return true;
    });
  });
  it("await awaiter", async () => {
    let MS = 500;
    let start = Date.now();
    await delayAsync({ identifier: "promiser" }, MS);
    let end = Date.now();
    let duration = end - start;
    duration.should.gt(MS - MS / 10);
    duration.should.lt(MS + MS / 10);
  });
  it("await promiser", async () => {
    let MS = 500;
    let start = Date.now();
    await delayPromise({ identifier: "promiser" }, MS);
    let end = Date.now();
    let duration = end - start;
    duration.should.gt(MS - MS / 10);
    duration.should.lt(MS + MS / 10);
  });
  it("pipeline promise endpoints", async () => {
    let MS = 50;
    let start = Date.now();
    await pipeline(
      { identifier: "testMicheal" },
      new Array(1, 2, 3, 4).map(
        (num) =>
          new Object({
            Action: {
              target: (thing) => delayPromise(thing, num * MS),
            },
          }),
      ),
    );
    let end = Date.now();
    let duration = end - start;
    duration.should.gt(MS * 10 - MS);
    duration.should.lt(MS * 10 + MS);
  });
});
