import { pick } from "lodash-es"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * Writes `action.Action.object` to a JSON file.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "thing-0001", name: "My Name" }
 * const result = await QuoteAction({
 *    url: "myThing.json",
 *    Action: { object: engagedThing }
 * })
 * console.log(`File written: ${result.url}`)
 */
export const QuoteAction = fields =>
  async function QuoteAction(action) {
    const mainEntityOfPage = "QuoteAction"
    action = await Action({ ...action, mainEntityOfPage })
    action.Action.result = pick(cloneDeep(action.Action.object), fields)
    action.Action.actionStatus = "CompletedActionStatus"
    return await Message(action)
  }

export default QuoteAction
