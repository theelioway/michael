import { set } from "lodash-es"
import { parseArgs } from "./lib/index.js"

export const pipeline = async (thing, actions) => {
  thing = thing || {}
  actions = actions || []
  return actions.reduce(async (prevAction, action) => {
    const prevThing = await prevAction
    return action.Action.target(prevThing)
  }, Promise.resolve(thing))
}

export const callMicheal = function (thing) {
  let [, , potentialAction, ...args] = process.argv
  // default for no args
  thing = thing || {}
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
  let parsedArgs = parseArgs(args)
  thing = {
    potentialAction,
    ...thing,
  }
  Object.entries(parsedArgs).forEach(([path, value]) => set(thing, path, value))
  return thing
}

export const michael = async (thing, actions) => {
  return await pipeline(thing, actions)
}

export default michael
