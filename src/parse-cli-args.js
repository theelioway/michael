"use strict";
import { objectDotNotatedSet, valueIsMeaningful } from "@elioway/abdiel";

export const parseCliArgs = (transformer) => (args, valueSeparator) => {
  let parsedArgs = {};
  const notransformer = (x) => x;
  valueSeparator = valueSeparator || "=";
  transformer = transformer || notransformer;
  args = args || [];
  for (let arg of args) {
    arg = arg.trim();
    if (!arg.includes(valueSeparator)) {
      if (arg) {
        console.info(`Ignoring invalid arg: ${arg}`);
      }
    } else {
      // Split each arg into its name and value parts
      const [propName, propValue] = arg
        .split(valueSeparator)
        .filter(valueIsMeaningful)
        .map((s) => s.trim());
      // Ignore invalid arg formats
      if (!propName || !propValue) {
        console.info(`Ignoring meaningless arg: ${arg}`);
      } else if (propName && propName.startsWith("-")) {
        console.info(`Ignoring flag arg: ${arg}`);
      } else {
        parsedArgs = objectDotNotatedSet(
          parsedArgs,
          propName,
          transformer(propValue),
        );
      }
    }
  }
  return parsedArgs;
};

export default parseCliArgs;
