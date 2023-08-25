import Thing from "../Thing.js"

/**
 * @example
 * let Person = require("@elioway/michael/Thing/Person.js")
 * const result1 = await Person()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Person")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "my-thing" })
 * console.assert(result2.identifier==="my-thing")
 * console.assert(result2.mainEntityOfPage==="Person")
 * console.assert(result2.ItemList.itemListElement)
 */
export const Person = function Person(thing) {
  const mainEntityOfPage = "Person"
  thing = Thing({ mainEntityOfPage, ...thing })
  thing.Person = thing.Person || {}
  return new Object(thing)
}

export default Person
