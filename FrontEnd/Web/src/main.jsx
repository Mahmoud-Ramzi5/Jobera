import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register.jsx'
import Login from './components/Auth/Login.jsx'
import CallBack from './components/Auth/CallBack.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/:provider/call-back" element={<CallBack />} />
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
