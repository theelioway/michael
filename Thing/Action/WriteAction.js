/** 
 * `WriteAction` the `thing` as a JSON file to `action.url`. 
 * */
import { promises as fs } from "fs"
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/**
 * Writes `action.Action.object` to a JSON file.
 *
 * @param {Object_ActionThing} action - The action object.
 *   - {@link Object_Thing_ActionThing#url} - The path to the file.
 *   - {@link Object_Thing_ActionThing#Action.object} - The `thing` to write.
 * @mutates {Object_Thing} action.Action.object
 * @into {Object_Thing} action.Action.result
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error` 
 * @example
 * let thing = { identifier: "myThing" }
 * const result = await WriteAction({ url: "myThing.json", Action: { object: thing }})
 * console.log(`File written: ${result.url}`)
 */
export const WriteAction = async action => {
  const mainEntityOfPage = "WriteAction"
  const actionName = mainEntityOfPage.slice(0, -6)
  thing = ItemList(action.Action.object)
  let action = Action(thing)
  if (thing && !thing.url) {
    return Message({
      name: mainEntityOfPage.slice(0, -6) + " Error",
      Action: {
        error: "Missing `thing.url`",
        actionStatus: "FailedActionStatus",
        object: thing,
      },
    })
  } else {
    await fs.writeFile(thing.url, JSON.stringify(thing, null, 2), "utf8")
    action.Action.result = thing
    return action
  }
}
export default WriteAction
