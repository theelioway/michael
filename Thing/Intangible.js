import Thing from "../Thing.js"

/**
 * @example
 * let Intangible = require("@elioway/michael/Thing/Intangible.js")
 * const result1 = await Intangible()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Intangible")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "my-thing" })
 * console.assert(result2.identifier==="my-thing")
 * console.assert(result2.mainEntityOfPage==="Intangible")
 * console.assert(result2.ItemList.itemListElement)
 */
export const Intangible = thing => {
  const mainEntityOfPage = "Intangible"
  thing = Thing({ mainEntityOfPage, ...thing })
  thing.Intangible = thing.Intangible || {}
  return new Object(thing)
}

export default Intangible
