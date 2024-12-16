import { Ticket } from "./Ticket";

export interface ErrorMessageProp {
  enabled: boolean;
  message: string;
}

export interface TicketProp {
    ticket: Ticket
}