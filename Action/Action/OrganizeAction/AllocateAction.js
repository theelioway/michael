import { merge, clone, map } from "lodash-es"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/** The act of organizing tasks/objects/events by associating resources to it.
 * @example
 * let RejectAction = require("@elioway/michael/Action/OrganizeAction/AllocateAction.js")
 * let engagedThing = {
 *   ItemList: {
 *     itemListElement: [
 *       { identifier: 1, sameAs: "odd" },
 *       { identifier: 2, sameAs: "even" },
 *       { identifier: 3, sameAs: "odd" },
 *     ],
 *   },
 * }
 * const action = await AllocateAction({
 *     Action: {
 *       object: engagedThing, instrument: "subjectOf:sorter"
 *     }
 * })
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement===[
 *       { identifier: 1, sameAs: "odd", subjectOf: "sorter" },
 *       { identifier: 2, sameAs: "even", subjectOf: "sorter" },
 *       { identifier: 3, sameAs: "odd", subjectOf: "sorter" },
 *     ]
 * )
 */
export const AllocateAction = action => {
  const mainEntityOfPage = "RejectAction"
  action = Action({ ...action, mainEntityOfPage })
  const thing = ItemList(action.Action.object)
  thing.ItemList.itemListElement = map(thing.ItemList.itemListElement, thing =>
    merge(thing, clone(action.Action.instrument)),
  )
  action.Action.result = ItemList({ mainEntityOfPage })
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(action)
}

export default AllocateAction
