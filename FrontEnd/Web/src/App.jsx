import { useEffect, useState, useRef, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CheckToken } from './apis/AuthApis.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import AnonymousRoutes from './utils/AnonymousRoutes.jsx';
import Layout from './utils/Layout.jsx';
import Index from './pages/Index.jsx';
import Register from './pages/Register.jsx';
import Register2 from './pages/Register2.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import CallBack from './components/CallBack.jsx';
import Profile from './pages/Profile.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import EmailVerificationMessage from './pages/EmailVerification.jsx';
import Bar from './components/Bar.jsx';
import EducationForm from './components/Profile/Education.jsx';
import CertificateForm from './components/Profile/Certificate.jsx';
import Certificates from './components/Profile/Certificates.jsx';
import FileDisplay from './components/FileDisplay.jsx';


export const ThemeContext = createContext({});
export const LoginContext = createContext({});


function App() {
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [theme, setTheme] = useState('theme-light');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light'));
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // Get data from local storage
      const localTheme = localStorage.getItem('Theme');

      // Get user token from cookie (if there is any)
      const cookieToken = Cookies.get('access_token');

      // Set theme
      if (localTheme !== null) {
        setTheme(localTheme);
      }
      else {
        setTheme('theme-light')
      }

      // Check user token
      if (typeof cookieToken !== 'undefined') {
        CheckToken(cookieToken).then((response) => {
          if (response.status === 200) {
            setLoggedIn(true);
            setAccessToken(cookieToken);
          }
          else {
            Cookies.remove('access_token');
            console.log(response.statusText);
          }
          setIsLoading(false);
        });
      }
      else {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Theme', theme);
    document.body.className = theme;
  }, [theme]);

  if (isLoading) {
    return <></>
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn, accessToken, setAccessToken }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<></>} />
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Route>

            <Route element={<AnonymousRoutes />}>
              <Route path="/register" element={<Register />} />
              <Route path="/ed" element={<EducationForm />} />
              <Route path="/certificates/create" element={<CertificateForm />} />
              <Route path="/cers" element={<Certificates />} />
              <Route path="/Test" element={<Register2 />} />
              <Route path='/progress' element={<Bar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/:provider/call-back" element={<CallBack />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/ForgetPassword" element={<ForgotPassword />} />
              <Route path="/emailVerify" element={<EmailVerificationMessage />} />
              <Route path='/file' element={< FileDisplay/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App