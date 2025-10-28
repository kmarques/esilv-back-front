import { useState } from "react";
import Button from "../../components/Button";

export default function LoginForm(props) {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      email: form.email.value,
      password: form.password.value,
    };
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.status === 401) {
      setInvalidCredentials(true);
    } else {
      setInvalidCredentials(false);
      const content = await response.json();
      alert(JSON.stringify(content));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {invalidCredentials && <p style={{ color: "red" }}>invalidCredentials</p>}
      <label>Email</label>
      <input name="email" type="email" />
      <label>Password</label>
      <input name="password" type="password" />
      <Button component="input" type="submit" title="Se connecter" />
    </form>
  );
}
