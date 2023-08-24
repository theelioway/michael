import { set } from "lodash-es"
import ItemList from "./Intangible/ItemList.js"

/** CreativeWork: Creates a new CreativeWork of `thing.CreativeWork.actionStatus`=`CreativeWorkStatusType`.
 *
 * @returns {Thing}
 */
export const CreativeWork = thing => {
  thing = ItemList(thing)
  thing.ChooseCreativeWork = thing.ChooseCreativeWork || {}
  return new Object({
    mainEntityOfPage: "CreativeWork",
    ...thing,
    CreativeWork: {
      ...CreativeWork,
      // Default Start CreativeWork
      actionStatus: "PotentialCreativeWorkStatus",
      // Default CreativeWork to set `actionStatus` = "CompletedCreativeWorkStatus"
      target: thing =>
        set(
          thing || {},
          "CreativeWork.actionStatus",
          "CompletedCreativeWorkStatus",
        ),
    },
  })
}

export default CreativeWork
