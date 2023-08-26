import { reject, matches } from "lodash-es"
import Action from "../../../../Thing/Action.js"
import ItemList from "../../../../Thing/Intangible/ItemList.js"
import Message from "../../../../Thing/CreativeWork/Message.js"

/** committing to/adopting an object.
 * @example
 * let AcceptAction = require("@elioway/michael/Action/OrganizeAction/AllocateAction/AcceptAction.js")
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 *
 * let engagedThing = { name: "Blue Thing" }
 * let action1 = await UpdateAction({
 *   Action: {
 *     object: engagedThing,
 *     instrument: "name:'Red Thing'"
 *   }
 * })
 * console.assert(
 *   action1.Action.object.name==='Blue Thing'
 *   action1.Action.result.name==='Red Thing'
 * )
 * let thing = AcceptAction(action1)
 * console.assert(
 *   thing.name==='Red Thing'
 * )
 */
export const AcceptAction = async function AcceptAction(action) {
  const mainEntityOfPage = "AcceptAction"
  action = await Action({ ...action, mainEntityOfPage })
  if (action.Action.actionStatus === "CompletedActionStatus") {
    return action.Action.object
  }
  return await Message(action)
}

export default AcceptAction
