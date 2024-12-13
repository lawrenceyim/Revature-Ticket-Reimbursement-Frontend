import { Account } from "./Account"

export interface AccountProp {
  account: Account | null,
  setAccount: (account: Account) => void
}

export interface LoginProp {
  loggedIn: boolean,
  setLogIn: (loggedIn: boolean) => void
}