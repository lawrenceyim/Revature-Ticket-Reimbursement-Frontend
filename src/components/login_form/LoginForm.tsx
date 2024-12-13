import { Account } from "../../interfaces/Account";
import { EmployeeRole } from "../../enums/EmployeeRole";
import "./LoginForm.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const navigate = useNavigate();
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
            switch (account.employeeRole) {
                case EmployeeRole.EMPLOYEE:
                    console.log("EMPLOYEE");
                    break;
                case EmployeeRole.FINANCE_MANAGER:
                    console.log("FINANCE MANAGER");
                    break;
                case EmployeeRole.USER_STORY_MANAGER:
                    console.log("USER STORY MANAGER.");
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }

    function goToRegistrationForm(event: any) {
        event.preventDefault();
        navigate("/register");
    }

    return (
        <form>
            <fieldset className="login-fieldset">
                <legend>Employee Login</legend>
                
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={e => usernameRef.current = e.target.value}/>
                
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={e => passwordRef.current = e.target.value}/>
                
                <button onClick={login}>Login</button>
                <button onClick={goToRegistrationForm}>Register</button>
            </fieldset>
        </form>
    );
}