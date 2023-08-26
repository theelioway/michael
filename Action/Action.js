import { isFunction, join } from "lodash-es"
import { default as ActionThing } from "../Thing/Action.js"
import Message from "../Thing/CreativeWork/Message.js"

/**
 * @example
 * let Action = require("@elioway/michael/Action/Action.js")
 * const action1 = await Action()
 * console.assert(!action1.identifier)
 * console.assert(action1.mainEntityOfPage==="Action")
 * console.assert(!action1.Action.object.identifier)
 * console.assert(!action1.Action.result.identifier)
 * console.assert(action1.Action.object.mainEntityOfPage==="Action")
 * console.assert(action1.Action.result.mainEntityOfPage==="Action")
 * console.assert(
 *   action1.Action.target(action1.Action.object)===action1.Action.result
 * )
 * *
 * const action2 = await Action({
 *   Action: {
 *     object: { identifier: "thing-0001", name: "My Test Thing" },
 *     target: thing => new Object({
 *       ...thing,
 *       identifier: thing.identifier.toUpperCase()
 *     })
 *   }
 * })
 * console.assert(!action2.identifier)
 * console.assert(!action2.name)
 * console.assert(action2.mainEntityOfPage==="Action")
 * console.assert(action2.Action.object.identifier==="thing-0001")
 * console.assert(action2.Action.object.name==="My Test Thing")
 * console.assert(action2.Action.result.identifier==="THING-0001")
 * console.assert(action2.Action.result.name==="My Test Thing")
 * console.assert(
 *   action2.Action.target(action2.Action.object)==action2.Action.result
 * )
 */
export const Action = async function Action(action) {
  action = await ActionThing(action)
  // Run the action
  if (isFunction(action.Action.target)) {
    // Run the "action".
    action.Action.result = action.Action.target(action.Action.object)
    // The default `actionStatus`.
    action.Action.actionStatus = "CompletedActionStatus"
    action.name = join(
      [
        action.Action.object.identifier,
        action.Action.object.mainEntityOfPage,
        action.mainEntityOfPage,
      ],
      " ",
    ).trim()
  }
  return await Message(action)
}

export default Action
