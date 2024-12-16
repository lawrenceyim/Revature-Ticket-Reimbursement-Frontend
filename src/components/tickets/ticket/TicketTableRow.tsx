import { EmployeeRole } from "../../../enums/EmployeeRole";
import { TicketProp } from "../../../interfaces/Props";
import { getEmployeeRole } from "../../../utils/SessionStorageUtils";

export function TicketTableRow(prop: TicketProp) {
    return (<tr>
        <td>{prop.ticket.ticketId}</td>
        <td>{prop.ticket.madeBy}</td>
        <td>{prop.ticket.reimbursementType}</td>
        <td>{prop.ticket.amount}</td>
        <td>{prop.ticket.description}</td>
        <td>{prop.ticket.status}</td>
        {
            getEmployeeRole() == EmployeeRole.FINANCE_MANAGER ? (<>
                <td><button>Approve</button></td>
                <td><button>Reject</button></td>
            </>) : (<>

            </>)
        }
    </tr>);
}