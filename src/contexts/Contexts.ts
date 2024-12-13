import { createContext } from "react";
import { AccountProp, LoginProp } from "../interfaces/Props";

export const AccountContext = createContext<AccountProp>({
    account: null,
    setAccount: () => { }
});

export const LoginContext = createContext<LoginProp>({
    loggedIn: false,
    setLogIn: () => { }
})

