import { filter, some, isEqual } from "lodash-es"
import { parseArgs } from "../../lib/parseArgs.js"
import Action from "../../Thing/Action.js"
import ItemList from "../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * Search `things` in  `action.Action.object.ItemList.itemListElement`
 * partially matching the pattern in `action.SearchAction.query`.
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
 * const thing1 = await ChooseAction({
 *   SearchAction: { query: "identifier:4" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 4, sameAs: "even" }
 *   ]
 * )
 * const thing2 = await ChooseAction({
 *   SearchAction: { query: "sameAs:odd" },
 *   Action: { object: thing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 1, sameAs: "odd" },
 *     { identifier: 3, sameAs: "odd" },
 *     { identifier: 5, sameAs: "odd" },
 *   ]
 * )
 */
export const SearchAction = async function SearchAction(action) {
  const mainEntityOfPage = "SearchAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.Action.result = cloneDeep(action.Action.object)
  action.SearchAction = action.SearchAction || {}
  action.SearchAction.query = action.SearchAction.query || ""
  action.SearchAction.query = parseArgs(action.Action.query.split(","), ":")
  action.Action.result.ItemList.itemListElement = filter(
    action.Action.object.ItemList.itemListElement,
    thing =>
      some(action.SearchAction.query, (value, key) =>
        isEqual(thing[key], value),
      ),
  )
  action.Action.actionStatus = "CompletedActionStatus"
  return await Message(action)
}
export default SearchAction
