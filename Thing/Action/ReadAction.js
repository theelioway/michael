import { promises as fs } from "fs"

/** ReadAction: Read a file from disk.
 *
 * @param {Thing} thing.url as the path to the file.
 * @returns {Thing}
 */
export const ReadAction = async thing => await fs.readFile(thing.url, "utf8")
export default ReadAction
