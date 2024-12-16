import { StatusCodes } from "http-status-codes";
import { Ticket } from "../../../interfaces/Ticket";

export async function findAllTicketsRequest(): Promise<Ticket[]> {
    const response = await fetch("http://localhost:8080/tickets");

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }

    const jsonBody: string = await response.json();
    const data: string = JSON.stringify(jsonBody);
    return JSON.parse(data) as Ticket[];
}