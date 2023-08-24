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

var array = [
  { dir: "left", code: 97 },
  { dir: "right", code: 100 },
]

_.keyBy(array, function (o) {
  return String.fromCharCode(o.code)
})
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

_.keyBy(array, "dir")
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }

/** MediaObject: Return a smaller `thing`.
 *
 * @param {Thing} thing.ImageObject.exifData already parsed from file.
 * @returns {Thing}
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
