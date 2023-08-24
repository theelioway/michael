import { join, set } from "lodash-es"
import ItemList from "./Intangible/ItemList.js"

/** Action: Creates a new Action of `thing.Action.actionStatus`=`ActionStatusType`.
 *
 * - @required `thing.Action.object` as the thing needing to be actioned.
 * @returns {Thing} actioned as `thing.Action.result`
 */


/**
 * Writes `action.Action.object` to a JSON file.
 *
 * @param {Object_ActionThing} action - The `action` object.
 *   - {@link Object_Thing_ActionThing#url} - The path to the file.
 *   - {@link Object_Thing_ActionThing#Action.object} - The `thing` to write.
 * @mutates {Object_Thing} action.Action.object
 * @into {Object_Thing} action.Action.result
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error` 
 * @example
 * let thing = { identifier: "myThing" }
 * const result = await WriteAction({ 
 *    url: "myThing.json", 
 *    Action: { object: thing }
 * })
 * console.log(`File written: ${result.url}`)
 */
export const Action = action => {
  const mainEntityOfPage = "Action"
  action = ItemList(action)
  action.mainEntityOfPage = action.mainEntityOfPage || mainEntityOfPage
  const actionName = action.mainEntityOfPage.slice(0, -6)
  action.Action = thing.Action || {}
  action.Action.object = thing.Action.object || action
  action.Action.instrument = thing.Action.instrument || ""
  thing = ItemList(action.Action.object)
  return new Object({
    ...action,    
    description:join( [actionName,"[", thing.Action.instrument , "]"], " ")    .trim().replace("[  ]", ""),
    name:join( [thing.identifier, actionName, "Results"]).trim(),
    Action: {
      ...action.Action,
      // Default Start Action
      actionStatus: "PotentialActionStatus",
      // The `thing` to use as the object of the action. 
      object: thing,
      // The endpoint: takes `thing` as parameter and returns a `thing`.
      target: thing =>
        set(thing || {}, "Action.actionStatus", "CompletedActionStatus"),
    },
  })
}

export default Action
