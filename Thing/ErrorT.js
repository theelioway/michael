/** ErrorT: A generic error message.
 *
 * @param {String} thing.Actiion.error especially.
 * @returns {Thing}
 */
export const ErrorT = thing =>
  new Object({
    ...thing,
    additionalType: "ErrorT",
    mainEntityOfPage: "Action",
    name: thing.mainEntityOfPage.slice(0, -6) + " Error",
    Action: {
      error: "Something went wrong.",
      ...thing.Action,
      actionStatus: "FailedActionStatus",
    },
    ItemList: {
      itemListElement: [],
    },
  })

export default ErrorT
