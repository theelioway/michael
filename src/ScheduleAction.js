export const ScheduleAction = async (action, actions) => {
  actions = actions || [];
  return actions.reduce(async (prevAction, nextAction) => {
    const prevResult = await prevAction;
    if (
      prevResult.Action &&
      prevResult.Action.actionStatus === "FailedActionStatus"
    ) {
      throw Error(prevResult.Action.error || prevResult.Action.actionStatus);
    } else {
      // prevResult.PlanAction.scheduledTime = Date.now()
      prevResult.Action.result = thingCloner(prevResult.Action.result);
    }
    return nextAction(prevResult);
  }, Promise.resolve(action));
};

export default ScheduleAction;  // AllocateAction
