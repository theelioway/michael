import { isString, join, set } from "lodash-es"
import { parseArgs } from "../lib/index.js"
import ItemList from "./Intangible/ItemList.js"
import Thing from "../Thing.js"

/**
 * An action performed by a direct agent and indirect participants upon
 * a direct object.
 * @example
 * let Action = require("@elioway/michael/Thing/Action.js") *
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
 *    Action: { object: { identifier: "thing-0001" } }
 * })
 * console.assert(!thing2.identifier)
 * console.assert(thing2.mainEntityOfPage==="Action")
 * console.assert(thing2.Action.object.identifier==="thing")
 * console.assert(thing2.Action.result.identifier==="thing")
 * console.assert(thing2.Action.target(thing2.Action.object)===thing2.Action.result)
 */
export const Action = async function Action(thing) {
  const mainEntityOfPage = "Action"
  thing = await ItemList(thing)
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage
  const default_action = object =>
    set(object, "Action.actionStatus", "CompletedActionStatus")
  // default parameters of Action
  thing.Action = thing.Action || {}
  // an `Object` to use for `whatever` by `target` function.
  thing.Action.instrument = thing.Action.instrument || ""
  if (isString(thing.Action.instrument)) {
    thing.Action.instrument = parseArgs(thing.Action.instrument.split(","), ":")
  }
  // The `thing` to use as the object of an action.
  thing.Action.object = await ItemList(thing.Action.object || (await Thing()))
  // The `result` leave.
  // thing.Action.result = {}
  // The `target` function for actioning a `thing`.
  thing.Action.target = thing.Action.target || default_action
  // The default `actionStatus`.
  thing.Action.actionStatus =
    thing.Action.actionStatus || "PotentialActionStatus"
  // The least `action`.
  return new Object({
    ...thing,
    description: join(
      [
        mainEntityOfPage,
        " [instrument:",
        JSON.stringify(thing.Action.instrument),
        "]",
      ],
      "",
    ).trim(),
    name: join(
      [
        thing.Action.object.identifier,
        thing.Action.object.mainEntityOfPage,
        mainEntityOfPage,
      ],
      " ",
    ).trim(),
  })
}

export default Action
