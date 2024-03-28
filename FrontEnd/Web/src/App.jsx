import { useEffect, useState, useRef, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Register from './components/Auth/Register.jsx'
import Login from './components/Auth/Login.jsx'
import CallBack from './components/Auth/CallBack.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import NewPassword from './components/Auth/NewPassword.jsx';
import ForgetPassword from './components/Auth/ForgetPassword.jsx';
import EmailVerificationMessage from './components/Auth/emailVerifed.jsx';
import UserInfo from './components/Profile/UserInfo.jsx';


export const ThemeContext = createContext({});

function App() {
  const initialized = useRef(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInToken, setlogInToken] = useState('');
  const [theme, setTheme] = useState('theme-light');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light'));
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // Get data from local storage
      const localTheme = localStorage.getItem('Theme');
      const isLoggedIn = JSON.parse(localStorage.getItem('remember_me'));
      const accessToken = JSON.parse(localStorage.getItem('access_token'));

      if (localTheme !== null) {
        setTheme(localTheme);
      }
      else {
        setTheme('theme-light')
      }

      if (isLoggedIn !== null) {
        setLoggedIn(isLoggedIn);
      }
      else {
        setLoggedIn(false);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Theme', theme);
    document.body.className = theme;
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/:provider/call-back" element={<CallBack />} />
          <Route path="/reset-password" element={<NewPassword />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/emailVerify" element={<EmailVerificationMessage />} />
          <Route path="/profile" element={<UserInfo />}/>
          <Route path="/" element={<></>} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
