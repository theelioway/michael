"use strict";

export const arrayActionReducer = async (prevAction, nextAction) =>
  nextAction(await prevAction);

export const arrayActionErrorCheckingReducer = async (
  prevAction,
  nextAction,
) => {
  const prevResult = await prevAction;
  if (
    prevResult.Action &&
    prevResult.Action.actionStatus === "FailedActionStatus"
  ) {
    throw Error(prevResult.Action.error || prevResult.Action.actionStatus);
  }
  return nextAction(prevResult);
};

export const makePipeline = (reducer) => async (action, actions) => {
  actions = actions || [];
  return actions.reduce(reducer, Promise.resolve(action));
};

export const pipeline = makePipeline(arrayActionReducer);

export default pipeline;
