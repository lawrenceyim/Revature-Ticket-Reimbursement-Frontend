import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../../api_data/ApiConsts";
import { NavBar } from "../nav_bar/NavBar";
import { LOGGED_IN } from "../../consts/SessionStorageKeys";
import { LOGIN_URL, MENU_URL } from "../../consts/PageUrls";
import { sendRegistrationRequest } from "./RegistrationService";

export function RegistrationForm() {
    const navigate = useNavigate();
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const firstNameRef = useRef<string>("");
    const lastNameRef = useRef<string>("");

    useEffect(() => {
        if (sessionStorage.getItem(LOGGED_IN)) {
            navigate(MENU_URL);
        }
    });

    if (sessionStorage.getItem(LOGGED_IN)) {
        return null;
    }

    async function register(event: any) {
        event.preventDefault();
        const jsonBody: string = JSON.stringify({
            username: usernameRef.current.trim(),
            password: passwordRef.current,
            firstName: firstNameRef.current,
            lastName: lastNameRef.current
        });
        const registrationSuccessful: boolean = await sendRegistrationRequest(jsonBody);
        registrationSuccessful ? navigate(MENU_URL) : null;
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
                    onChange={e => usernameRef.current = e.target.value} />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    maxLength={MAX_PASSWORD_LENGTH}
                    onChange={e => passwordRef.current = e.target.value} />

                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="first name"
                    required
                    minLength={1}
                    maxLength={MAX_FIRST_NAME_LENGTH}
                    onChange={e => firstNameRef.current = e.target.value} />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="last name"
                    required
                    minLength={1}
                    maxLength={MAX_LAST_NAME_LENGTH}
                    onChange={e => lastNameRef.current = e.target.value} />

                <button type="submit">Register</button>
                <button onClick={returnToLoginPage}>Return to Login</button>
            </fieldset>
        </form>
    </>);
}