import { parseArgs } from "./lib/index.js";

export const pipeline = async (thing, actions) => {
  thing = thing || {};
  actions = actions || [];
  return actions.reduce(async (prevAction, action) => {
    const prevThing = await prevAction;
    return action.Action.target(prevThing);
  }, Promise.resolve(thing));
};

export const callMicheal = async function (thing) {
  let [, , Thing, ...args] = process.argv;
  // default for no args
  thing = thing || {};
  args = args || [];
  // default first arg
  if (Thing) {
    if (Thing.includes("=")) {
      args.push(Thing);
      Thing = "Action";
    }
    if (Thing.startsWith("-")) {
      Thing = "Action";
    }
  } else {
    Thing = "Action";
  }
  let parsedArgs = parseArgs(args);
  thing = {
    Thing,
    ...thing,
  };
  Object.entries(parsedArgs).forEach(([path, value]) =>
    set(thing, path, value),
  );
  return thing;
};

export { parseArgs };

export const michael = async (thing, actions) => await pipeline(thing, actions);

export default michael;
