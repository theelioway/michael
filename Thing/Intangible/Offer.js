import Thing from "../Thing/ItemList.js"

/**
 * @example
 * let Offer = require("@elioway/michael/Thing/Offer.js")
 * const result1 = await Offer()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Offer")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "my-thing" })
 * console.assert(result2.identifier==="my-thing")
 * console.assert(result2.mainEntityOfPage==="Offer")
 * console.assert(result2.ItemList.itemListElement)
 */
export const Offer = function Offer(thing) {
  const mainEntityOfPage = "Offer"
  thing = Thing({ mainEntityOfPage, ...thing })
  thing.Offer = thing.Offer || {}
  return new Object(thing)
}

export default Offer
