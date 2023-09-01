export enum CHANNEL_STATES {
  closed = "closed",
  errored = "errored",
  joined = "joined",
  joining = "joining",
  leaving = "leaving",
}

export enum RESPONSE_INVITE {
  resolve = "resolve",
  reject = "reject",
  invitation = "invitation",
}

export enum BATTLE_EVENTS {
  rematch = "rematch",
  rematch_resolve = "rematch_resolve",
  rematch_reject = "rematch_reject",
  exit = "exit",
  move = "move",
  reset = "reset",
}
