import { EmployeeRole } from "../../../enums/EmployeeRole";
import { AccountRowProp } from "../../../interfaces/Props";
import { replaceUnderscoreWithSpace } from "../../../utils/StringFormat";
import { updateAccountRequest } from "../AccountService";

export function AccountTableRow(props: AccountRowProp) {

    async function changeEmployeeRole(role: EmployeeRole) {
        props.account.employeeRole = role;
        try {
            await updateAccountRequest(props.account);
        } catch (error: any) {

        } finally {
            props.callback();
        }
    }

    return <tr key={props.index} style={props.index % 2 == 0 ? { backgroundColor: props.backgroundColor } : {}}>
        <td>{props.account.accountId}</td>
        <td>{props.account.firstName}</td>
        <td>{props.account.firstName}</td>
        <td>
            {props.account.employeeRole == EmployeeRole.USER_STORY_MANAGER ?
                <p>{replaceUnderscoreWithSpace(props.account.employeeRole)}</p> :
                <select
                    defaultValue={props.account.employeeRole}
                    onChange={e => changeEmployeeRole(e.target.value as EmployeeRole)}>
                    {Object.values(EmployeeRole).filter(role => {
                        return role != EmployeeRole.USER_STORY_MANAGER;
                    }).map(role =>
                        <option key={role} value={role}>{replaceUnderscoreWithSpace(role)}</option>
                    )}
                </select>
            }
        </td>
    </tr>;
}