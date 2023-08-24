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

/** Offer: Make an offer of another `thing`.
 *
 * @param {Thing} thing.ImageObject.exifData already parsed from file.
 * @returns {Thing}
 */
export const Offer = thing => {
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

export default Offer
