import "../Menu.css";
import { CREATE_TICKET_URL, VIEW_TICKETS_URL } from "../../../consts/PageUrls";
import { Link } from "react-router-dom";

export function EmployeeMenu() {
    return <>
        <div className="menu-button-container">
            <Link to={CREATE_TICKET_URL} className="menu-button-link">
                <button>Create Reimbursement Ticket</button>
            </Link>
            <Link to={VIEW_TICKETS_URL} className="menu-button-link">
                <button>View All Tickets</button>
            </Link>
        </div>
    </>;
}