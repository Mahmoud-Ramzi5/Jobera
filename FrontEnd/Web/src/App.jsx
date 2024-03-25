import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register.jsx'
import Login from './components/Auth/Login.jsx'
import CallBack from './components/Auth/CallBack.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import NewPassword from './components/Auth/NewPassword.jsx';
import ForgetPassword from './components/Auth/ForgetPassword.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/:provider/call-back" element={<CallBack />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
