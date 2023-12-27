![](./postcard.jpg)

> CLI, **the elioWay**

# michael

A **CLI handler** you can use to build CLI applications rapidly, the **elioWay**.

## `cli`

`cli` parses `process.argv` and gathers up the command option as `potentialAction`; and `property=value` args are folded into the returned `thing`.

### Usage

`index.js`

```javascript
import { jsonMerge } from "@elioway/abdiel";
import { pipeActions, cli } from "@elioway/micheal";

let pipelineActions = [
  (action) =>
    jsonMerge(action, {
      Action: { result: { potentialAction: "Resolve" } },
    }),
  (action) => jsonMerge(action, { Action: { result: { sameAs: "the" } } }),
  (action) => jsonMerge(action, { Action: { result: { url: "pipeline" } } }),
];


// npm run michael identifier=testMicheal;
let THING = cli()

let pipedThing = await pipeActions(THING, pipelineActions);
pipedThing.should.eql({
  mainEntityOfPage: "Action",
  Action: {
    actionStatus: "CompletedActionStatus",
    object: THING,
    result: {
      identifier: "testMicheal",
      potentialAction: "Resolve",
      sameAs: "the",
      url: "pipeline",
    },
  },
});
```

If called like this:

```shell
node index.js SearchAction name='My CLI' mainEntityOfPage=Event
```

It will log:

```json
{
  "identifier": "my-cli",
  "mainEntityOfPage": "Event",
  "name": "My CLI",
  "potentialAction": "SearchAction"
}
```

## `pipeline`

`pipeline` resolves a chain of Actions, in order, passing the `thing` down.

`index.js`

```javascript
import { cliThing, pipeline } from "@elioway/micheal";
let commandThing = cliThing({ identifier: "my-cli" });

await pipeline(commandThing, [
  {
    Action: {
      target: (thing) => new Object({ ...thing, alternateName: "Pipelined" }),
    },
  },
  {
    Action: {
      target: (thing) => new Object({ ...thing, sameAs: "SchemaOrg" }),
    },
  },
  {
    Action: { target: (thing) => new Object({ ...thing, name: "pipelined" }) },
  },
  {
    Action: { target: (thing) => new Object({ ...thing, url: "schema.org" }) },
  },
]);
```

- `micheal` calls the `pipeline`. It's your entry point to process commands from your CLI app.

- [michael Documentation](https://elioway.gitlab.io/elioangels/michael/)

## Prerequisites

- [michael Prerequisites](https://elioway.gitlab.io/elioangels/michael/installing.html)

## Installing

- [Installing michael](https://elioway.gitlab.io/elioangels/michael/installing.html)

## Seeing is Believing

```
git clone https://gitlab.com/elioangels/michael.git
cd michael
npm i
npm run michael -- ReadAction url=a-to-z.json
npm run michael -- ReadAction url=thing.json
npm run michael -- FindAction url=a-to-z.json Action.instrument=identifier:leg-1
npm run michael -- SearchAction url=a-to-z.json Action.instrument=identifier:leg-1
npm run michael -- ChooseAction url=a-to-z.json Action.instrument=identifier:leg-1
```

- [elioangels Quickstart](https://elioway.gitlab.io/elioangels/quickstart.html)
- [michael Quickstart](https://elioway.gitlab.io/elioangels/michael/quickstart.html)

# Credits

- [michael Credits](https://elioway.gitlab.io/elioangels/michael/credits.html)

## License

[MIT](license)

![](https://elioway.gitlab.io/elioangels/michael/apple-touch-icon.png)
