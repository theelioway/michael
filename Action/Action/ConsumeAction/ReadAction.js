/** ReadAction of `*.*` file from `action.url`. */
import { promises as fs } from "fs"
import { join } from "lodash-es"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"
/**
 * Reads `action.Action.url` expected to be a JSON file.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * echo '{ "identifier": "my-thing" }' > "myThing.json"
 * const action = await ReadAction({
 *    url: "myThing.json",
 *    Action: { object: {} }
 * })
 * console.assert(action.url==="myThing.json")
 * console.assert(!action.identifier)
 * console.assert(action.Action.result.identifier === "my-thing")
 * console.assert(!action.Action.result.url)
 * console.assert(!action.Action.result.Action)
 */
export const ReadAction = async function ReadAction(action) {
  const mainEntityOfPage = "ReadAction"

  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  if (!action.url) {
    action.Action.result = thing
    action.Action.actionStatus = "CompletedActionStatus"
    return new Message({
      ...action,
      name: join([thing.name, mainEntityOfPage, "Action Failed"]).trim(),
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
    })
  } else {
    let fileData = await fs.readFile(action.url, "utf8")
    action.Action.result = thing
    action.Action.actionStatus = "CompletedActionStatus"
    return new Message({
      ...action,
      Action: {
        actionStatus: "CompletedActionStatus",
        result: fileData,
      },
    })
  }
}
export default ReadAction
