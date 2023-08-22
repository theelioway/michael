export const Thing = thing =>
  new Object({
    mainEntityOfPage: "Thing",
    ...thing,
  })

export default Thing
