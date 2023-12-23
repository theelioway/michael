const thingCloner = (thing) =>
  Object.assign({
    ...thing,
    ItemList: {
      ...thing.ItemList,
      itemListElement: thing.ItemList.itemListElement.map(objectCloner),
    },
  });
