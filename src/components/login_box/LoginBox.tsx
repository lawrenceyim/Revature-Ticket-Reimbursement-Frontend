import "./LoginBox.css";
import { useRef, useState } from "react";

export function LoginBox() {
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("")

    async function login(event: any) {
        event?.preventDefault();
        console.log(usernameRef.current);
        console.log(passwordRef.current);

        const loginHeaders : Headers = new Headers();
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
            const json: string = await response.json();
            console.log(json);
        } catch (e) {
            console.log(e);
        }
    }

    return <form>
        <fieldset className="login-fieldset">
            <legend>
                Employee Login
            </legend>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                onChange={(e) => usernameRef.current = e.target.value}></input>
            <label htmlFor="password">Password</label>
            <input
                type="text"
                id="password"
                name="password"
                placeholder="password"
                onChange={(e) => passwordRef.current = e.target.value}></input>
            <button onClick={login}>Login</button>
        </fieldset>
    </form>;
}