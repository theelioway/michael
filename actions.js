const CRUD = "Action"
const TURD = "ControlAction"
const LUTE = "OrganizeAction"

const error = (err = console.error(String(err)))

const buildAction = buildThing => thing =>
  new Object({
    mainEntityOfPage: CRUD,
    pontentialAction: CRUD,
    ...thing,
    ...buildThing,
    Action: {
      error,
      target: (thing, args) => console.log("QuoteAction", thing, args),
    },
  })

const crudT = buildAction({ mainEntityOfPage: CRUD, pontentialAction: CRUD })
const turdT = buildAction({ mainEntityOfPage: TURD, pontentialAction: TURD })
const luteT = buildAction({ mainEntityOfPage: LUTE, pontentialAction: LUTE })
const schemaT = buildAction({
  mainEntityOfPage: TURD,
  pontentialAction: "DiscoverAction",
})
const takeupT = buildAction({
  mainEntityOfPage: TURD,
  pontentialAction: "CreateAction",
})
const updateT = buildAction({
  mainEntityOfPage: TURD,
  pontentialAction: "UpdateAction",
})
const readT = buildAction({
  mainEntityOfPage: TURD,
  pontentialAction: "ReadAction",
})
const destroyT = buildAction({
  mainEntityOfPage: TURD,
  pontentialAction: "DeleteAction",
})
const listT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "ViewAction",
})
const unlistT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "RejectAction",
})
const takeonT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "UpdateAction.AddAction",
})
const enlistT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "UpdateAction.AddAction.InsertAction",
})
const searchT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "SearchAction",
})
const authT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "AuthorizeAction",
})
const loginT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "JoinAction",
})
const logoutT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "SearchAction",
})
const engageT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "ConsumeAction",
})
const permitT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "EndorseAction",
})
const anonifyT = buildAction({
  mainEntityOfPage: LUTE,
  pontentialAction: "InviteAction",
})

export default {
  Action: crudT,
  // ConsumeAction: (thing, args) => turdT(thing, args),
  // OrganizeAction: (thing, args) => luteT(thing, args),
  // DiscoverAction: (thing, args) => schemaT(thing, args),
  // CreateAction: (thing, args) => takeonT(thing, args),
  // UpdateAction: (thing, args) => updateT(thing, args),
  // ReadAction: (thing, args) => readT(thing, args),
  // DeleteAction: (thing, args) => destroyT(thing, args),
  // ViewAction: (thing, args) => listT(thing, args),
  // InsertAction: (thing, args) => enlistT(thing, args),
  // RejectAction: (thing, args) => unlistT(thing, args),
  // AddAction: (thing, args) => takeupT(thing, args),
  // SearchAction: (thing, args) => searchT(thing, args),
  // AuthorizeAction: (thing, args) => authT(thing, args),
  // JoinAction: (thing, args) => loginT(thing, args),
  // LeaveAction: (thing, args) => logoutT(thing, args),
  // ControlAction: (thing, args) => engageT(thing, args),
  // EndorseAction: (thing, args) => permitT(thing, args),
  // InviteAction: (thing, args) => anonifyT(thing, args),
  // FindAction: (thing, args) => QuoteAction(FindAction(thing, args), args),
  // AcceptAction: (thing, args) => AcceptAction(thing, args),
  // ControlAction: (thing, args) => ControlAction(thing, args),
  // CancelAction: (thing, args) => CancelAction(thing, args),
  // CheckAction: (thing, args) => CheckAction(thing, args),
  // CheckInAction: (thing, args) => CheckInAction(thing, args),
  // CheckOutAction: (thing, args) => CheckOutAction(thing, args),
  // TakeAction: (thing, args) => TakeAction(thing, args),
  // MoveAction: (thing, args) => MoveAction(thing, args),
  // UseAction: (thing, args) => UseAction(thing, args),
  // ViewAction: (thing, args) => ViewAction(thing, args),
  // WriteAction: (thing, args) => WriteAction(thing, args),
  // AchieveAction: (thing, args) => AchieveAction(thing, args),
  // ActivateAction: (thing, args) => ActivateAction(thing, args),
  // AgreeAction: (thing, args) => AgreeAction(thing, args),
  // AllocateAction: (thing, args) => AllocateAction(thing, args),
  // ApplyAction: (thing, args) => ApplyAction(thing, args),
  // ArriveAction: (thing, args) => ArriveAction(thing, args),
  // AskAction: (thing, args) => AskAction(thing, args),
  // AssessAction: (thing, args) => AssessAction(thing, args),
  // AssignAction: (thing, args) => AssignAction(thing, args),
  // BefriendAction: (thing, args) => BefriendAction(thing, args),
  // BookmarkAction: (thing, args) => BookmarkAction(thing, args),
  // BorrowAction: (thing, args) => BorrowAction(thing, args),
  // BuyAction: (thing, args) => BuyAction(thing, args),
  // CommentAction: (thing, args) => CommentAction(thing, args),
  // CommunicateAction: (thing, args) => CommunicateAction(thing, args),
  // CookAction: (thing, args) => CookAction(thing, args),
  // DeactivateAction: (thing, args) => DeactivateAction(thing, args),
  // DepartAction: (thing, args) => DepartAction(thing, args),
  // DisagreeAction: (thing, args) => DisagreeAction(thing, args),
  // DislikeAction: (thing, args) => DislikeAction(thing, args),
  // DonateAction: (thing, args) => DonateAction(thing, args),
  // DownloadAction: (thing, args) => DownloadAction(thing, args),
  // DrawAction: (thing, args) => DrawAction(thing, args),
  // DrinkAction: (thing, args) => DrinkAction(thing, args),
  // EatAction: (thing, args) => EatAction(thing, args),
  // ExerciseAction: (thing, args) => ExerciseAction(thing, args),
  // FilmAction: (thing, args) => FilmAction(thing, args),
  // FollowAction: (thing, args) => FollowAction(thing, args),
  // GiveAction: (thing, args) => GiveAction(thing, args),
  // IgnoreAction: (thing, args) => IgnoreAction(thing, args),
  // InformAction: (thing, args) => InformAction(thing, args),
  // InstallAction: (thing, args) => InstallAction(thing, args),
  // InteractAction: (thing, args) => InteractAction(thing, args),
  // LendAction: (thing, args) => LendAction(thing, args),
  // LikeAction: (thing, args) => LikeAction(thing, args),
  // ListenAction: (thing, args) => ListenAction(thing, args),
  // LoseAction: (thing, args) => LoseAction(thing, args),
  // MarryAction: (thing, args) => MarryAction(thing, args),
  // MoneyTransfer: (thing, args) => MoneyTransfer(thing, args),
  // OrderAction: (thing, args) => OrderAction(thing, args),
  // PaintAction: (thing, args) => PaintAction(thing, args),
  // PayAction: (thing, args) => PayAction(thing, args),
  // PerformAction: (thing, args) => PerformAction(thing, args),
  // PhotographAction: (thing, args) => PhotographAction(thing, args),
  // PlanAction: (thing, args) => PlanAction(thing, args),
  // PlayAction: (thing, args) => PlayAction(thing, args),
  // PreOrderAction: (thing, args) => PreOrderAction(thing, args),
  // QuoteAction: (thing, args) => QuoteAction(thing, args),
  // ReactAction: (thing, args) => ReactAction(thing, args),
  // ReceiveAction: (thing, args) => ReceiveAction(thing, args),
  // RegisterAction: (thing, args) => RegisterAction(thing, args),
  // RentAction: (thing, args) => RentAction(thing, args),
  // ReplaceAction: (thing, args) => ReplaceAction(thing, args),
  // ReplyAction: (thing, args) => ReplyAction(thing, args),
  // ReserveAction: (thing, args) => ReserveAction(thing, args),
  // ResumeAction: (thing, args) => ResumeAction(thing, args),
  // ReturnAction: (thing, args) => ReturnAction(thing, args),
  // ReviewAction: (thing, args) => ReviewAction(thing, args),
  // ScheduleAction: (thing, args) => ScheduleAction(thing, args),
  // SellAction: (thing, args) => SellAction(thing, args),
  // SendAction: (thing, args) => SendAction(thing, args),
  // ShareAction: (thing, args) => ShareAction(thing, args),
  // SubscribeAction: (thing, args) => SubscribeAction(thing, args),
  // SuspendAction: (thing, args) => SuspendAction(thing, args),
  // TieAction: (thing, args) => TieAction(thing, args),
  // TipAction: (thing, args) => TipAction(thing, args),
  // TrackAction: (thing, args) => TrackAction(thing, args),
  // TradeAction: (thing, args) => TradeAction(thing, args),
  // TransferAction: (thing, args) => TransferAction(thing, args),
  // TravelAction: (thing, args) => TravelAction(thing, args),
  // UnRegisterAction: (thing, args) => UnRegisterAction(thing, args),
  // VoteAction: (thing, args) => VoteAction(thing, args),
  // WantAction: (thing, args) => WantAction(thing, args),
  // WatchAction: (thing, args) => WatchAction(thing, args),
  // WearAction: (thing, args) => WearAction(thing, args),
  // WinAction: (thing, args) => WinAction(thing, args),
}
