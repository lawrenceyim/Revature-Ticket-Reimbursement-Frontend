import { EmployeeRole } from "../../enums/EmployeeRole";
import { NavBar } from "../nav_bar/NavBar";
import { EmployeeMenu } from "./employee_menu/EmployeeMenu";
import { FinanceManagerMenu } from "./finance_manager_menu/FinanceManagerMenu";
import { UserStoryManagerMenu } from "./user_story_manager_menu/UserStoryManagerMenu";
import { getEmployeeRole } from "../../utils/SessionStorageUtils";

export function MainMenu() {
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