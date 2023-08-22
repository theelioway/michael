import { filter, some, isEqual } from "lodash-es"

/** SearchAction: returns partial matches from a `thing`'s list.
 *
 * @param {Thing} thing.SearchAction.query with any Thing
 * @returns {Thing}
 */
export const SearchAction = thing =>
  new Object({
    description: "Search " + JSON.stringify(filterThing),
    mainEntityOfPage: "SearchAction",
    name: "Search Results",
    ItemList: {
      itemListElement: filter(thing.ItemList.itemListElement, thing =>
        some(thing.SearchAction.query, (value, key) =>
          isEqual(thing[key], value)
        )
      ),
    },
  })

export default SearchAction
