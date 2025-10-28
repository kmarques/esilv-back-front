import Button from "../../components/Button";

export default function RegisterForm(props) {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      login: form.login.value,
      email: form.email.value,
      password: form.password.value,
    };
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const content = await response.json();
    alert(JSON.stringify(content));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input name="email" type="email" />
      <label>Login</label>
      <input name="login" />
      <label>Password</label>
      <input name="password" type="password" />
      <Button component="input" type="submit" title="S'enregistrer" />
    </form>
  );
}
