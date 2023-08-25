import { pick } from "lodash-es"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * Writes `action.Action.object` to a JSON file.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "my-thing", name: "My Name" }
 * const result = await QuoteAction({
 *    url: "myThing.json",
 *    Action: { object: engagedThing }
 * })
 * console.log(`File written: ${result.url}`)
 */
export const QuoteAction = fields =>
  function QuoteAction(thing) {
    const mainEntityOfPage = "QuoteAction"
    action = Action({ ...action, mainEntityOfPage })
    let thing = ItemList(action.Action.object)
    action.Action.result = pick(thing, fields)
    action.Action.actionStatus = "CompletedActionStatus"
    return Message(thing)
  }

export default QuoteAction
