import { pick } from "lodash-es"

/** QuoteAction: console.log a summary.
 *
 * @returns {Thing}
 */
export const QuoteAction = fields => thing => {
  console.log(pick(thing, fields))
  return thing
}

export default QuoteAction
