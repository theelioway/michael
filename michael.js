import { parseArgs } from "./lib/index.js"

export const pipeline = async (thing, actions) => {
  return actions.reduce(async (prevAction, action) => {
    const prevThing = await prevAction

    return action.Action.target(prevThing)
  }, Promise.resolve(thing))
}

export const callMichael = thing => {
  let [, , potentialAction, ...args] = process.argv
  // default for no args
  args = args || []
  // default first arg
  if (potentialAction) {
    if (potentialAction.includes("=")) {
      args.push(potentialAction)
      potentialAction = "Action"
    }
    if (potentialAction.startsWith("-")) {
      potentialAction = "Action"
    }
  } else {
    potentialAction = "Action"
  }
  thing = {
    potentialAction,
    ...thing,
    ...parseArgs(args),
  }
  return thing
}

export const michael = async (thing, actions) => {
  await pipeline(thing, actions)
}

// export { parseArgs,  }

export default michael
