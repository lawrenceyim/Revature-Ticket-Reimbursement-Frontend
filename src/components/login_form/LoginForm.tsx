import "./LoginForm.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../../api_data/ApiConsts";
import { NavBar } from "../nav_bar/NavBar";
import { LOGGED_IN } from "../../consts/SessionStorageKeys";
import { MENU_URL, REGISTRATION_URL } from "../../consts/PageUrls";
import { sendLoginRequest } from "./LoginService";
import { isPasswordValid, isUsernameValid } from "../../utils/Validation";

export function LoginForm() {
    const navigate = useNavigate();
    const [formIsValid, setFormValidity] = useState<boolean>(false);
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("");

    useEffect(() => {
        if (sessionStorage.getItem(LOGGED_IN)) {
            navigate(MENU_URL);
        }
    });

    if (sessionStorage.getItem(LOGGED_IN)) {
        return null;
    }

    function validateForm(): void {
        if (!isUsernameValid(usernameRef.current) ||
            !isPasswordValid(passwordRef.current)
        ) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }
    }

    async function login(event: any): Promise<void> {
        event.preventDefault();
        setWaitingForResponse(true);

        const jsonBody: string = JSON.stringify({
            username: usernameRef.current.trim(),
            password: passwordRef.current
        });
        const loginSuccessful: boolean = await sendLoginRequest(jsonBody);
        loginSuccessful ? navigate(MENU_URL) : setWaitingForResponse(false);
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

                <button type="submit" disabled={!formIsValid && !waitingForResponse}>Login</button>
                <button onClick={goToRegistrationForm}>Go to Registration</button>
            </fieldset>
        </form>
    </>);
}