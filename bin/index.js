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

const commands = {
  Action: [Thing, ViewAction],
  ChooseAction: [ReadAction, ReceiveAction, Thing, ChooseAction, QuoteAction],
  FindAction: [ReadAction, ReceiveAction, Thing, FindAction, ViewAction],
  ImportAction: [ImportAction, Thing, ViewAction],
  QuoteAction: [
    ReadAction,
    ReceiveAction,
    Thing,
    QuoteAction([
      "alternateName",
      "identifier",
      "name",
      "mainObjectOfPage",
      "potentialAction",
      "url",
      "ItemList.itemListElementa",
    ]),
  ],
  ReadAction: [ReadAction, ReceiveAction, Thing, ViewAction],
  SearchAction: [ReadAction, ReceiveAction, Thing, SearchAction, ViewAction],
  ViewAction: [ReadAction, ReceiveAction, Thing, ViewAction],
}

const michaelCLI = async thing => {
  thing = callMichael(thing)
  await michael(thing, commands[thing.potentialAction])
}

michaelCLI({ url: "thing.json" })
