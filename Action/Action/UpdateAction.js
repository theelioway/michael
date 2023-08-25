import { mergeDeep, cloneDeep } from "lodash-es"
import Action from "../../Thing/Action.js"
import ItemList from "../../Thing/Intangible/ItemList.js"
import Message from "../../Thing/CreativeWork/Message.js"

/**
 * The act of managing by changing/editing the state of the object.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "my-thing", name: "My new thing." }
 * const action = await UpdateAction({
 *   Action: {
 *     instrument: "url:http://Action.theElioWay.com",
 *     object: engagedThing
 *   }
 * })
 * console.assert(action.identifier==="my-thing")
 * console.assert(action.name==="My new thing.")
 * console.assert(action.Action.url==="http://Action.theElioWay.com")
 * console.assert(action.Action.actionStatus==="CompletedActionStatus")
 */
export const UpdateAction = function UpdateAction(action) {
  const mainEntityOfPage = "UpdateAction"
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  action.Action.result = mergeDeep(
    {},
    cloneDeep(thing),
    action.Action.instrument,
  )
  action.Action.actionStatus = "CompletedActionStatus"
  return Message(action)
}

export default UpdateAction
