import { useEffect } from "react";
import { LOGGED_IN, USER_ACCOUNT } from "../../consts/SessionStorageKeys";
import { Account } from "../../interfaces/Account";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";

export function MainMenu() {
    const navigate = useNavigate();
    const accountJson: string | null = sessionStorage.getItem(USER_ACCOUNT);
    let account: Account;

    if (accountJson) {
        account = JSON.parse(accountJson) as Account;
    }

    useEffect(() => {
        if (!sessionStorage.getItem(LOGGED_IN) || !accountJson) {
            navigate(LOGIN_URL);
        }
    })

    return (<>
    </>);
}