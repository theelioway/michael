import { filter, matches } from "lodash-es"
import Action from "../../Thing/Action.js"
import ItemList from "../../Thing/Intangible/ItemList.js"
import Message from "../../Thing/CreativeWork/Message.js"

/**
 * Find "things" where every key/value in the `action.Action.instrument`
 * pattern matches a `thing` in action.Action.object.ItemList.itemListElement`.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
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
 *     numberOfItems: 6,
 *   },
 * }
 * // No `things` match "identifier:2,sameAs:odd"
 * const result1 = await FindAction({
 *   Action: { object: engagedThing, instrument: "identifier:2,sameAs:odd"  },
 * })
 * console.assert(
 *  result1.Action.result.ItemList.itemListElement.length===0
 * )
 *
 * // One `thing` matches "identifier:2,sameAs:even"
 * const result2 = await FindAction({
 *   Action: { object: engagedThing, instrument: "identifier:2,sameAs:even"  },
 * })
 * console.assert(
 *   result2.Action.result.ItemList.itemListElement.length === 1
 * )
 *
 * // Three `things` match "sameAs:even"
 * const result3 = await FindAction({
 *   Action: { object: engagedThing, instrument: "sameAs:even"  },
 * })
 * console.assert(
 *   result3.Action.result.ItemList.itemListElement.length === 3
 * )
 */
export const FindAction = action => {
  const mainEntityOfPage = "FindAction"
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  action.Action.result.ItemList.itemListElement = filter(
    thing.ItemList.itemListElement,
    matches(action.Action.instrument),
  )
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(action)
}
export default FindAction
