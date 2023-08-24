

/** `ReceiveAction` to JSON.parse a json string. */
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/**
 * JSON.parse (`action.Action.object`) as a JSON string.
 *
 * @param {Object_ActionThing} action - The `action` object.
 *   - {@link Object_Thing_ActionThing#Action.object} - The JSON string of a `thing`.
 * @mutates {Object_Thing} action.Action.object
 * @into {Object_Thing} action.Action.result
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error` 
 * @example
 * let thing = '{\n "name": "myThing" \n}'
 * const results = await ReceiveAction({ Action: { object: thing } })
 * console.assert(results.Action.result.name === "myThing")
 */
export const ReceiveAction = action => {
  const mainEntityOfPage = "ReceiveAction"
  const actionName = mainEntityOfPage.slice(0, -6)
  action = Action({ ...action, mainEntityOfPage })
  let parsedThing = ItemList(JSON.parse(action.Action.object || "{}"))
  return Message({
    ...action,
    description: join([actionName,"[", action.ChooseAction.actionOption,"]"]).trim().replace("[  ]", ""),
    Action: {
      actionStatus: "CompletedActionStatus",
      result: parsedThing,
    },
  })
}

export default ReceiveAction
