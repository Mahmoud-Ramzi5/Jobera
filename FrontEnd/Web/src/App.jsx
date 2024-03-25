import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import Register from './components/Auth/Register.jsx'
import Login from './components/Auth/Login.jsx'
import CallBack from './components/Auth/CallBack.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import NewPassword from './components/Auth/NewPassword.jsx';
import ForgetPassword from './components/Auth/ForgetPassword.jsx';


export const ThemeContext = createContext('');

function App() {
  const [theme, setTheme] = useState('light');
  document.body.className = theme;

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} checkedIcon={"🌙"} uncheckedIcon={"🔆"} />
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
    </ThemeContext.Provider>
  )
}

export default App
