import ItemList from "./Thing/Intangible/ItemList.js"

/** Thing returns very least `thing`
 *
 * @param {Thing} thing (optional)
 * @returns {Thing}
 */
export const Thing = thing => {
  thing = ItemList(thing)
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Thing"
  return thing
}

export default Thing
