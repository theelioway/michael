import { isFunction } from "lodash-es"
import { default as ActionThing } from "../Thing/Action.js"

/**
 * @example
 * let Action = require("@elioway/michael/Action/Action.js")
 * const thing1 = await Action()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Action")
 * console.assert(!thing1.Action.object.identifier)
 * console.assert(!thing1.Action.result.identifier)
 * console.assert(thing1.Action.object.mainEntityOfPage==="Action")
 * console.assert(thing1.Action.result.mainEntityOfPage==="Action")
 * console.assert(
 *   thing1.Action.target(thing1.Action.object)===thing1.Action.result
 * )
 * *
 * const action2 = await Action({
 *   Action: {
 *     object: { identifier: "my-thing", name: "My test thing" },
 *     target: thing => new Object({
 *       ...thing,
 *       identifier: thing.identifier.toUpperCase()
 *     })
 *   }
 * })
 * console.assert(!action2.identifier)
 * console.assert(!action2.name)
 * console.assert(action2.mainEntityOfPage==="Action")
 * console.assert(action2.Action.object.identifier==="my-thing")
 * console.assert(action2.Action.object.name==="My test thing")
 * console.assert(action2.Action.result.identifier==="MY-THING")
 * console.assert(action2.Action.result.name==="My test thing")
 * console.assert(
 *   action2.Action.target(thing2.Action.object)==thing2.Action.result
 * )
 */
export const Action = function Action(action) {
  action = ActionThing(action)
  // Run the action
  if (isFunction(thing.Action.target)) {
    // Run the "action".
    action.Action.result = thing.Action.target(action.Action.object)
    // The default `actionStatus`.
    action.Action.actionStatus = "CompletedActionStatus"
  }
  return Message(action)
}

export default Action
