import "./LoginBox.css";
import { useState } from "react";

export function LoginBox() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");



    // What is the data type of the event param?
    async function login(event: any) {
        event?.preventDefault();
        console.log(username);
        console.log(password);

        const loginHeaders : Headers = new Headers();
        loginHeaders.append("Content-Type", "application/json");
        
        const jsonBody: string = JSON.stringify({
            username: username,
            password: password
        });

        const response = await fetch("http://localhost:8080/accounts/login", {
            method: "POST",
            headers: loginHeaders,
            body: jsonBody
        });
        
        const json = await response.json();
        console.log(json);
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}></input>
            <label htmlFor="password">Password</label>
            <input
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={login}>Login</button>
        </fieldset>
    </form>;
}