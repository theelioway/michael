export function convertStringToType(value) {
  value = value || ""

  if (value && !isNaN(Number(value))) {
    return Number(value)
  } else if (value && !isNaN(Date.parse(value))) {
    return new Date(Date.parse(value))
  } else if (
    value.toLowerCase() === "true" ||
    value.toLowerCase() === "false"
  ) {
    return Boolean(value)
  }
  return value // Return the value as-is if no specific conversion is needed
}

export function parseArgs(args, valueSeparator) {
  const parsedArgs = {}
  valueSeparator = valueSeparator || "="
  args = args || []
  for (const arg of args.filter(arg => arg.includes(valueSeparator))) {
    // Split each arg into its name and value parts
    const [propName, propValue] = arg.split(valueSeparator).map(s => s.trim())
    // Ignore invalid arg formats
    if (!propName || !propValue) {
      console.log(`Ignoring invalid arg: ${arg}`)
    } else if (propName && propName.startsWith("-")) {
      console.log(`Ignoring invalid arg: ${arg}`)
    } else {
      parsedArgs[propName] = convertStringToType(propValue)
    }
  }
  return parsedArgs
}

export default parseArgs
