import "./LoginForm.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../../consts/ApiConsts";
import { NavBar } from "../nav_bar/NavBar";
import { MENU_URL, REGISTRATION_URL } from "../../consts/PageUrls";
import { sendLoginRequest } from "./LoginService";
import { isPasswordValid, isUsernameValid } from "../../utils/Validation";
import { BadRequestError } from "../../errors/HttpErrors";
import { ErrorMessage } from "../error_message/ErrorMessage";

export function LoginForm() {
    const navigate = useNavigate();
    const [errorMessageEnabled, setErrorMessageEnabled] = useState<boolean>(false);
    const [formIsValid, setFormValidity] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const errorMessageRef = useRef<string>("");

    useEffect(() => {
        validateForm();
    }, [password, username]);

    function validateForm(): void {
        if (!isUsernameValid(username.trim()) ||
            !isPasswordValid(password.trim())
        ) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }
    }

    async function login(event: any): Promise<void> {
        event.preventDefault();
        setWaitingForResponse(true);
        setErrorMessageEnabled(false);

        const jsonBody: string = JSON.stringify({
            username: username.trim(),
            password: password.trim()
        });

        try {
            await sendLoginRequest(jsonBody);
            navigate(MENU_URL);
        } catch (error: any) {
            if (error instanceof BadRequestError) {
                errorMessageRef.current = "Invalid login credentials.";
            } else {
                errorMessageRef.current = "Server unavailable.";
            }

            setWaitingForResponse(false);
            setErrorMessageEnabled(true);
        }
    }

    function goToRegistrationForm(event: any) {
        event.preventDefault();
        navigate(REGISTRATION_URL);
    }

    return (<>
        <NavBar />
        <form onSubmit={login}>
            <fieldset className="login-fieldset">
                <legend>Employee Login</legend>

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

                {<ErrorMessage enabled={errorMessageEnabled} message={errorMessageRef.current} />}
                <button type="submit" disabled={!formIsValid || waitingForResponse}>Login</button>
                <button onClick={goToRegistrationForm}>Go to Registration</button>
            </fieldset>
        </form>
    </>);
}