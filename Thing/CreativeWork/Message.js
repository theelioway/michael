import ItemList from "../Intangible/ItemList.js"

/** Message: A generic error message.
 *
 * @param {String} thing.Actiion.error especially.
 * @returns {Thing}
 */
export const Message = thing => {
  thing = ItemList(thing)
  return new Object({
    additionalType: "ErrorMessage",
    mainEntityOfPage: "Message",
    name: thing.name + " Error",
    Message: {
      messageAttachment: thing,
      sender: "elioangels/michael/Thing/CreativeWork/Message.js",
    },
    Action: {
      error: "Something went wrong.",
      actionStatus: "FailedActionStatus",
    },
  })
}

export default Message
