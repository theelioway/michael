
import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/** ImportAction: import a node module.
 *
 * @param {Thing} thing.url e.g. to import `thing.js`
 * @returns {Thing}
 */
export const ImportAction = async action => {
  const mainEntityOfPage = "ImportAction"
  const actionName = mainEntityOfPage.slice(0, -6)   
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  let hasError = (!action.url) || (action.url && !action.url.endsWith("js"))
  if (hasError) {
    return Message({
      ...action,
      name:join( [thing.identifier, actionName, "Error"]).trim(),
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
        object: thing,
      },
    })
  } else {
    let importedThing = await import(action.url)
    return Message({
      ...action,
      Action: {
        actionStatus: "CompletedActionStatus",
        result: importedThing.default,
      },
    })
  }
}
export default ImportAction
