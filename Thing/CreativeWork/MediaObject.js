import { pick } from "lodash-es"
import ItemList from "../Intangible/ItemList.js"

function convertToPickList(obj, prefix = "") {
  return Object.keys(obj).reduce((paths, key) => {
    const value = obj[key]

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nestedPaths = convertToPickList(value, prefix + key + ".")
      paths.push(...nestedPaths)
    } else {
      paths.push(prefix + key)
    }

    return paths
  }, [])
}

/** MediaObject: Return a smaller `thing`.
 *
 * @param {Thing} thing.ImageObject.exifData already parsed from file.
 * @returns {Thing}
 */

/**
 * Returns the least `thing` allowed.
 *
 * @param {Object_Thing} thing - The `thing` object.
 * @mutates {Object_Thing} `thing` object
 * @into {Object_Thing} `thing` object
 * @returns {Object_ActionThing} The modified `thing` object.
 * @example
 * const result1 = await Thing()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Thing")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "myThing" })
 * console.assert(result2.identifier==="myThing")
 * console.assert(result2.mainEntityOfPage==="Thing")
 * console.assert(result2.ItemList.itemListElement)
 */
export const MediaObject = thing => {
  thing = ItemList(thing)
  let {
    Aperture,
    FileSize,
    Flash,
    FocalLength,
    GPSLatitude,
    GPSLongitude,
    ISO,
    Lens,
    Megapixels,
    Software,
    tz,
  } = thing.ImageObject.exifData
  return pick(
    thing,
    convertToPickList({
      ImageObject: {
        exifData: {
          Aperture,
          FileSize,
          Flash,
          FocalLength,
          GPSLatitude,
          GPSLongitude,
          ISO,
          Lens,
          Megapixels,
          Software,
          tz,
        },
      },
    }),
  )
}

export default MediaObject
