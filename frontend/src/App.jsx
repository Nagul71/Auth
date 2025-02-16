import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom"
import Login from './components/Login'
import Signup from './components/signup'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
    <Route path="/Dashboard" element={<Dashboard/>}/>
    <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
    </Routes>
    <Toaster
    position="top-center"
    reverseOrder={true}
  />

    </>
  )
}

export default App
