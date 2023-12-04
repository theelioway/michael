import ItemList from "./Thing/Intangible/ItemList.js";

/**
 * The most generic type of item.
 *
 * @param {Object_Thing} thing - The `thing` object.
 * @mutates {Object_Thing} `thing` object
 * @into {Object_Thing} `thing` object
 * @returns {Object_Thing} The modified `thing` object.
 * @example
 * const thing1 = await Thing()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Thing")
 * console.assert(thing1.ItemList.itemListElement)
 *
 * const thing2 = await Thing({ identifier: "thing-0001" })
 * console.assert(thing2.identifier==="thing-0001")
 * console.assert(thing2.mainEntityOfPage==="Thing")
 * console.assert(thing2.ItemList.itemListElement)
 */
export const Thing = async function Thing(thing) {
  const mainEntityOfPage = "Thing";
  thing = await ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage;
  return thing;
};

export default Thing;
