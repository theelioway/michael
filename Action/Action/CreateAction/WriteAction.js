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
  thing = ItemList(action.Action.object)
  let action = Action(thing)
  if (thing && !thing.url) {
    return Message({
      ...action,
      Action: {
        error: "Missing `thing.url`",
        actionStatus: "FailedActionStatus",
        object: thing,
      },
    })
  } else {
    thing = await fs.writeFile(
      thing.url,
      JSON.stringify(thing, null, 2),
      "utf8",
    )
    action.Action.result = thing
    action.Action.actionStatus = "CompletedActionStatus"
    return action
  }
}
export default WriteAction
