import { join } from "lodash-es"
import CreativeWork from "../CreativeWork.js"

const ACTIONSTATUSMESSAGE = {
  ActiveActionStatus: "in-progress",
  CompletedActionStatus: "already taken place",
  FailedActionStatus: "failed to complete",
  PotentialActionStatus: "supported",
}

/** Message: A single message from a sender to one or more organizations or people.
 * @example
 * import Action from "@elioway/michael/Action.js"
 * import Thing from "@elioway/thing/Thing.js"
 * import Message from "@elioway/thing/Message.js"
 * const thing1 = await Thing()
 * const action1 = await Action(thing1)
 * const message1 = await Message(action1)
 * console.assert(!message1.identifier)
 * console.assert(message1.mainEntityOfPage==="Message")
 * console.assert(!IsNaN(new Date(message1.Message.dateSent)))
 * console.assert(message1.Message.recipient==="thing@theElioWay.com")
 * console.assert(message1.Message.sender==="thing@theElioWay.com")
 */
export const Message = async function Message(thing) {
  const mainEntityOfPage = "Message"
  thing = await CreativeWork({ ...thing, mainEntityOfPage })
  let message = mainEntityOfPage
  thing.Message = thing.Message || {}
  thing.Message.dateSent = new Date(Date.now()).toISOString()
  if (thing.Action) {
    message = ACTIONSTATUSMESSAGE[action.Action.object]
    thing.CreativeWork.about = action.Action.object
    thing.CreativeWork.abstract = message
    thing.CreativeWork.sender = action
  }
  return new Object({
    ...thing,
    description: join([thing.description, message], " ").trim(),
    name: join([thing.name, message], " ").trim(),
  })
}

export default Message
