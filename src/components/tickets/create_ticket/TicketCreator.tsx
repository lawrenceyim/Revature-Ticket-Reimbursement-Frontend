import "./TicketCreator.css";
import { useEffect, useRef, useState } from "react";
import { MAX_TICKET_DESCRIPTION_LENGTH } from "../../../consts/ApiConsts";
import { ReimbursementType } from "../../../enums/ReimbursementType";
import { NavBar } from "../../nav_bar/NavBar";
import { useNavigate } from "react-router-dom";
import { MENU_URL } from "../../../consts/PageUrls";
import { getAccountId } from "../../../utils/SessionStorageUtils";
import { BadRequestError } from "../../../errors/HttpErrors";
import { ErrorMessage } from "../../error_message/ErrorMessage";
import { sendTicketCreationRequest } from "./TicketCreationService";

export function TicketCreator() {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [errorMessageEnabled, setErrorMessageEnabled] = useState<boolean>(false);
    const [formIsValid, setFormValidity] = useState<boolean>(false);
    const [ticketCreated, setTicketCreated] = useState<boolean>(false);
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const errorMessageRef = useRef<string>("");
    const reimbursementTypeRef = useRef<ReimbursementType>(ReimbursementType.FOOD);

    useEffect(() => {
        validateForm();
    }, [amount, description]);

    function truncateAmountToTwoDecimals(event: any) {
        let inputAmount: number = event.target.value;
        inputAmount = Math.floor(inputAmount * 100) / 100;
        setAmount(inputAmount);
    }

    function validateForm(): void {
        if (amount <= 0 || description.trim().length == 0) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }
    }

    function clearForm() {
        setAmount(0);
        setDescription("");
    }

    async function submitTicket(event: any) {
        event.preventDefault();
        setErrorMessageEnabled(false);
        setWaitingForResponse(true);
        setTicketCreated(false);

        const jsonBody: string = JSON.stringify({
            description: description.trim(),
            madeBy: getAccountId(),
            reimbursementAmount: amount,
            reimbursementType: reimbursementTypeRef.current
        });

        try {
            await sendTicketCreationRequest(jsonBody);
            setTicketCreated(true);
            clearForm();
        } catch (error: any) {
            if (error instanceof BadRequestError) {
                errorMessageRef.current = "Invalid ticket details.";
            } else {
                errorMessageRef.current = "Server unavailable.";
            }
            setErrorMessageEnabled(true);
        } finally {
            setWaitingForResponse(false);
        }
    }

    return (<>
        <NavBar />
        <form onSubmit={submitTicket}>
            <fieldset className="ticket-creation-form">
                <legend>Reimbursement Ticket Form</legend>

                <label htmlFor="reimbursement-type">Reimbursement Type</label>
                <select
                    name="reimbursement-type"
                    id="reimbursement-type"
                    required
                    onChange={e => reimbursementTypeRef.current = e.target.value as ReimbursementType}>
                    {Object.values(ReimbursementType).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <label>Reimbursement Amount</label>
                <input
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    value={amount}
                    onInput={e => truncateAmountToTwoDecimals(e)} />

                <label>Reimbursement Description</label>
                <textarea
                    placeholder="description"
                    required
                    minLength={1}
                    maxLength={MAX_TICKET_DESCRIPTION_LENGTH}
                    value={description}
                    onChange={e => setDescription(e.target.value)} />

                {<ErrorMessage enabled={errorMessageEnabled} message={errorMessageRef.current} />}
                {ticketCreated ? <p style={{color: "green"}}>Ticket created.</p> : <></>}
                <button type="submit" disabled={!formIsValid || waitingForResponse}>Submit</button>
            </fieldset>
        </form>
    </>);
}