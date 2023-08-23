/** Action: Updates a an action.
 *
 * @returns {Thing}
 */
export const UpdateAction = ActionStatusType => thing =>
  new Object({
    mainEntityOfPage: "UpdateAction",
    ...thing,
    Action: {
      ...(thing && thing.Action ? thing.Action : {}),
      actionStatus: ActionStatusType,
    },
  })

export default UpdateAction
