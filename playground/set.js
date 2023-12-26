function set(obj, path, value) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    if (!obj[key] || typeof obj[key] !== "object") {
      obj[key] = {};
    }

    obj = obj[key];
  }

  obj[path[path.length - 1]] = value;
}

const reduceEntriesAndSet = (acc, [key, value]) => set(acc, key, value);

let setMyObject = { identifier: "temporary-identifier" };
setMyObject = Object.entries(setMyObject).reduce(
  reduceAndSet("identifier", "my-identifier"),
);
setMyObject = Object.entries(setMyObject).reduce(
  reduceAndSet("Action.actionStatus", "MIssionAccomplished"),
);

console.assert(setMyObject.identifier === "my-identifier");
console.assert(typeof setMyObject.Action === "object");
console.assert(setMyObject.Action.actionStatus === "MIssionAccomplished");
