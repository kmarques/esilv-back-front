import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createElement } from 'react'
import Button from './components/Button'
import LoginForm from './views/Login'
import Articles from './views/articles'

function App() {
  const [count, setCount] = useState(0)

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
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {[1, 2, 3].map(item => {
        const Tag = "p" + item;
        return <Tag data-item={item} className="read-the-docs">
          {item} Click on the Vite and React logos to learn more
        </Tag>
      })}
      {[1, 2, 3].map(item => createElement(
        "p" + item,
        { className: "read-the-docs", "data-item": item },
        item, " Click on the Vite and React logos to learn more ", count, " clicks"
      ))}
      <Button content="Click Me" onClick={() => console.log("vcbjhiouygjfhh,")} />
      <Button content="Press me" onClick={() => alert(",n;bkhjvg nn;jkguhbn;jhkb")} />
      <Button content="Click Me 2" content2="Content 2" onClick={() => confirm("nbvcfghj;,n")} />
      <Button component="a" href="https://google.fr" content={<img src={reactLogo} />} onClick={() => prompt("jhkgjfhdgxcvbn")} />
      <Button component="img" src={viteLogo} onClick={() => prompt("jhkgjfhdgxcvbn")} />
      <Button component="img" src={viteLogo} className="test" onClick={() => prompt("jhkgjfhdgxcvbn")} />
      <LoginForm />
      <Articles />
    </>
  )
}

export default App
