import { join, kebabCase } from "lodash-es"
import ItemList from "./Intangible/ItemList.js"

/**
 * The identifier property represents any kind of identifier for any kind of Thing
 * Returns the `thing` with an `identifier`.
 * @example
 * const thing1 = await Thing()
 * console.assert(!thing.identifier)
 * console.assert(thing.mainEntityOfPage==="Thing")
 * console.assert(thing.ItemList.itemListElement)
 *
 * const thing2 = identifier()
 * console.assert(thing2.identifier==="thing")
 * console.assert(thing2.mainEntityOfPage==="Thing")
 * console.assert(thing2.ItemList.itemListElement)
 *
 * const thing3 = identifier({ name: "My Blue Thing" })
 * console.assert(thing3.identifier==="my-blue-thing")
 * console.assert(thing3.mainEntityOfPage==="Thing")
 * console.assert(thing3.ItemList.itemListElement)
 */
export const identifier = async function (thing) {
  thing = await ItemList(thing)
  if (!thing.identifier) {
    let identifier = kebabCase(
      join([thing.name, thing.disambiguatingDescription], " "),
    )
    thing.identifier = identifier || "thing"
  }
  return thing
}

export default identifier
