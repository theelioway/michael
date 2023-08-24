/** ChooseAction: Choose 1 `thing` from a given `thing`'s list. */
import { find, matches } from "lodash-es"
import { parseArgs } from "../../lib/parseArgs.js"
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/** ChooseAction
 * @param {Thing}
 * - @required `thing.Action.object` as the `thing` with a list.
 * - @required `thing.ChooseAction.actionOption` as the list[n].thing.identitier.
 * @returns {Thing} as `thing.Action.result` Actioned */
export const ChooseAction = action => {
  const mainEntityOfPage = "ChooseAction"
  const actionName = mainEntityOfPage.slice(0, -6)
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  action.ChooseAction = action.ChooseAction || {}
  action.ChooseAction.actionOption = action.ChooseAction.actionOption || ""
  let ACTIONOPTION = parseArgs(
    action.ChooseAction.actionOption.replace(/:/g, "=").split(","),
  )
  let chosenThing = find(thing.ItemList.itemListElement, matches(ACTIONOPTION))
  if (!chosenThing) {
    return Message({
      ...action,
      name: join([thing.name, actionName, "Action Failed"]).trim(),
      Action: {
        actionStatus: "FailedActionStatus",
        error: `${thing.ChooseAction.actionOption} not found in \`object\``,
        object: thing,
      },
    })
  } else {
    return Message({
      ...action,
      description: join([actionName,"[", action.ChooseAction.actionOption,"]"]).trim().replace("[  ]", ""),
      Action: {
        actionStatus: "CompletedActionStatus",
        result: chosenThing,
      },
    })
  }
}

export default ChooseAction
