import { StatusCodes } from "http-status-codes";
import { USER_ACCOUNT, LOGGED_IN } from "../../consts/SessionStorageKeys";
import { BadRequestError } from "../../errors/HttpErrors";
import { Account } from "../../interfaces/Account";

export async function sendLoginRequest(jsonBody: string): Promise<void> {
    const loginHeaders: Headers = new Headers();
    loginHeaders.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:8080/accounts/login", {
        method: "POST",
        headers: loginHeaders,
        body: jsonBody
    });

    if (response.status == StatusCodes.BAD_REQUEST) {
        throw new BadRequestError("Invalid login credentials.");
    }

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }

    const account: Account = await response.json();
    sessionStorage.setItem(USER_ACCOUNT, JSON.stringify(account));
    sessionStorage.setItem(LOGGED_IN, JSON.stringify(true));
}