import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/Button";
import RegisterForm from "./views/security/register-form";
import LoginForm from "./views/security/login-form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          title={`count is ${count}`}
          onClick={() => setCount((count) => count + 1)}
        />
        <Button title="Click Me" onClick={() => console.log("Click Me")} />
        <Button title="Click 2" onClick={() => alert("Click 2")} />
        <Button
          title="Supprimer"
          style={{
            backgroundColor: "red",
          }}
          onClick={() => prompt("Supprimer cette ressource ?")}
        />
        <Button
          title="Supprimer"
          variant="delete"
          onClick={() => prompt("Supprimer cette ressource ?")}
        />
        <Button title="Disabled" disabled />
        <Button title="Rounded" variant="icon" />
        <Button component="a" title="Go to google" href="https://google.fr" />
        <p>
          <h2>Register</h2>
          <RegisterForm />
          <h2>Login</h2>
          <LoginForm />
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
