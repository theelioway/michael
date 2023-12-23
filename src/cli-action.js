"use strict";
import cli from "./cli.js";

export const cliAction = function (action) {
  return Object.assign({}, action, {
    mainEntityOfPage: "Action",
    Action: {
      actionStatus: "CompletedActionStatus",
      result: cli(),
    },
  });
};

export default cliAction;
