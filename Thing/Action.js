/** Action: flesh out a default or a new Action endpoint which can be used to transform a given `thing` */
import { join, set } from "lodash-es"
import ItemList from "./Intangible/ItemList.js"
import { parseArgs } from "../lib/index.js"

/**
 * Prepares an `action` with the data needed to perform an action on the `thing`
 *
 * @param {Object_Thing} thing - The `thing` object. *
 * @mutates {Object_Thing} `thing`
 * @into {Object_Thing} `action.Action.object`  `action.Action.result`
 * @returns {Object_ActionThing} The new `action` object.
 * - {@link Object_ActionThing#Action.error} For failed actions, more information on the cause of the failure.
 * - {@link Object_ActionThing#Action.instrument} The object that helped the agent perform the action.
 * - {@link Object_ActionThing#Action.object} The object upon which the action is carried out, whose state is kept intact or changed.
 * - {@link Object_ActionThing#Action.target} Indicates a target EntryPoint for an Action.
 * - {@link Object_ActionThing#Action.result} The `thing` produced in the action.
 * - {@link Object_ActionThing#Action.target} Indicates a target EntryPoint for an Action.
 * @throws {Object_Message} `message.Action.error`
 * @example
 * let Action = require("@elioway/michael/Thing/Action.js")
 *
 * const thing1 = await Action()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Action")
 * console.assert(!thing1.Action.object.identifier)
 * console.assert(!thing1.Action.result.identifier)
 * console.assert(thing1.Action.object.mainEntityOfPage==="Action")
 * console.assert(thing1.Action.result.mainEntityOfPage==="Action")
 * console.assert(thing1.Action.target(thing1.Action.object)===thing1.Action.result)
 *
 *
 * const thing2 = await Action({
 *    Action: { object: { identifier: "my-thing" } }
 * })
 * console.assert(!thing2.identifier)
 * console.assert(thing2.mainEntityOfPage==="Action")
 * console.assert(thing2.Action.object.identifier==="thing")
 * console.assert(thing2.Action.result.identifier==="thing")
 * console.assert(thing2.Action.target(thing2.Action.object)===thing2.Action.result)
 */
export const Action = thing => {
  const mainEntityOfPage = "Action"
  // "thingify" incoming thing
  thing = ItemList(thing)
  const default_action = object =>
    set(object, "Action.actionStatus", "CompletedActionStatus")
  // "thingify" new action
  let action = ItemList({ mainEntityOfPage })
  // default parameters of Action
  action.Action = {}
  // an `Object` to use for `whatever` by `target` function.
  action.Action.instrument = thing.Action.instrument || ""
  action.Action.instrument = parseArgs(action.Action.instrument.split(","), ":")
  // The `thing` to use as the object of an action.
  action.Action.object = thing
  // The `result` (defaulting to the same "unactioned" `thing`).
  action.Action.result = thing
  // The `target` function for actioning a `thing`.
  action.Action.target = thing.Action.target || default_action
  // The default `actionStatus`.
  action.Action.actionStatus = "PotentialActionStatus"
  // The least `action`.
  return new Object({
    ...action,
    description: join(
      [
        mainEntityOfPage,
        " [Action.instrument:",
        JSON.stringify(action.Action.instrument),
        "]",
      ],
      "",
    )
      .trim()
      .replace("[Action.instrument:]", "")
      .replace("[Action.instrument:{}]", ""),
    name: join([thing.identifier, mainEntityOfPage, " Result(s)"], "").trim(),
  })
}

export default Action
