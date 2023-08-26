import { find, matches } from "lodash-es"
import { parseArgs } from "../../../lib/parseArgs.js"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * The act of expressing a preference from a set of options or a large or unbounded set of choices/options.
 * @example
 * let ChooseAction = require("@elioway/michael/Action/AssessAction/ChooseAction.js")
 * let engagedThing = {
 *   ItemList: {
 *     itemListElement: [
 *       { identifier: 1, sameAs: "even" },
 *       { identifier: 2, sameAs: "even" },
 *       { identifier: 3, sameAs: "even" },
 *       { identifier: 4, sameAs: "odd" },
 *       { identifier: 5, sameAs: "odd" },
 *       { identifier: 6, sameAs: "odd" },
 *     ],
 *   },
 * }
 * const thing1 = await ChooseAction({
 *   ChooseAction: { actionOption: "identifier:5" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *  thing1.Action.result.identifier === 5
 * )
 * const thing2 = await ChooseAction({
 *   ChooseAction: { actionOption: "sameAs:even" },
 *   Action: { object: engagedThing  },
 * })
 * console.assert(
 *  thing2.Action.result.identifier === 1
 * )
 * // Three `things` match "sameAs:even"
 * const thing3 = await FindAction({
 *   ChooseAction: { actionOption: "sameAs:odd" },
 *   Action: { object: engagedThing  },
 * })
 * console.assert(
 *  thing3.Action.result.identifier === 4
 * )
 */
export const ChooseAction = async function ChooseAction(action) {
  const mainEntityOfPage = "ChooseAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.ChooseAction = action.ChooseAction || {}
  action.ChooseAction.actionOption = action.ChooseAction.actionOption || ""
  action.ChooseAction.actionOption = parseArgs(
    action.ChooseAction.actionOption,
    ":",
  )
  let chosenThing = find(
    action.Action.object.ItemList.itemListElement,
    matches(action.ChooseAction.actionOption),
  )
  if (!chosenThing) {
    action.Action.error = `${JSON.stringify(
      action.ChooseAction.actionOption,
    )} not found in \`thing.ItemList.itemListElement\``
    action.Action.actionStatus = "FailedActionStatus"
  } else {
    action.Action.result = chosenThing
    action.Action.actionStatus = "CompletedActionStatus"
  }
  return await Message(action)
}

export default ChooseAction
