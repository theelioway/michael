import Thing from "../Thing.js"

/**
 * @example
 * let Organization = require("@elioway/michael/Thing/Organization.js")
 * const result1 = await Organization()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Organization")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "my-thing" })
 * console.assert(result2.identifier==="my-thing")
 * console.assert(result2.mainEntityOfPage==="Organization")
 * console.assert(result2.ItemList.itemListElement)
 */
export const Organization = function Organization(thing) {
  const mainEntityOfPage = "Organization"
  thing = Thing({ mainEntityOfPage, ...thing })
  thing.Organization = thing.Organization || {}
  return new Object(thing)
}

export default Organization
