/**
 * `Thing`: to flesh out a default or null `thing`.
 * */
import ItemList from "./Thing/Intangible/ItemList.js"

/**
 * Returns the least `thing` allowed.
 *
 * @param {Object_Thing} thing - The `thing` object.
 * @mutates {Object_Thing} `thing` object
 * @into {Object_Thing} `thing` object
 * @returns {Object_Thing} The modified `thing` object.
 * @example
 * const result1 = await Thing()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Thing")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "myThing" })
 * console.assert(result2.identifier==="myThing")
 * console.assert(result2.mainEntityOfPage==="Thing")
 * console.assert(result2.ItemList.itemListElement)
 */
export const Thing = thing => {
  thing = ItemList(thing)
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Thing"
  return thing
}

export default Thing
