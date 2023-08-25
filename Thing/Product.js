import Thing from "../Thing.js"

/**
 * @example
 * let Product = require("@elioway/michael/Thing/Product.js")
 * const result1 = await Product()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Product")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "my-thing" })
 * console.assert(result2.identifier==="my-thing")
 * console.assert(result2.mainEntityOfPage==="Product")
 * console.assert(result2.ItemList.itemListElement)
 */
export const Product = function Product(thing) {
  const mainEntityOfPage = "Product"
  thing = Thing({ mainEntityOfPage, ...thing })
  thing.Product = thing.Product || {}
  return new Object(thing)
}

export default Product
