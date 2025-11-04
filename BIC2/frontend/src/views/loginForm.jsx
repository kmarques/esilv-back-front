import { useState } from "react";
import Button from "../components/button";

export default function LoginForm({ setUser }) {
  const [loginSucceeded, setLoginSucceeded] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    console.log("Login user with values:", values);

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      const token = data.token;
      const [, payloadEncoded] = token.split(".");
      const payload = JSON.parse(atob(payloadEncoded));
      localStorage.setItem("token", token);
      setUser(payload);
      setLoginSucceeded(true);
      event.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" name="email" />
      <label>Password</label>
      <input type="password" name="password" />
      <Button type="submit">Login</Button>
      {loginSucceeded && <p style={{ color: "green" }}>Login successful !</p>}
    </form>
  );
}
