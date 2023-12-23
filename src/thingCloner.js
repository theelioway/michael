"use strict";
import { objectCloner } from "@elioway/abdiel";

export const thingCloner = (thing) =>
  Object.assign({
    ...thing,
    ItemList: {
      ...thing.ItemList,
      itemListElement: thing.ItemList.itemListElement.map(objectCloner),
    },
  });

export default thingCloner;
