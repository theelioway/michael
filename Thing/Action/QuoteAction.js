import { pick } from "lodash-es"

/** QuoteAction: console.log a summary.
 *
 * @returns {Thing}
 */
export const QuoteAction = fields => thing => {
  thing = thing || {}
  thing = pick(
    {
      mainEntityOfPage: "QuoteAction",
      ...thing,
    },
    fields,
  )
  console.log(thing)
  return thing
}

export default QuoteAction
