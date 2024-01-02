import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './companents/login/Login'
import User from './companents/user/User'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <User></User>
    </>
  )
}

export default App
