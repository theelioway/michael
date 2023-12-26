"use strict";
import cliAction from "./cli-action.js";
import pipeline from "./pipeline.js";

export const pipeActions = async (thing, actions) =>
  await pipeline(cliAction(thing), actions);

export default pipeActions;
