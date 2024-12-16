import { TicketStatusOption } from "../enums/TicketStatus";

export function convertTicketStatusToApiEndpoint(status: TicketStatusOption) {
    switch(status) {
        case TicketStatusOption.APPROVED:
            return "approved";
        case TicketStatusOption.DENIED:
            return "denied";
        case TicketStatusOption.PENDING:
            return "pending";
        case TicketStatusOption.ALL:
            return "";
    }
}