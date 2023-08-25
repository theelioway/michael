import { promises as fs } from "fs"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * Get the exifData from a photograph
 * @example
 * let engagedThing = { identifier: "myThing" }
 * const result = await PhotographAction({
 *    url: "myThing.json",
 *    Action: { object: engagedThing }
 * })
 * console.log(`File written: ${result.url}`)
 */
export const PhotographAction = async function PhotographAction(action) {
  const mainEntityOfPage = "PhotographAction"
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  let hasError =
    !action.url || (action.url && !action.url.toLowerCase().endsWith("jpg"))
  if (hasError) {
    action.Action.result = thing
    action.Action.actionStatus = "CompletedActionStatus"
    return Message({
      ...action,
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `action.url`",
      },
    })
  } else {
    let fileData = await fs.readFile(action.url)
    // Search for the Exif marker (0xFFE1) in `fileData`
    const exifMarkerIndex = fileData.indexOf(Buffer.from([0xff, 0xe1]))
    if (exifMarkerIndex === -1) {
      return Message({
        ...action,
        name: join([thing.name, mainEntityOfPage, "Action Failed"]).trim(),
        Action: {
          actionStatus: "FailedActionStatus",
          error: `Exif marker not found in the ${action.url}`,
        },
      })
    }
    // Extract and parse the Exif header
    const exifData = fileData.slice(
      exifMarkerIndex + 4,
      exifMarkerIndex + 2 + 4,
    )
    action.Action.result = exifData
    action.Action.actionStatus = "CompletedActionStatus"
    return Message(action)
    // const byteOrder = exifData.toString('utf8', 0, 2);
    // // Determine endianness based on the byte order
    // const littleEndian = byteOrder === 'II';
    // // Extract and parse a basic Exif tag (e.g., ApertureValue)
    // const tagId = 0x9202; // ApertureValue tag ID
    // const tagOffset = 10; // Offset to the tag fileData (assuming the Exif header size is 10 bytes)
    // const tagValue = littleEndian
    //   ? exifData.readUInt16LE(tagOffset)
    //   : exifData.readUInt16BE(tagOffset);
    // console.log(`ApertureValue: ${tagValue}`);
  }
}
export default PhotographAction
