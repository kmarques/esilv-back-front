import Button from "../components/button";

export default function RegisterForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = {
      name: event.target.name.value,
      age: event.target.age.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    console.log("Registering user with values:", values);

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    alert("Response from server: " + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Age</label>
      <input type="number" name="age" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Password</label>
      <input type="password" name="password" />
      <Button type="submit">Register</Button>
    </form>
  );
}
