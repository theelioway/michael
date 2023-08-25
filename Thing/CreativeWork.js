import Thing from "../Thing.js"

/**
 * Returns the least CreativeWork `thing` allowed.
 * @example
 * let Action = require("@elioway/michael/Thing/CreativeWork.js")
 * const result1 = await CreativeWork()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="CreativeWork")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "my-thing" })
 * console.assert(result2.identifier==="my-thing")
 * console.assert(result2.mainEntityOfPage==="CreativeWork")
 * console.assert(result2.ItemList.itemListElement)
 */
export const CreativeWork = function CreativeWork(thing) {
  const mainEntityOfPage = "CreativeWork"
  thing = Thing({ mainEntityOfPage, ...thing })
  thing.CreativeWork = thing.CreativeWork || {}
  return new Object(thing)
}

export default CreativeWork
