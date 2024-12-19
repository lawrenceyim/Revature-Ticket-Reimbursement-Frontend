import { ReimbursementType } from "../enums/ReimbursementType";
import { TicketStatus } from "../enums/TicketStatus";

export interface Ticket {
    ticketId: number,
    madeBy: number,
    reimbursementType: ReimbursementType,
    reimbursementAmount: number,
    description: string,
    status: TicketStatus
}