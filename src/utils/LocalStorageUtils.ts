import { USER_ACCOUNT } from "../consts/SessionStorageKeys";
import { EmployeeRole } from "../enums/EmployeeRole";
import { Account } from "../interfaces/Account";

export function getAccount(): Account {
    const accountJson: string | null = localStorage.getItem(USER_ACCOUNT);
    if (accountJson == null) {
        throw new Error("No user account data in local storage.");
    }
    const account: Account = JSON.parse(accountJson) as Account;
    return account;
}

export function getEmployeeRole(): EmployeeRole {
    return getAccount().employeeRole as EmployeeRole;
}