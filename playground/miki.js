// How **micheal** works in a nutshell.

// Just a random function used below to illustrate the non-uniformity of the "curry" functions.
const getTwo = () => "2";

// `a` `b` and `c` "curry" the exactly uniform lower-order functions which take a `thing`
// and return a `thing`.
const curryA =
  (...args) =>
  (thing) =>
    new Object({ ...thing, a: [...args] });
const curryB = (func) => (thing) => new Object({ ...thing, b: func() });
const curryC = (obj) => (thing) => new Object({ ...thing, ...obj });

// `func` in each reduction is the lower-order `(thing) => new Object({ ...thing, ..stuff })`
// part of the above compositions.
const pipeline = (thing, funcs) =>
  funcs.reduce((accumulatedThing, func) => func(accumulatedThing), thing);

// Next we call the higher-order function which "curry" the lower-order functions
// that will be called during the `reduce` command in the pipeline.
const thing = pipeline({ id: "thing" }, [
  curryA("fi", "fo", "three"),
  curryB(getTwo),
  curryC({ c: 1 }),
]);

console.log({ thing });
