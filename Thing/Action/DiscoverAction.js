/** DiscoverAction: Some `things` in  `thing`'s list.
 *
 * @param {String} thing.Action.instrument of comparison.
 * @returns {Thing}
 */
export const DiscoverAction = thing =>
  new Object({
    ...thing,
    description: [
      thing.mainEntityOfPage.slice(0, -6),
      JSON.stringify(thing.Action.instrument),
    ].join(" "),
    disambiguatingDescription: [
      thing.name,
      thing.mainEntityOfPage.slice(0, -6),
      "Results",
    ].join(" "),
    mainEntityOfPage: "DiscoverAction",
  })

export default DiscoverAction
