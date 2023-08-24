/** ReadAction of `*.*` file from `action.url`. */
import { promises as fs } from "fs"
import { join } from "lodash-es"
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/**
 * Reads `action.Action.url` expected to be a JSON file.
 *
 * @param {Object_ActionThing} action - The `action` object.
 *   - {@link Object_Thing_ActionThing#url} - The path to the file.
 * @mutates {Object_Thing} {}
 * @into {Object_Thing} action.Action.result
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error` 
 * @example
 * let thing = { identifier: "myThing" }
 * const result = await WriteAction({ 
 *    url: "myThing.json", 
 *    Action: { object: thing }
 * })
 * console.log(`File written: ${result.url}`)
 */
export const ReadAction = async action => {
  const mainEntityOfPage = "ReadAction"
  const actionName = mainEntityOfPage.slice(0, -6)   
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  if (!action.url) {
    return new Message({
      ...action,
      name: join([thing.name, actionName, "Action Failed"]).trim(),
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
    })
  } else {
    let fileData = await fs.readFile(action.url, "utf8")
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
