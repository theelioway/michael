import { join, reject, matches } from "lodash-es"
import { parseArgs } from "../../lib/parseArgs.js"
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/** RejectAction: Some `things` in  `thing`'s list.
 *
 * @param {String} thing.Action.instrument of comparison.
 * @returns {Thing}
 */
export const RejectAction = action => {
  const mainEntityOfPage = "RejectAction"
  const actionName = mainEntityOfPage.slice(0, -6)
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  thing.Action.instrument = thing.Action.instrument || ""
  let INSTRUMENT = parseArgs(
    thing.Action.instrument.replace(/:/g, "=").split(","),
  )
  let ITEMLISTELEMENT = reject(
    thing.ItemList.itemListElement,
    matches(INSTRUMENT),
  )
  return new Object({
    description: join([actionName, thing.Action.instrument]).trim(),
    name: join([
      thing.name,
      thing.mainEntityOfPage.slice(0, -6),
      "Results",
    ]).trim(),
    ItemList: {
      itemListElement: ITEMLISTELEMENT || [],
    },
  })
}
export default RejectAction
