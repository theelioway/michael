import { find } from "lodash-es"

/** ChooseAction: Choose one thing from a `thing`'s list.
 *
 * @param {Thing} thing.ChooseAction.actionOption with enough unique info to find.
 * @returns {Thing}
 */
export const ChooseAction = thing =>
  find(thing.ItemList.itemListElement, matches(thing.ChooseAction.actionOption))

export default ChooseAction
