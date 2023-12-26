"use strict";
import { jsonClone, jsonMerge } from "@elioway/abdiel";
import cli from "./cli.js";

export const cliAction = function (thing) {
  let action = cli();
  return jsonMerge(
    {
      mainEntityOfPage: "Action",
      Action: {
        actionStatus: "CompletedActionStatus",
        object: thing,
        result: jsonClone(thing),
      },
    },
    action,
  );
};

export default cliAction;
