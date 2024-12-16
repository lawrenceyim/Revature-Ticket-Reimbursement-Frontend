import "./TicketViewer.css";
import { EmployeeRole } from "../../../enums/EmployeeRole";
import { getAccountId, getEmployeeRole } from "../../../utils/SessionStorageUtils";
import { NavBar } from "../../nav_bar/NavBar";
import { useEffect, useState } from "react";
import { Ticket } from "../../../interfaces/Ticket";
import { TicketStatusOption } from "../../../enums/TicketStatus";
import { TicketTableRow } from "../ticket/TicketTableRow";
import { findAllTicketsByAccountIdAndStatusRequest, findAllTicketsByStatusRequest } from "./TickerViewerService";

export function TicketViewer() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [status, setStatus] = useState<TicketStatusOption>(TicketStatusOption.ALL);

    useEffect(() => {
        changeTicketsShown();
    }, [status])

    async function changeTicketsShown() {
        try {
            const receivedTickets: Ticket[] = getEmployeeRole() == EmployeeRole.EMPLOYEE ?
                await findAllTicketsByAccountIdAndStatusRequest(getAccountId(), status) :
                await findAllTicketsByStatusRequest(status);
            setTickets(receivedTickets);
        } catch (error: any) {
            setTickets([]);
        }
    }

    return (<>
        <NavBar />
        <table className="ticket-viewer">
            <tr key="table-headers">
                <th>Ticket ID</th>
                <th>User ID</th>
                <th>Reimbursement Type</th>
                <th>Reimbursement Amount</th>
                <th>Description</th>
                <th>
                    <select
                       defaultValue={TicketStatusOption.ALL}
                        onChange={e => setStatus(e.target.value as TicketStatusOption)}>
                        {Object.values(TicketStatusOption).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </th>
                {getEmployeeRole() == EmployeeRole.FINANCE_MANAGER ? (<>
                    <th>Approve</th>
                    <th>Reject</th>
                </>) : (<></>)}
            </tr>

            {tickets.map(ticket =>
                <TicketTableRow ticket={ticket} />
            )}
        </table>

        {tickets.length == 0 ? (<p id="no-ticket-p">No tickets</p>) : (<></>)}
    </>);
}