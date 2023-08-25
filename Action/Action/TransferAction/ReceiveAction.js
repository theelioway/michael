import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * JSON.parse (`action.Action.object`) as a JSON string.
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error`
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let thing = '{\n "name": "myThing" \n}'
 * const results = await ReceiveAction({ Action: { object: thing } })
 * console.assert(results.Action.result.name === "myThing")
 */
export const ReceiveAction = function ReceiveAction(action) {
  const mainEntityOfPage = "ReceiveAction"
  action = Action({ ...action, mainEntityOfPage })
  action.ReceiveAction = action.ReceiveAction || {}
  action.ReceiveAction.deliveryMethod =
    action.ReceiveAction.deliveryMethod || ""
  action.ReceiveAction.sender = action.ReceiveAction.sender || ""
  if (action.ReceiveAction.deliveryMethod === "json") {
    action.Action.result = ItemList(JSON.parse(action.Action.object || "{}"))
  }
  action.Action.result = ItemList({ mainEntityOfPage })
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(action)
}

export default ReceiveAction
