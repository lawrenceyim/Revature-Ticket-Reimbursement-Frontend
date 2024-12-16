import { USER_ACCOUNT } from "../consts/SessionStorageKeys";
import { EmployeeRole } from "../enums/EmployeeRole";
import { Account } from "../interfaces/Account";

export function getAccount(): Account | null {
    const accountJson: string = sessionStorage.getItem(USER_ACCOUNT) as string;
    const account: Account = JSON.parse(accountJson) as Account;
    return account;
}

export function getAccountId(): number {
    return getAccount()?.accountId as number;
}

export function getEmployeeRole(): EmployeeRole {
    return getAccount()?.employeeRole as EmployeeRole;
}