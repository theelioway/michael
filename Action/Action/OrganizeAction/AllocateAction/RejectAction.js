import { cloneDeep, reject, matches } from "lodash-es"
import Action from "../../../../Thing/Action.js"
import ItemList from "../../../../Thing/Intangible/ItemList.js"
import Message from "../../../../Thing/CreativeWork/Message.js"

/** The act of rejecting a `thing` in the `thing`'s list..
 * @example
 * let RejectAction = require("@elioway/michael/Action/OrganizeAction/AllocateAction/RejectAction.js")
 * let engagedThing = {
 *   ItemList: {
 *     itemListElement: [
 *       { identifier: 1, sameAs: "odd" },
 *       { identifier: 2, sameAs: "even" },
 *       { identifier: 3, sameAs: "odd" },
 *       { identifier: 4, sameAs: "even" },
 *       { identifier: 5, sameAs: "odd" },
 *       { identifier: 6, sameAs: "even" },
 *     ],
 *   },
 * }
 * const action = await RejectAction({
 *   Action: {
 *     object: engagedThing, instrument: "identifier:5"
 *   }
 * })
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement.length===5
 * )
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement[1].identifier===6
 * )
 */
export const RejectAction = async function RejectAction(action) {
  const mainEntityOfPage = "RejectAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.Action.result = cloneDeep(action.Action.object)
  action.Action.result.ItemList.itemListElement = reject(
    action.Action.object.ItemList.itemListElement,
    matches(action.Action.instrument),
  )
  action.Action.actionStatus = "CompletedActionStatus"
  return await Message(action)
}
export default RejectAction
