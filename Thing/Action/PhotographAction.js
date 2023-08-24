/** PhotographAction: import a node module.
 */
import { promises as fs } from "fs"
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"



/** PhotographAction
 *
 * @param {Thing} thing.url e.g. to import `thing.js`
 * @returns {Thing}
 */
export const PhotographAction = async action => {
  const mainEntityOfPage = "PhotographAction"
  const actionName = mainEntityOfPage.slice(0, -6)   
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
    let hasError =
      (!action.url) || (action.url && !action.url.toLowerCase().endsWith("jpg"))
    if (hasError) {
      return Message({
        ...action,
        name: join([thing.name, actionName, "Action Failed"]).trim(),
        Action: {
          actionStatus: "FailedActionStatus",
          error: "Missing `action.url`",
        },
      })
    } else {
      

  let fileData = await  fs.readFile(action.url)

    // Search for the Exif marker (0xFFE1) in `fileData`
    const exifMarkerIndex = fileData.indexOf(Buffer.from([0xFF, 0xE1]));

    if (exifMarkerIndex === -1) {
      return Message({
        ...action,
        name: join([thing.name, actionName, "Action Failed"]).trim(),
        Action: {
          actionStatus: "FailedActionStatus",
          error: `Exif marker not found in the ${action.url}`,
        },
      })
    }

        // Extract and parse the Exif header
    const exifData = fileData.slice(exifMarkerIndex + 4, exifMarkerIndex + 2 + 4);
    return Message({
      ...action,
      Action: {
        actionStatus: "CompletedActionStatus",
        result: exifData,
      },
    })

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
  