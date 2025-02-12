import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom"
import Login from './components/Login'
import Signup from './components/signup'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/ForgotPassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
    <Route path="/" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
    <Toaster
    position="top-center"
    reverseOrder={true}
  />

    </>
  )
}

export default App
