import { useRef } from "react";

export function RegistrationForm() {
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const firstNameRef = useRef<string>("");
    const lastNameRef = useRef<string>("");

    function register(event: any) {
        event.preventDefault();

    }

    function returnToLoginPage(event: any) {
        event.preventDefault();
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
                    type="text"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={e => passwordRef.current = e.target.value}/>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="first name"
                    onChange={e => firstNameRef.current = e.target.value}/>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="last name"
                    onChange={e => lastNameRef.current = e.target.value}/>
                <button onClick={register}>Register</button>
                <button onClick={returnToLoginPage}>Return to Login Page</button>
            </fieldset>
        </form>
    );
}