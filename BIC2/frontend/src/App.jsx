import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/button";
import RegisterForm from "./views/registerForm";

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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button onClick={() => console.log("Click 1")} title="Click 1" />
        <Button onClick={() => alert("Click 2")} title="Click 2" />
        <Button onClick={() => confirm("Click 3")} title="Click 3" />
        <Button onClick={() => prompt("Click 4")} title="Click 4" />
        <Button
          title="Supprimer"
          style={{ backgroundColor: "red", color: "white" }}
        />
        <Button disabled variant="icon" title="Click______6" />
        <Button component="a" href="https://google.fr" title="Go to google" />
        <Button component="input" type="submit">
          Save
        </Button>
        <p>
          <RegisterForm />
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
