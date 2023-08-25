import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * Writes `action.Action.object` to a JSON file.
 *
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "myThing" }
 * const result = await WriteAction({
 *    url: "myThing.json",
 *    Action: { object: engagedThing }
 * })
 * console.log(`File written: ${result.url}`)
 */

export const ViewAction = function ViewAction(action) {
  const mainEntityOfPage = "ViewAction"
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  action.Action.result = thing.ItemList.itemListElement.map(
    ({ identifier }) => identifier,
  )
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(action)
}
export default ViewAction
