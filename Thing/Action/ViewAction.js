import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/** ViewAction: console.log list identifiers to screen.
 *
 * @returns {Thing}
 */
export const ViewAction = thing => {
  const mainEntityOfPage = "ViewAction"
  thing = ItemList(thing)
  thing = new Object({
    ...thing,
    ItemList: {
      itemListElement: thing.ItemList.itemListElement.map(
        ({ identifier }) => identifier,
      ),
    },
  })
  return thing
}
export default ViewAction
