import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../../consts/ApiConsts";
import { NavBar } from "../nav_bar/NavBar";
import { LOGIN_URL, MENU_URL } from "../../consts/PageUrls";
import { sendRegistrationRequest } from "./RegistrationService";
import { isUsernameValid, isPasswordValid, isFirstNameValid, isLastNameValid } from "../../utils/Validation";
import { ErrorMessage } from "../error_message/ErrorMessage";
import { BadRequestError } from "../../errors/HttpErrors";
import { isLoggedIn } from "../../utils/LoginValidation";

export function RegistrationForm() {
    const navigate = useNavigate();
    const [formIsValid, setFormValidity] = useState<boolean>(false);
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const [errorMessageEnabled, setErrorMessageEnabled] = useState<boolean>(false);
    const errorMessageRef = useRef<string>("");
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const firstNameRef = useRef<string>("");
    const lastNameRef = useRef<string>("");

    useEffect(() => {
        if (isLoggedIn()) {
            navigate(MENU_URL);
        }
    });

    if (isLoggedIn()) {
        return null;
    }

    function validateForm(): void {
        if (!isUsernameValid(usernameRef.current) ||
            !isPasswordValid(passwordRef.current) ||
            !isFirstNameValid(firstNameRef.current) ||
            !isLastNameValid(lastNameRef.current)
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
            username: usernameRef.current.trim(),
            password: passwordRef.current,
            firstName: firstNameRef.current,
            lastName: lastNameRef.current
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

    function returnToLoginPage(event: any) {
        event.preventDefault();
        navigate(LOGIN_URL);
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
                    onChange={e => {
                        usernameRef.current = e.target.value;
                        validateForm();
                    }} />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    maxLength={MAX_PASSWORD_LENGTH}
                    onChange={e => {
                        passwordRef.current = e.target.value;
                        validateForm();
                    }} />

                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="first name"
                    required
                    minLength={1}
                    maxLength={MAX_FIRST_NAME_LENGTH}
                    onChange={e => {
                        firstNameRef.current = e.target.value;
                        validateForm();
                    }} />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="last name"
                    required
                    minLength={1}
                    maxLength={MAX_LAST_NAME_LENGTH}
                    onChange={e => {
                        lastNameRef.current = e.target.value;
                        validateForm();
                    }} />

                {<ErrorMessage enabled={errorMessageEnabled} message={errorMessageRef.current} />}
                <button type="submit" disabled={!formIsValid || waitingForResponse}>Register</button>
                <button onClick={returnToLoginPage}>Return to Login</button>
            </fieldset>
        </form>
    </>);
}