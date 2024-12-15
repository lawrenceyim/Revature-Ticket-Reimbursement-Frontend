import { USER_ACCOUNT } from "../consts/SessionStorageKeys";
import { EmployeeRole } from "../enums/EmployeeRole";
import { Account } from "../interfaces/Account";

export function getAccount(): Account | null {
    const accountJson: string | null = sessionStorage.getItem(USER_ACCOUNT);
    if (accountJson == null) {
        return null;
    }
    const account: Account = JSON.parse(accountJson) as Account;
    return account;
}

export function getEmployeeRole(): EmployeeRole {
    return getAccount()?.employeeRole as EmployeeRole;
}