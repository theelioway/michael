/**
 * @example
 * let Event = require("@elioway/michael/Thing/Event.js")
 * const result1 = await Event()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Event")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "my-thing" })
 * console.assert(result2.identifier==="my-thing")
 * console.assert(result2.mainEntityOfPage==="Event")
 * console.assert(result2.ItemList.itemListElement)
 */
export const Event = function Event(thing) {
  const mainEntityOfPage = "Event"
  thing = Thing({ mainEntityOfPage, ...thing })
  thing.Event = thing.Event || {}
  return new Object(thing)
}

export default Event
