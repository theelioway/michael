import { filter, matches } from "lodash-es"
import { parseArgs } from "../../lib/parseArgs.js"

/** DiscoverAction: Some `things` in  `thing`'s list.
 *
 * @param {String} thing.Action.instrument of comparison.
 * @returns {Thing}
 */
export const DiscoverAction = thing => {
  thing = thing || {}
  thing.ItemList = thing.ItemList || {}
  thing.ItemList.itemListElement = thing.ItemList.itemListElement || []
  thing.mainEntityOfPage = thing.mainEntityOfPage || "DiscoverAction"
  thing.Action = thing.Action || {}
  thing.Action.instrument = thing.Action.instrument || ""
  let INSTRUMENT = parseArgs(
    thing.Action.instrument.replace(/:/g, "=").split(","),
  )
  let ITEMLISTELEMENT = filter(
    thing.ItemList.itemListElement,
    matches(INSTRUMENT),
  )
  return new Object({
    ...thing,
    description: [
      thing.mainEntityOfPage.slice(0, -6),
      JSON.stringify(thing.Action.instrument),
    ].join(" "),
    name: [thing.name, thing.mainEntityOfPage.slice(0, -6), "Results"]
      .join(" ")
      .trim(),
    ItemList: {
      itemListElement: ITEMLISTELEMENT || [],
    },
  })
}
export default DiscoverAction
