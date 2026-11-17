import { useState } from "react";
import Button from "../components/Button";

export default function LoginForm({ onLogin }) {
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        if (!email.includes("@")) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "must include @"
            }));
        }
        fetch("http://localhost:3000/api/security/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password
            })
        })
            .then(resp => resp.json())
            .then(data => onLogin(data.token));

    }

    return <form onSubmit={handleSubmit}>
        <input value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
        {errors.email}
        <input value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
        {errors.password}
        <Button content="Se connecter" />
    </form>
}