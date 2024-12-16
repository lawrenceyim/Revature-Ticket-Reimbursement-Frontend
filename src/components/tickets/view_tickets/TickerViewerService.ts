import { StatusCodes } from "http-status-codes";
import { Ticket } from "../../../interfaces/Ticket";
import { TicketStatusOption } from "../../../enums/TicketStatus";
import { convertTicketStatusToApiEndpoint } from "../../../utils/TicketStatusToApiUrl";

export async function findAllTicketsByStatusRequest(status: TicketStatusOption): Promise<Ticket[]> {
    const apiEndpoint: string = status == TicketStatusOption.ALL ? "" : "/" + convertTicketStatusToApiEndpoint(status);
    const response = await fetch(`http://localhost:8080/tickets${apiEndpoint}`);

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }

    const jsonBody: string = await response.json();
    const data: string = JSON.stringify(jsonBody);
    return JSON.parse(data) as Ticket[];
}

export async function findAllTicketsByAccountIdAndStatusRequest(accountId: number, status: TicketStatusOption): Promise<Ticket[]> {
    const apiEndpoint: string = status == TicketStatusOption.ALL ? "" : "/" + convertTicketStatusToApiEndpoint(status);
    const response = await fetch(`http://localhost:8080/tickets/accounts/${accountId}${apiEndpoint}`);

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }

    const jsonBody: string = await response.json();
    const data: string = JSON.stringify(jsonBody);
    return JSON.parse(data) as Ticket[];
}
