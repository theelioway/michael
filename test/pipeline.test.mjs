import { should } from "chai";

import { pipeline } from "../src/pipeline.js";

should();

const delayAsync = async (thing, ms) =>
  await new Promise((resolve) => setTimeout(() => resolve(thing), ms));
const delayPromise = (thing, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(thing), ms));

describe("function | pipeline", () => {
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
