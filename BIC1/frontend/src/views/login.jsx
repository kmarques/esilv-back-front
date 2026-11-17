import { useEffect, useState } from "react"

export default function Login() {
    const [user, setUser] = useState();
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            fetch("http://localhost:3000/api/users/" + payload.sub, {
                headers: {
                    "authorization": "Bearer " + token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setUser(data)
                    localStorage.setItem('token', token);
                });
        } else {
            setUser(null);
            localStorage.removeItem('token');
        }
    }, [token]);

    function handleLogin(formEvent) {
        formEvent.preventDefault();
        const formdata = new FormData(formEvent.currentTarget);
        fetch("http://localhost:3000/api/security/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formdata.get('email'),
                password: formdata.get('password')
            })
        })
            .then((response) => response.json())
            .then(data => setToken(data.token));
    }

    return <>
        {!user && <form onSubmit={handleLogin}>
            <input name="email" />
            <input name="password" />
            <input type="submit" value="Se connecter" />
        </form>}
        {user && <p>User connected: {JSON.stringify(user)}
            <button onClick={() => setToken(null)}>logout</button>
        </p>}
    </>
}