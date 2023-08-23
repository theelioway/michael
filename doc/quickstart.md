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

For example the following endpoint ensures every thing has these default properties.

```javascript
const Thing = thing => {
  thing = thing || {}
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Thing"
  thing.ItemList = thing.ItemList || {}
  thing.ItemList.itemListElement = thing.ItemList.itemListElement || []
  return new Object({
    ...thing,
  })
}
```
