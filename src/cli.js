"use strict";
import parseCliArgs from "./parse-cli-args.js";

export const parseCliArgStrings = parseCliArgs(String);

export const cli = function () {
  let [, , ...args] = process.argv;
  return parseCliArgStrings(args);
};

export default cli;
