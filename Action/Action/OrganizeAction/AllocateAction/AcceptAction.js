import { reject, matches } from "lodash-es"
import Action from "../../../../Thing/Action.js"
import ItemList from "../../../../Thing/Intangible/ItemList.js"
import Message from "../../../../Thing/CreativeWork/Message.js"

/** The act of committing to/adopting an object.
 * @example
 * let AcceptAction = require("@elioway/michael/Action/OrganizeAction/AllocateAction/AcceptAction.js")
 * let engagedThing = {
 *   ItemList: {
 *     itemListElement: [
 *       { identifier: 1, sameAs: "odd" },
 *       { identifier: 2, sameAs: "even" },
 *       { identifier: 3, sameAs: "odd" },
 *       { identifier: 4, sameAs: "even" },
 *       { identifier: 5, sameAs: "odd" },
 *       { identifier: 6, sameAs: "even" }
 *     ]
 *   }
 * }
 * const action = await AcceptAction({
 *   Action: {
 *     object: engagedThing, instrument: "identifier:7,sameAs:odd"
 *   }
 * })
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement.length===7
 * )
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement[6].identifier===7
 * )
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement[6].sameAs==="odd"
 * )
 */
export const RejectAction = function RejectAction(action) {
  const mainEntityOfPage = "RejectAction"
  action = Action({ ...action, mainEntityOfPage })
  const thing = ItemList(action.Action.object)
  thing.ItemList.itemListElement = reject(
    thing.ItemList.itemListElement,
    matches(action.Action.instrument),
  )
  action.Action.result = ItemList({ mainEntityOfPage })
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(action)
}
export default RejectAction
