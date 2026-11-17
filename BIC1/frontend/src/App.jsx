import { createElement, Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyButton from './components/button'
import ArticlesView from './views/articles'
import Login from './views/login'

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
      <h1>Vite + React {viteLogo} {reactLogo}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <MyButton handleClick={() => console.log("click")} content="test" />
      <MyButton handleClick={() => alert("click")} content="click me" color="red" />
      <MyButton handleClick={() => confirm("click")} content="push me"
        component='a'
        href="https://google.fr"
      />
      <MyButton
        handleClick={() => prompt("click")}
        component='img'
        src={viteLogo}
        toto="4"
      />

      <Login />
    </>
  )

  return createElement(Fragment, {},
    createElement('div', {},
      createElement('a', { href: 'https://vite.dev', target: '_blank' },
        createElement('img', { src: viteLogo, className: 'logo', alt: 'Vite logo' })
      ),
      createElement('a', { href: 'https://react.dev', target: '_blank' },
        createElement('img', { src: reactLogo, className: 'logo react', alt: 'React logo' })
      )
    ),
    createElement('h1', {}, "Vite + React"),
    createElement('div', { className: 'card' },
      createElement('button', { onClick: () => setCount((count) => count + 1) },
        `count is ${count}`
      ),
      createElement('p', {},
        'Edit ', createElement('code', {}, 'src/App.jsx'), ' and save to test HMR'
      )
    ),
    createElement('p', { className: 'read-the-docs' },
      'Click on the Vite and React logos to learn more'
    )
  )
}

export default App
