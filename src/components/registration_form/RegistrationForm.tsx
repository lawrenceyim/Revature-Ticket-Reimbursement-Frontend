import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../../consts/ApiConsts";
import { NavBar } from "../nav_bar/NavBar";
import { MENU_URL } from "../../consts/PageUrls";
import { sendRegistrationRequest } from "./RegistrationService";
import { isUsernameValid, isPasswordValid, isFirstNameValid, isLastNameValid } from "../../utils/Validation";
import { ErrorMessage } from "../error_message/ErrorMessage";
import { BadRequestError } from "../../errors/HttpErrors";
import { isLoggedIn } from "../../utils/LoginValidation";

export function RegistrationForm() {
    const navigate = useNavigate();
    const [errorMessageEnabled, setErrorMessageEnabled] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [formIsValid, setFormValidity] = useState<boolean>(false);
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const errorMessageRef = useRef<string>("");

    useEffect(() => {
        validateForm();
    }, [firstName, lastName, password, username])

    useEffect(() => {
        if (isLoggedIn()) {
            navigate(MENU_URL);
        }
    });

    if (isLoggedIn()) {
        return null;
    }

    function validateForm(): void {
        if (!isUsernameValid(username.trim()) ||
            !isPasswordValid(password.trim()) ||
            !isFirstNameValid(firstName.trim()) ||
            !isLastNameValid(lastName.trim())
        ) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }
    }

    async function register(event: any) {
        event.preventDefault();
        setWaitingForResponse(true);
        setErrorMessageEnabled(false);

        const jsonBody: string = JSON.stringify({
            username: username.trim(),
            password: password.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim()
        });

        try {
            await sendRegistrationRequest(jsonBody);
            navigate(MENU_URL)
        } catch (error: any) {
            if (error instanceof BadRequestError) {
                errorMessageRef.current = "Username already taken.";
            } else {
                errorMessageRef.current = "Server unavailable.";
            }

            setWaitingForResponse(false);
            setErrorMessageEnabled(true);
        }
    }

    return (<>
        <NavBar />
        <form onSubmit={register}>
            <fieldset className="login-fieldset">
                <legend>Employee Registration</legend>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    required
                    minLength={MIN_USERNAME_LENGTH}
                    maxLength={MAX_USERNAME_LENGTH}
                    onChange={e => setUsername(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    maxLength={MAX_PASSWORD_LENGTH}
                    onChange={e => setPassword(e.target.value)} />

                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="first name"
                    required
                    minLength={1}
                    maxLength={MAX_FIRST_NAME_LENGTH}
                    onChange={e => setFirstName(e.target.value)} />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="last name"
                    required
                    minLength={1}
                    maxLength={MAX_LAST_NAME_LENGTH}
                    onChange={e => setLastName(e.target.value)} />

                {<ErrorMessage enabled={errorMessageEnabled} message={errorMessageRef.current} />}
                <button type="submit" disabled={!formIsValid || waitingForResponse}>Register</button>
            </fieldset>
        </form>
    </>);
}