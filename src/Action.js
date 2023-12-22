import { parseCliArgs } from "../lib/index.js";

export const Action = (action) =>  function (thing) {
  let [, , ...args] = process.argv;
  let parsedArgs = parseCliArgs(String)(args || []);
  return Object.assign({}, action, {
    mainEntityOfPage: "Action",
    Action: {
      actionStatus: "CompletedActionStatus",
      instrument: JSON.stringify(parsedArgs),
      object: thing,
      result: action.Action.thingCloner(thing),
    },
  });
};

export default Action;
