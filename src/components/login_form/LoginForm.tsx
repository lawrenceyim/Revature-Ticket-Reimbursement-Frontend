import { Account } from "../../interfaces/Account";
import { EmployeeRole } from "../../enums/EmployeeRole";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../../api_data/ApiConsts";
import { NavBar } from "../nav_bar/NavBar";
import "./LoginForm.css";
import { AccountContext, LoginContext } from "../../contexts/Contexts";

export function LoginForm() {
    const navigate = useNavigate();
    const accountContext = useContext(AccountContext);
    const loginContext = useContext(LoginContext);
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("")

    async function login(event: any) {
        event.preventDefault();

        const loginHeaders: Headers = new Headers();
        loginHeaders.append("Content-Type", "application/json");

        const jsonBody: string = JSON.stringify({
            username: usernameRef.current.trim(),
            password: passwordRef.current
        });

        const response = await fetch("http://localhost:8080/accounts/login", {
            method: "POST",
            headers: loginHeaders,
            body: jsonBody
        });

        try {
            const account: Account = await response.json();
            accountContext.setAccount(account);
            loginContext.setLogIn(true);
            navigate("/menu");
        } catch (e) {
            console.log(e);
        }
    }

    function goToRegistrationForm(event: any) {
        event.preventDefault();
        navigate("/register");
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

                <button type="submit">Login</button>
                <button onClick={goToRegistrationForm}>Go to Registration</button>
            </fieldset>
        </form>
    </>);
}