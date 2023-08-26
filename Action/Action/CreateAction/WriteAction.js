import { promises as fs } from "fs"
import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * Writes `action.Action.object` to a JSON file.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "myThing" }
 * const result = await WriteAction({ url: "myThing.json", Action: { object: thing }})
 * console.log(`File written: ${result.url}`)
 */
export const WriteAction = async action => {
  const mainEntityOfPage = "WriteAction"
  action = await Action({ ...action, mainEntityOfPage })
  if (action && !action.url) {
    action.Action.actionStatus = "FailedActionStatus"
    action.Action.error = "Missing `thing.url`"
  } else {
    await fs.writeFile(
      action.url,
      JSON.stringify(action.Action.object, null, 2),
      "utf8",
    )
    action.Action.result = JSON.stringify(action.Action.object)
    action.Action.actionStatus = "CompletedActionStatus"
  }
  return await Message(action)
}
export default WriteAction
