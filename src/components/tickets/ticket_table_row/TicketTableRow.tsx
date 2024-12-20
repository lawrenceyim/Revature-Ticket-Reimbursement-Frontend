import { EmployeeRole } from "../../../enums/EmployeeRole";
import { TicketStatus } from "../../../enums/TicketStatus";
import { TicketRowProp } from "../../../interfaces/Props";
import { getEmployeeRole } from "../../../utils/SessionStorageUtils";
import { approveTicketRequest, denyTicketRequest } from "./TicketStatusService";

export function TicketTableRow(props: TicketRowProp) {

    async function approve(event: any) {
        event.preventDefault();
        try {
            await approveTicketRequest(props.ticket);
        } catch (error: any) {

        } finally {
            props.callback();
        }
    }

    async function deny(event: any) {
        event.preventDefault();
        try {
            await denyTicketRequest(props.ticket);
        } catch (error: any) {

        } finally {
            props.callback();
        }
    }

    return (<tr key={props.index} style={props.index % 2 == 0 ? { backgroundColor: props.backgroundColor } : {}}>
        <td>{props.ticket.ticketId}</td>
        <td>{props.ticket.madeBy}</td>
        <td>{props.ticket.reimbursementType}</td>
        <td>{props.ticket.reimbursementAmount}</td>
        <td>{props.ticket.description}</td>
        <td>{props.ticket.status}</td>
        {getEmployeeRole() == EmployeeRole.FINANCE_MANAGER && props.ticket.status == TicketStatus.PENDING ? <>
            <td><button onClick={approve}>Approve</button></td>
            <td><button onClick={deny}>Deny</button></td>
        </> : <>
            <td></td>
            <td></td>
        </>}
    </tr>);
}