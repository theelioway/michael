import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * The act of discovering/finding an object.
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
 *   },
 * }
 * const thing1 = await DiscoverAction({
 *   Action: {  instrument: "identifier:4", object: engagedThing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 4, sameAs: "even" }
 *   ]
 * )
 * const thing2 = await DiscoverAction({
 *   Action: {  instrument: "sameAs:odd", object: thing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 1, sameAs: "odd" },
 *     { identifier: 3, sameAs: "odd" },
 *     { identifier: 5, sameAs: "odd" },
 *   ]
 * )
 */
export const DiscoverAction = async function DiscoverAction(action) {
  const mainEntityOfPage = "DiscoverAction"
  action = await Action({ ...action, mainEntityOfPage })
  action.Action.result = cloneDeep(action.Action.object)
  action.Action.result.ItemList.itemListElement =
    action.Action.object.ItemList.itemListElement.find(
      thing => thing.identifier === identifier,
    )
  action.Action.actionStatus = "CompletedActionStatus"
  return await Message(action)
}
