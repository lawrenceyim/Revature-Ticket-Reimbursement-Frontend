import { StatusCodes } from "http-status-codes";
import { Account } from "../../interfaces/Account";
import { BadRequestError } from "../../errors/HttpErrors";

export async function findAllAccountsRequest(): Promise<Account[]> {
    const response = await fetch("http://localhost:8080/accounts");

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }

    const jsonBody: string = await response.json();
    const data: string = JSON.stringify(jsonBody);
    return JSON.parse(data) as Account[];
}

export async function updateAccountRequest(account: Account): Promise<void> {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:8080/accounts", {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(account)
    });
    
    if (response.status == StatusCodes.BAD_REQUEST) {
        throw new BadRequestError("Unable to change account.")
    }

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }
}