#!/usr/bin/env node
import { callMichael, michael } from "../michael.js"
import Thing from "../Thing.js"
import {
  // Action,
  ChooseAction,
  FindAction,
  ImportAction,
  QuoteAction,
  ReadAction,
  ReceiveAction,
  SearchAction,
  ViewAction,
} from "../Thing/index.js"

const READACTION = {
  name: "Readin file at `thing.url`",
  Action: { target: ReadAction },
}
const RECEIVEACTION = {
  name: "JSON.parse(`thing`)",
  Action: { target: ReceiveAction },
}
const FINDACTION = {
  name: "Find `things` matching `Action.instrument`",
  Action: { target: FindAction },
}
const VIEWACTION = {
  name: "Log entire `thing`",
  Action: { target: ViewAction },
}
const THING = { name: "Render as type `Thing`", Action: { target: Thing } }
const CHOOSEACTION = {
  name: "Exact `thing` found in `things` listed against `ChooseAction.actionOption`",
  Action: { target: ChooseAction },
}
const SEARCHACTION = {
  name: "Matching `thing` from `things` listed against `ChooseAction.actionOption`",
  Action: { target: SearchAction },
}
const IMPORTACTION = {
  name: "Import `thing` from js module at `thing.url`",
  Action: { target: ImportAction },
}
const QUOTEACTION = {
  name: "Log summary of `thing`",
  Action: {
    target: QuoteAction([
      "alternateName",
      "identifier",
      "name",
      "mainObjectOfPage",
      "potentialAction",
      "url",
      "ItemList.itemListElementa",
    ]),
  },
}

const commands = {
  callMichael: [THING, VIEWACTION],
  Action: [THING, VIEWACTION],
  ChooseAction: [READACTION, RECEIVEACTION, THING, CHOOSEACTION, QUOTEACTION],
  FindAction: [READACTION, RECEIVEACTION, THING, FINDACTION, VIEWACTION],
  ImportAction: [IMPORTACTION, THING, VIEWACTION],
  QuoteAction: [READACTION, RECEIVEACTION, THING, QUOTEACTION],
  ReadAction: [READACTION, RECEIVEACTION, THING, VIEWACTION],
  SearchAction: [READACTION, RECEIVEACTION, THING, SEARCHACTION, VIEWACTION],
  ViewAction: [READACTION, RECEIVEACTION, THING, VIEWACTION],
}

const michaelCLI = async thing => {
  thing = callMichael(thing)
  await michael(thing, commands[thing.potentialAction])
}

michaelCLI({ url: "thing.json" })
