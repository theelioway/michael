import { cloneDeep } from "lodash-es"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * The act of editing a recipient by replacing an old object with a new object.
 * @example
 * let CheckAction = require("@elioway/michael/Action/UpdateAction/CheckAction.js")
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
 * const thing1 = await CheckAction({
 *   SearchAction: { query: "identifier:4" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 4, sameAs: "even" }
 *   ]
 * )
 * const thing2 = await CheckAction({
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
export const CheckAction = async function CheckAction(action) {
  const mainEntityOfPage = "CheckAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.Action.result = cloneDeep(thing.Action.object)
  // A sub property of object. The object that is being replaced.
  action.CheckAction.replacee = action.CheckAction.replacee || ""
  action.CheckAction.replacee = parseArgs(
    action.CheckAction.replacee.split(","),
    ":",
  )
  // 	A sub property of object. The object that replaces.
  action.CheckAction.replacer = action.CheckAction.replacer || ""
  action.CheckAction.replacer = parseArgs(
    action.CheckAction.replacer.split(","),
    ":",
  )
  //   action.Action.result.ItemList.itemListElement = map(
  //     thing.Action.object.ItemList.itemListElement,
  //     thing =>
  //   )
  action.Action.result = await ItemList({ mainEntityOfPage })
  action.Action.actionStatus = "CompletedActionStatus"
  return await Message(action)
}
