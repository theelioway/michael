# Quickstart michael

- [michael Prerequisites](/elioangels/michael/prerequisites.html)
- [Installing michael](/elioangels/michael/installing.html)

## Nutshell

- How to write `Actions`.
- How to write a CLI using micheal and an `Actions` hub.
- How to write an API using micheal and an `Actions` hub.

## elioWay Endpoints

All **elioWay** `endpoints` should:

1. be named after Schema.org types for general purpose.
2. be named after Schema.org `Action` types to handle commands.
3. take a `thing` (optionally).
4. return a `thing`.

For example, the following endpoint ensures every `thing` has default properties.

```javascript
import { merge } from "lodash-es"

/** `Thing` returns the least `thing` possible when passed `undefined`.
 * Fields for "least" are `identifier`, `mainEntityOfPage` and `ItemList`
 * @params {Thing}
 * @returns {Thing} */
const Thing = asyncfunction (thing) {
  thing = thing || {}
  thing.ItemList = thing.ItemList || {}
  thing.ItemList.itemListElement = thing.ItemList.itemListElement || []
  return merge(
    {
      identifier: "thing",
      mainEntityOfPage: "Thing",
    },
    thing,
  )
}
```

This is another example which writes a thing to a file.

```javascript
import { promises as fs } from "fs";
import { ItemList } from "@elioway/michael";

/** WriteAction: Write a file to disk.
 *
 * @param {Thing} thing.url as the path to the file.
 * @returns {Thing}
 */
export const WriteAction = async (thing) => {
  thing = await ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || "WriteAction";
  if (thing && !thing.url) {
    // Return an error message as a `thing`.
    return ItemList({
      mainEntityOfPage: "WriteAction",
      name: "WriteAction Error",
      Action: {
        error: "Missing `thing.url`",
        actionStatus: "FailedActionStatus",
      },
    });
  } else {
    // Wait until written.
    await fs.writeFile(thing.url, JSON.stringify(thing, null, 2), "utf8");
    // Always return the `thing`.
    return thing;
  }
};
```
