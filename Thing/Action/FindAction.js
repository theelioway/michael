import { filter, matches } from "lodash-es"
import { parseArgs } from "../../lib/parseArgs.js"
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/** FindAction: Some `things` in  `thing`'s list.
 *
 * @param {String} thing.Action.instrument of comparison.
 * @returns {Thing}
 */
export const FindAction = action => {
  const mainEntityOfPage = "FindAction"
  const actionName = mainEntityOfPage.slice(0, -6)
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  let INSTRUMENT = parseArgs(
    action.Action.instrument.replace(/:/g, "=").split(","),
  )
  let ITEMLISTELEMENT = filter(
    thing.ItemList.itemListElement,
    matches(INSTRUMENT),
  )
  return Message({
    ...action,
    Action: {
      actionStatus: ITEMLISTELEMENT ? "SuccessActionStatus" : "FailedActionStatus",
      result: {        
        ItemList: {
          itemListElement: ITEMLISTELEMENT || [],
        },
      },
    },
  })
}
export default FindAction
