import { objectCloner } from  "@elioway/abdiel";
import { parseCliArgs } from "./lib/index.js";

const thingCloner = (object) => Object.assign({
   ...object,
   ItemList: {
     ...object.ItemList,
     itemListElement: object.ItemList.itemListElement.map(objectCloner),
   },
 })

export const cliThing = function (thing) {
  let [, , ...args] = process.argv;
  let parsedArgs = parseCliArgs(String)(args || []);
  return Object.assign({}, thingCloner(thing), parsedArgs);
};

export const cliAction = function (thing) {
  let [, , ...args] = process.argv;
  let parsedArgs = parseCliArgs(String)(args || []);
  return Object.assign({}, action, {
    mainEntityOfPage: "Action",
    Action: {
      actionStatus: "CompletedActionStatus",
      instrument: JSON.stringify(parsedArgs),
      object: thing,
      result: thingCloner(thing),
    },
  })
};

export const actionPipeline = async (action, actions) => {
  actions = actions || [];
  return actions.reduce(async (prevAction, nextAction) => {
    const prevResult = await prevAction;
    if (prevResult.Action && prevResult.Action.actionStatus==="FailedActionStatus") {
      throw Error(prevResult.Action.error || prevResult.Action.actionStatus)
    } else {
      prevResult.Action.result = thingCloner(prevResult.Action.result)
    }
    return nextAction(prevResult);
  }, Promise.resolve(action));
};

export const michael = async (thing, actions) => await actionPipeline(cliAction(thing), actions);

export { parseCliArgs };

export default michael;

