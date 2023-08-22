import { filter, matches } from "lodash-es"
import ErrorT from "../ErrorT.js"
import DiscoverAction from "./DiscoverAction.js"

/** FindAction: Finds  a `thing`'s list.
 *
 * @param {String} thing.Action.instrument of comparison.
 * @returns {Thing}
 */
export const FindAction = thing => {
  if (thing.Action && thing.Action.instrument) {
    // assume the `instrument` is `key1:value1,key2:value2,key3:value3` and
    // build an object.
    let instrument = String(thing.Action.instrument)
      .split(",")
      .filter(propValue => propValue && propValue.includes("="))
      .map(propValue => propValue.split("="))
      .reduce((acc, [key, val]))
    // Find all the AND matches
    let result = filter(thing.ItemList.itemListElement, matches(instrument))
    // Return the results as a special thing.
    return DiscoverAction({
      ...thing,
      Action: {
        instrument: [...instrument],
        result: result.map(thing => thing.identifier),
      },
      ItemList: {
        itemListElement: result || [],
        listSize: result && result.length ? result.length : "0",
      },
    })
  } else {
    return ErrorT({
      ...thing,
      disambiguatingDescription: [
        thing.mainEntityOfPage.slice(0, -6),
        JSON.stringify(
          thing.Action && thing.Action.instrument
            ? thing.Action.instrument
            : ""
        ),
        " came up empty",
      ].join(" "),
      Action: {
        error:
          "Error: Missing `thing.Action.instrument`, e.g. Action.instrument=potentialAction:ErrorAction,mainEntityOfPage:Action",
        instrument: "FindAction",
      },
    })
  }
}

export default FindAction
