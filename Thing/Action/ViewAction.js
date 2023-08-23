/** ViewAction: console.log to screen.
 *
 * @returns {Thing}
 */
export const ViewAction = thing => {
  thing = thing || {}
  thing.ItemList = thing.ItemList || {}
  thing.ItemList.itemListElement = thing.ItemList.itemListElement || []
  thing = new Object({
    mainEntityOfPage: "ViewAction",
    ...thing,
    ItemList: {
      itemListElement: thing.ItemList.itemListElement.map(
        ({ identifier }) => identifier,
      ),
    },
  })
  return thing
}
export default ViewAction
