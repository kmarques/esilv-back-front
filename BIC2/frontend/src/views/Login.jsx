import { useState } from "react";
import Button from "../components/Button";

export default function LoginForm() {
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
    }

    return <form onSubmit={handleSubmit}>
        <input value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
        {errors.email}
        <input value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
        {errors.password}
        <Button content="Se connecter" />
    </form>
}