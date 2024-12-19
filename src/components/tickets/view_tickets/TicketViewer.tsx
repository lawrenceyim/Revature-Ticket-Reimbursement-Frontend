import "./TicketViewer.css";
import { EmployeeRole } from "../../../enums/EmployeeRole";
import { getAccountId, getEmployeeRole } from "../../../utils/SessionStorageUtils";
import { NavBar } from "../../nav_bar/NavBar";
import { useEffect, useState } from "react";
import { Ticket } from "../../../interfaces/Ticket";
import { TicketStatusOption } from "../../../enums/TicketStatus";
import { TicketTableRow } from "../ticket_table_row/TicketTableRow";
import { findAllTicketsByAccountIdAndStatusRequest, findAllTicketsByStatusRequest } from "./TickerViewerService";

export function TicketViewer() {
    const [fetching, setFetching] = useState<boolean>(false);
    const [reimbursementType, setReimbursementType] = useState<boolean>(false);
    const [serverUnavailable, setServerUnavailable] = useState<boolean>(false);
    const [status, setStatus] = useState<TicketStatusOption>(TicketStatusOption.ALL);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        changeTicketsShown();
    }, [status])

    async function changeTicketsShown() {
        setTickets([]);
        setFetching(true);
        setServerUnavailable(false);

        try {
            const receivedTickets: Ticket[] = getEmployeeRole() == EmployeeRole.FINANCE_MANAGER ?
                await findAllTicketsByStatusRequest(status) :
                await findAllTicketsByAccountIdAndStatusRequest(getAccountId(), status);
            setFetching(false);
            setTickets(receivedTickets);
        } catch (error: any) {
            setFetching(false);
            setServerUnavailable(true);
            setTickets([]);
        }
    }

    function Notification(): JSX.Element {
        if (serverUnavailable) {
            return <p className="notification" style={{ color: "red" }}>Server unavailable.</p>
        }
        if (fetching) {
            return <p className="notification" style={{ color: "blue" }}>Fetching ticket data from server.</p>
        }
        return <p className="notification">No Tickets found</p>;
    }

    return (<>
        <NavBar />
        <table className="ticket-viewer">
            <thead>
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
                            {Object.values(TicketStatusOption).map(type => 
                                <option key={type} value={type}>{type}</option>
                            )}
                        </select>
                    </th>
                    {getEmployeeRole() == EmployeeRole.FINANCE_MANAGER ? (<>
                        <th>Approve</th>
                        <th>Deny</th>
                    </>) : <></>}
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket, index) =>
                    <TicketTableRow key={index} index={index} ticket={ticket} callback={changeTicketsShown} backgroundColor="grey" />
                )}
            </tbody>
        </table>

        {tickets.length == 0 ? <Notification /> : <></>}
    </>);
}