import "../Menu.css";
import { Link } from "react-router-dom";
import { CREATE_TICKET_URL, VIEW_TICKETS_URL } from "../../../consts/PageUrls";

export function FinanceManagerMenu() {
    return (<>
        <div className="menu-button-container">
            <Link to={CREATE_TICKET_URL} className="menu-button-link">
                <button>Create Reimbursement Ticket</button>
            </Link>
            <Link to={VIEW_TICKETS_URL} className="menu-button-link">
                <button>View All Tickets</button>
            </Link>
        </div>
    </>);
}