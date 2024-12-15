import { useNavigate } from "react-router-dom";
import "../Menu.css";
import { CREATE_TICKET_URL, VIEW_TICKETS_URL } from "../../../consts/PageUrls";

export function EmployeeMenu() {
    const navigate = useNavigate();

    function goToTicketCreation(event: any) {
        event.preventDefault();
        navigate(CREATE_TICKET_URL)    
    }

    function goToPastTickets(event: any) {
        event.preventDefault();
        navigate(VIEW_TICKETS_URL);
    }

    return (<>
        <div className="menu-button-container">
            <button onClick={goToTicketCreation}>Create Reimbursement Ticket</button>
            <button onClick={goToPastTickets}>View All Tickets</button>
        </div>
    </>);
}