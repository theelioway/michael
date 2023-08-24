import { filter, join, some, isEqual } from "lodash-es"
import { parseArgs } from "../../lib/parseArgs.js"
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/** SearchAction: returns partial matches from a `thing`'s list.
 *
 * @param {Thing} thing.SearchAction.query with any Thing
 * @returns {Thing}
 */
export const SearchAction = action => {
  const mainEntityOfPage = "SearchAction"
  const actionName = mainEntityOfPage.slice(0, -6)
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  action.SearchAction = action.SearchAction || {}
  action.SearchAction.query = action.SearchAction.query || ""
  const QUERY = parseArgs(
    action.SearchAction.query.replace(/:/g, "=").split(","),
  )
  let ITEMLISTELEMENT = filter(thing.ItemList.itemListElement, thing =>
    some(QUERY, (value, key) => isEqual(thing[key], value)),
  )
  return new Object({
    ...action,
    description: join([actionName, thing.SearchAction.query]).trim(),
    name: join([thing.name, actionName, "Results"]).trim(),
    Action: {
      result: {
        ItemList: {
          itemListElement: ITEMLISTELEMENT || [],
        },
      },
    },
  })
}
export default SearchAction
