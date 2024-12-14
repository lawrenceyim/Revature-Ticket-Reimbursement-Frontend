import { LOGGED_IN, USER_ACCOUNT } from "../../consts/SessionStorageKeys";
import { Account } from "../../interfaces/Account";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";
import { EmployeeRole } from "../../enums/EmployeeRole";
import { useEffect } from "react";

export function MainMenu() {
    const navigate = useNavigate();
    const accountJson: string | null = sessionStorage.getItem(USER_ACCOUNT);

    useEffect(() => {
        if (!sessionStorage.getItem(LOGGED_IN) || accountJson == null) {
            navigate(LOGIN_URL);
        }
    })

    if (!sessionStorage.getItem(LOGGED_IN) || accountJson == null) {
        return null;
    }

    const account: Account = JSON.parse(accountJson) as Account;
    const employeeRole: EmployeeRole = account.employeeRole as EmployeeRole;

    switch (employeeRole) {
        case EmployeeRole.EMPLOYEE:
            return <></>;
        case EmployeeRole.FINANCE_MANAGER:
            return <></>;
        case EmployeeRole.USER_STORY_MANAGER:
            return <></>;
    }
}