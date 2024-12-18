import "../Menu.css";
import { CREATE_TICKET_URL, MANAGE_USERS_URL, VIEW_TICKETS_URL } from "../../../consts/PageUrls";
import { Link } from "react-router-dom";

export function UserStoryManagerMenu() {
    return <>
        <div className="menu-button-container">
            <Link to={CREATE_TICKET_URL} className="menu-button-link">
                <button>Create Reimbursement Ticket</button>
            </Link>
            <Link to={VIEW_TICKETS_URL} className="menu-button-link">
                <button>View All Tickets</button>
            </Link>
            <Link to={MANAGE_USERS_URL} className="menu-button-link">
                <button>Manage Users</button>
            </Link>
        </div>
    </>;
}