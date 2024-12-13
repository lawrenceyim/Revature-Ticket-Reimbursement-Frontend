import { createContext } from "react";
import { AccountProp, LoggedInProp } from "../interfaces/Props";

export const AccountContext = createContext<AccountProp>({
    account: null,
    setAccount: () => { }
});

export const LogInContext = createContext<LoggedInProp>({
    loggedIn: false,
    setLogIn: () => { }
})

