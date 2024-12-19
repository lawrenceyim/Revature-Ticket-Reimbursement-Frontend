import { Account } from "./Account";
import { Ticket } from "./Ticket";

export interface AccountRowProp {
  account: Account;
  callback: () => void;
  backgroundColor: string;
  index: number;
}

export interface ErrorMessageProp {
  enabled: boolean;
  message: string;
}

export interface TicketRowProp {
    ticket: Ticket;
    callback: () => void;
    backgroundColor: string;
    index: number;
}