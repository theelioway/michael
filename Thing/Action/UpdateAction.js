import Action from "../Action.js"
import ItemList from "../Intangible/ItemList.js"
import Message from "../CreativeWork/Message.js"

/** Action: Updates an action.
 *
 * @returns {Thing}
 */
export const UpdateAction = ActionStatusType => action => {
  const mainEntityOfPage = "UpdateAction"
  action = Action({ ...action, mainEntityOfPage })
  let thing = ItemList(action.Action.object)
  return new Object({
    ...thing,
    Action: {
      ...thing.Action,
      actionStatus: ActionStatusType,
    },
  })
}

export default UpdateAction
