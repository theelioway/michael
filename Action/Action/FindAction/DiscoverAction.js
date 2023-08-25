import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * The act of editing a recipient by replacing an old object with a new object.
 * @example
 * let DiscoverAction = require("@elioway/michael/Action/UpdateAction/DiscoverAction.js")
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
 * const result1 = await DiscoverAction({
 *   SearchAction: { query: "identifier:4" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *   result1.Action.result.ItemList.itemListElement === [
 *     { identifier: 4, sameAs: "even" }
 *   ]
 * )
 * const result2 = await DiscoverAction({
 *   SearchAction: { query: "sameAs:odd" },
 *   Action: { object: thing },
 * })
 * console.assert(
 *   result1.Action.result.ItemList.itemListElement === [
 *     { identifier: 1, sameAs: "odd" },
 *     { identifier: 3, sameAs: "odd" },
 *     { identifier: 5, sameAs: "odd" },
 *   ]
 * )
 */
export const DiscoverAction = function DiscoverAction(action) {
  const mainEntityOfPage = "DiscoverAction"
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  // A sub property of object. The object that is being replaced.
  action.DiscoverAction.replacee = action.DiscoverAction.replacee || ""
  action.DiscoverAction.replacee = parseArgs(
    action.DiscoverAction.replacee.split(","),
    ":",
  )
  // 	A sub property of object. The object that replaces.
  action.DiscoverAction.replacer = action.DiscoverAction.replacer || ""
  action.DiscoverAction.replacer = parseArgs(
    action.DiscoverAction.replacer.split(","),
    ":",
  )
  //   action.Action.result.ItemList.itemListElement = map(
  //     thing.ItemList.itemListElement,
  //     thing =>
  //   )
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(action)
}
