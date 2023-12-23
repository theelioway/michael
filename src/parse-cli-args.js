"use strict";
import { valueIsMeaningful } from "@elioway/abdiel";

export const parseCliArgs = (transformer) => (args, valueSeparator) => {
  const parsedArgs = {};
  const notransformer = (x) => x;
  valueSeparator = valueSeparator || "=";
  transformer = transformer || notransformer;
  args = args || [];
  for (let arg of args) {
    arg = arg.trim();
    if (!arg.includes(valueSeparator)) {
      if (arg) {
        console.log(`Ignoring invalid arg: ${arg}`);
      }
    } else {
      // Split each arg into its name and value parts
      const [propName, propValue] = arg
        .split(valueSeparator)
        .map((s) => s.trim());
      // Ignore invalid arg formats
      if (!valueIsMeaningful(propName) || !valueIsMeaningful(propValue)) {
        console.log(`Ignoring meaningless arg: ${arg}`);
      } else if (propName && propName.startsWith("-")) {
        console.log(`Ignoring flag arg: ${arg}`);
      } else {
        parsedArgs[propName] = transformer(propValue);
      }
    }
  }
  return parsedArgs;
};

export default parseCliArgs;