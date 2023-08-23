/** ReceiveAction: JSON.parse a json string.
 *
 * @returns {Thing} json string
 */
export const ReceiveAction = thing =>
  new Object({
    mainEntityOfPage: "ReceiveAction",
    ...JSON.parse(thing || "{}"),
  })

export default ReceiveAction
