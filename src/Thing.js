import { parseCliArgs } from "../lib/index.js";

export const Thing = (thingCloner) => function (thing) {
  let [, , ...args] = process.argv;
  let parsedArgs = parseCliArgs(String)(args || []);
  return Object.assign({}, thingCloner(thing), parsedArgs);
};

export default Thing;
