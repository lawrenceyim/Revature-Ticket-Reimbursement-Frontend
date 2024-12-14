import { USER_ACCOUNT, LOGGED_IN } from "../../consts/SessionStorageKeys";
import { Account } from "../../interfaces/Account";

export async function sendLoginRequest(jsonBody: string): Promise<boolean> {
    try {
        const loginHeaders: Headers = new Headers();
        loginHeaders.append("Content-Type", "application/json");

        const response = await fetch("http://localhost:8080/accounts/login", {
            method: "POST",
            headers: loginHeaders,
            body: jsonBody
        });

        const account: Account = await response.json();
        sessionStorage.setItem(USER_ACCOUNT, JSON.stringify(account));
        sessionStorage.setItem(LOGGED_IN, JSON.stringify(true));

        return true;
    } catch (e) {
        return false;
    }
}