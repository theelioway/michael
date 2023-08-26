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
 *   },
 * }
 * // No `things` match "identifier:2,sameAs:odd"
 * const thing1 = await FindAction({
 *   Action: { object: engagedThing, instrument: "identifier:2,sameAs:odd"  },
 * })
 * console.assert(
 *  thing1.Action.result.ItemList.itemListElement.length===0
 * )
 *
 * // One `thing` matches "identifier:2,sameAs:even"
 * const thing2 = await FindAction({
 *   Action: { object: engagedThing, instrument: "identifier:2,sameAs:even"  },
 * })
 * console.assert(
 *   thing2.Action.result.ItemList.itemListElement.length === 1
 * )
 *
 * // Three `things` match "sameAs:even"
 * const thing3 = await FindAction({
 *   Action: { object: engagedThing, instrument: "sameAs:even"  },
 * })
 * console.assert(
 *   thing3.Action.result.ItemList.itemListElement.length === 3
 * )
 */
export const FindAction = async function FindAction(action) {
  const mainEntityOfPage = "FindAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.Action.result = cloneDeep(action.Action.object)
  action.Action.result.ItemList.itemListElement = filter(
    action.Action.object.ItemList.itemListElement,
    matches(action.Action.instrument),
  )
  action.Action.actionStatus = "CompletedActionStatus"
  return await Message(action)
}
export default FindAction
