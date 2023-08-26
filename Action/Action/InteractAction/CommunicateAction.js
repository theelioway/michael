import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

const sendMailMock = action => Promise.resolve(Message(action))

/** `CommunicateAction` which requires  final acceptance.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * const thing1 = await Thing()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Thing")
 * console.assert(thing1.ItemList.itemListElement)
 *
 * const thing2 = await Thing({ identifier: "myThing" })
 * console.assert(thing2.identifier==="myThing")
 * console.assert(thing2.mainEntityOfPage==="Thing")
 * console.assert(thing2.ItemList.itemListElement)
 */
export const CommunicateAction = async function CommunicateAction(action) {
  const mainEntityOfPage = "CommunicateAction"
  action = await Action({ ...action, mainEntityOfPage })
  let message = await Message(action)
  if (typeof action.Action.target === "function") {
    action.Action.result = action.Action.target(message)
  } else {
    action.Action.result = await sendMailMock(message)
  }
  action.Action.actionStatus = "CompletedActionStatus"
  return await Message(receipt)
}

export default CommunicateAction
