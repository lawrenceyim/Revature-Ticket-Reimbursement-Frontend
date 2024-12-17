import { EmployeeRole } from "../../../enums/EmployeeRole";
import { TicketStatus } from "../../../enums/TicketStatus";
import { TicketRowProp } from "../../../interfaces/Props";
import { getEmployeeRole } from "../../../utils/SessionStorageUtils";
import { approveTicketRequest, denyTicketRequest } from "./TicketStatusService";

export function TicketTableRow(prop: TicketRowProp) {

    async function approve(event: any) {
        event.preventDefault();
        console.log(prop.ticket);
        try {
            await approveTicketRequest(prop.ticket);
        } catch (error: any) {

        } finally {
            prop.callback();
        }
    }

    async function deny(event: any) {
        event.preventDefault();
        console.log(prop.ticket);
        try {
            await denyTicketRequest(prop.ticket);
        } catch (error: any) {

        } finally {
            prop.callback();
        }
    }

    return (<tr key={prop.ticket.ticketId}>
        <td>{prop.ticket.ticketId}</td>
        <td>{prop.ticket.madeBy}</td>
        <td>{prop.ticket.reimbursementType}</td>
        <td>{prop.ticket.amount}</td>
        <td>{prop.ticket.description}</td>
        <td>{prop.ticket.status}</td>
        {getEmployeeRole() == EmployeeRole.FINANCE_MANAGER && prop.ticket.status == TicketStatus.PENDING ? (<>
            <td><button onClick={approve}>Approve</button></td>
            <td><button onClick={deny}>Reject</button></td>
        </>) : (<></>)}
    </tr>);
}