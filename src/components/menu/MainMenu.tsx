import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";
import { EmployeeRole } from "../../enums/EmployeeRole";
import { useEffect } from "react";
import { NavBar } from "../nav_bar/NavBar";
import { EmployeeMenu } from "./employee_menu/EmployeeMenu";
import { FinanceManagerMenu } from "./finance_manager_menu/FinanceManagerMenu";
import { UserStoryManagerMenu } from "./user_story_manager_menu/UserStoryManagerMenu";
import { isLoggedIn } from "../../utils/LoginValidation";
import { getEmployeeRole } from "../../utils/LocalStorageUtils";

export function MainMenu() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate(LOGIN_URL);
        }
    })

    if (!isLoggedIn()) {
        return null;
    }

    switch (getEmployeeRole()) {
        case EmployeeRole.EMPLOYEE:
            return <>
                <NavBar />
                <EmployeeMenu />
            </>;
        case EmployeeRole.FINANCE_MANAGER:
            return <>
                <NavBar />
                <FinanceManagerMenu />
            </>;
        case EmployeeRole.USER_STORY_MANAGER:
            return <>
                <NavBar />
                <UserStoryManagerMenu />
            </>;
    }
}