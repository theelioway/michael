import { parseCliArgs } from "./parse-cli-args.js";

export const parseCliArgStrings = parseCliArgs(String);

export const cli = function (thing) {
  let [, , ...args] = process.argv;
  let parsedArgs = parseCliArgStrings(args);
  return Object.assign({}, thing, parsedArgs);
};
export default cli;
