import { cloneDeep } from "lodash-es"
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

export const ViewAction = async function ViewAction(action) {
  const mainEntityOfPage = "ViewAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.Action.result = cloneDeep(action.Action.object)
  action.Action.result.ItemList.itemListElement =
    action.Action.object.ItemList.itemListElement.map(
      ({ identifier }) => identifier,
    )
  action.Action.actionStatus = "CompletedActionStatus"
  return await Message(action)
}
export default ViewAction
