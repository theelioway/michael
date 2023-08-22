import { parseArgs } from "./lib/index.js"

const pipeline = async (obj, funcs) => {
  return funcs.reduce(async (prevObjPromise, func) => {
    const prevObj = await prevObjPromise
    return func(prevObj)
  }, Promise.resolve(obj))
}

export const callMichael = thing => {
  let [, , potentialAction, ...args] = process.argv

  if (potentialAction) {
    if (potentialAction.includes("=")) {
      args.push(potentialAction)
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

export const michael = async (thing, funcs) => {
  console.log(thing)
  await pipeline(thing, funcs)
}

export { parseArgs }

export default callMichael

// const { Action, additionalType} = command
// const { identifier, subjectOf } = args

// if ( additionalType === "Action") {
//   return await command.Action.target(command, args)
// } else {
//   if (!identifier) {
//     console.log(
//       "// When you custom CLI library resolves commands and passes direct to Michael"
//     )
//     console.log("Usage: <customCLI> identifier=<customCommandNameT>")
//     console.log("// When you evoke a file with many command things.")
//     console.log(
//       "Usage: michael subjectOf=<file.js> identifier=<fileCommandNameT>"
//     )
//     command.Action.error("Command requires `identifier` parameter")
//     process.exit(1)
//   } else {
//     command.Action.target(command, args)
//   }
//   if ( additionalType === "ConsumeAction") {
//   return await command.Action.target(command, args)
// } else {

// }}

// switch (command.additionalType.toUpperCase()) {
//   case "ControlAction":
//     return command.Action.target(command, args)
//   case:
//     if (!args.identifier) {
//       console.log(
//         "// When you custom CLI library resolves commands and passes direct to Michael"
//       )
//       console.log("Usage: <customCLI> identifier=<customCommandNameT>")
//       console.log("// When you evoke a file with many command things.")
//       console.log(
//         "Usage: michael subjectOf=<file.js> identifier=<fileCommandNameT>"
//       )
//       command.Action.error("Command requires `identifier` parameter")
//       process.exit(1)
//     } else {
//       command.Action.target(command, args)
//     }
//   case "LUTE":
//     if (!args.subjectOf || !args.identifier) {
//       console.log(
//         "Usage: <luteT> subjectOf=engagedThingIdentifier identifier=listedThingIdentifier"
//       )
//       command.Action.error(
//         "Command requires `subjectOf` and `identifier` parameters"
//       )
//       process.exit(1)
//     } else {

//     }
//   default:
//     console.log("// When you evoke a file with a command thing.")
//     console.log("Usage: michael url=<file.js>")

// }
// }

// export default michael
