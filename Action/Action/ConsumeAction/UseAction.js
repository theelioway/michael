import { isString, isMatch } from "lodash-es"
import { parseArgs } from "../../../lib/index.js"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * The act of applying an object to its intended purpose.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let UseAction = require("@elioway/michael/Action/ConsumeAction/UseAction.js")
 * let engagedThing = { identifier: "thing-0001", name: "My new thing." }
 * const action1 = await UpdateAction({
 *   Action: { instrument: "name:hello", object: engagedThing },
 * })
 * let action2 = UseAction({
 *   UseAction: { actionAccessibilityRequirement: "identifier:thing-0002" },
 *   ...action1
 * })
 * console.assert(
 *   isEmpty(action2.Action.result)
 * )
 * let action3 = UseAction({
 *   UseAction: { actionAccessibilityRequirement: "identifier:thing-0002" },
 *   ...action1
 * })
 * console.assert(
 *   action3.Action.result.identifier === "thing-0001"
 * )
 * console.assert(
 *   action3.Action.result.name === "hello"
 * )
 */
export const UseAction = async function (action) {
  const mainEntityOfPage = "UseAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.UseAction.actionAccessibilityRequirement =
    action.UseAction.actionAccessibilityRequirement || ""
  if (isString(action.UseAction.actionAccessibilityRequirement)) {
    action.UseAction.actionAccessibilityRequirement = parseArgs(
      action.UseAction.actionAccessibilityRequirement.split(","),
      ":",
    )
  }
  if (
    isMatch(
      action.Action.result,
      action.UseAction.actionAccessibilityRequirement,
    )
  ) {
    action.Action.actionStatus = "CompletedActionStatus"
  } else {
    action.expectsAcceptanceOf.Offer.itemOffered = action.Action.result
    action.Action.result = {}
    action.Action.actionStatus = "FailedActionStatus"
  }
  return await Message(action)
}
