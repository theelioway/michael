import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

const sendMailMock = action => Message({ ...action })

/** `CommunicateAction` which requires  final acceptance.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * const result1 = await Thing()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Thing")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "myThing" })
 * console.assert(result2.identifier==="myThing")
 * console.assert(result2.mainEntityOfPage==="Thing")
 * console.assert(result2.ItemList.itemListElement)
 */
export const CommunicateAction = action => {
  const mainEntityOfPage = "CommunicateAction"
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  thing = ItemList(thing)
  let message = Message(action)
  if (typeof action.Action.target === "function") {
    action.Action.result = action.Action.target(message)
  } else {
    action.Action.result = sendMailMock(message)
  }
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(receipt)
}

export default CommunicateAction
