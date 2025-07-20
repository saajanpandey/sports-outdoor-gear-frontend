import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div style={{ minHeight: '100vh', minWidth: '98vw', display: 'flex', flexDirection: 'column' }}>
      <Home />
    </div>
    </>


  )
}

export default App
