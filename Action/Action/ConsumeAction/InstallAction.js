import Action from "../../../Thing/Action.js"
import ItemList from "../../../Thing/Intangible/ItemList.js"
import Message from "../../../Thing/CreativeWork/Message.js"

/**
 * Import a node module which resolves to a thing.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * echo 'export default { "identifier": "my-thing" }' > "my-thing.js"
 * const action = await InstallAction({
 *    url: "my-thing.js"
 * })
 * console.assert(action.url==="my-thing.js")
 * console.assert(!action.identifier)
 * console.assert(action.Action.result.identifier==="my-thing")
 * console.assert(!action.Action.result.url)
 * console.assert(!action.Action.result.Action)
 */
export const InstallAction = async action => {
  const mainEntityOfPage = " InstallAction"

  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  let hasError = !action.url || (action.url && !action.url.endsWith("js"))
  if (hasError) {
    action.Action.result = thing
    action.Action.actionStatus = "CompletedActionStatus"
    return Message({
      ...action,
      name: join([thing.identifier, mainEntityOfPage, "Error"]).trim(),
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
        object: thing,
      },
    })
  } else {
    let importedThing = await import(action.url)
    action.Action.result = thing
    action.Action.actionStatus = "CompletedActionStatus"
    return CommunicateAction({
      ...action,
      Action: {
        actionStatus: "CompletedActionStatus",
        result: importedThing.default,
      },
    })
  }
}
export default InstallAction
