import { Account } from "./Account"

export interface AccountProp {
  account: Account | null,
  setAccount: (account: Account) => void
}

export interface LoggedInProp {
  loggedIn: boolean,
  setLogIn: (loggedIn: boolean) => void
}