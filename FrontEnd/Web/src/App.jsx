import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThemeContext, LoginContext, ProfileContext } from './utils/Contexts.jsx';
import { CheckToken } from './apis/AuthApis.jsx';
import { FetchUserProfile } from './apis/ProfileApis.jsx';
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
import SkillsForm from './components/SkillsForm.jsx';
import EducationForm from './components/Education&Certificates/Education.jsx';
import Portfolios from './components/Portfolios/Portfolios.jsx';
import ShowPortfolio from './components/Portfolios/ShowPortfolio.jsx';
import EditPortfolio from './components/Portfolios/EditPortfolio.jsx';
import Certificates from './components/Education&Certificates/Certificates.jsx';
import CertificateForm from './components/Education&Certificates/Certificate.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import EmailVerificationMessage from './pages/EmailVerification.jsx';
import DefJobs from './pages/Jobs/DefJobs.jsx';
import FullTimeRegJobs from './pages/Jobs/FullTimeRegJobs.jsx';
import PartTimeRegJobs from './pages/Jobs/PartTimeRegJobs.jsx';
import FreelancingJobs from './pages/Jobs/FreelancingJobs.jsx';


import FileDisplay from './components/FileDisplay.jsx';
import FileInputTest from './components/FileInputTest.jsx';
import PostJob from './components/Jobs/PostJob.jsx';
import PostFreelancing from './components/Jobs/PostFreelancing.jsx';
import JobCard from './components/Jobs/JobCard.jsx';
import ShowJob from './components/Jobs/ShowJob.jsx';

import JobCompetetorCard from './components/Jobs/JobCompetetorCard.jsx';
import ChatDetails from './components/Chats/ChatDetails.jsx';
import ChatPage from './components/Chats/ChatPage.jsx';
import JobFeed from './pages/Jobs/JobFeed.jsx';

function App() {
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState({});
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

            FetchUserProfile(cookieToken).then((response) => {
              if (response.status === 200) {
                setProfile(response.data.user);
              }
              else {
                console.log(response.statusText);
              }
            }).then(() => {
              setIsLoading(false);
            });
          }
          else {
            Cookies.remove('access_token');
            setIsLoading(false);
            console.log(response.statusText);
          }
        });
      }
      else {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (loggedIn && accessToken) {
      setIsLoading(true);
      FetchUserProfile(accessToken).then((response) => {
        if (response.status === 200) {
          setProfile(response.data.user);
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem('Theme', theme);
    document.body.className = theme;
  }, [theme]);

  if (isLoading) {
    return <div id='loader'><div className="clock-loader"></div></div>
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn, accessToken, setAccessToken }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboar" element={<></>} />
                  <Route path="/complete-register" element={<Register2 />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-skills" element={<SkillsForm />} />
                  <Route path="/education" element={<EducationForm />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/edit-certificate" element={<CertificateForm />} />
                  <Route path="/portfolios" element={<Portfolios />} />
                  <Route path="/portfolio/:id" element={<ShowPortfolio />} />
                  <Route path="/edit-portfolio" element={<EditPortfolio />} />
                  <Route path='/jobs' element={<DefJobs />} />
                  <Route path='/fulltime-jobs' element={<FullTimeRegJobs />} />
                  <Route path='/parttime-jobs' element={<PartTimeRegJobs />} />
                  <Route path='/freelancing-jobs' element={<FreelancingJobs />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path='/Chat' element={<ChatDetails/>}/>
                  <Route path='/ChatsPage' element={<ChatPage/>}/>
                  <Route path="/FileTest" element={<FileInputTest />} />
                  <Route path='/job' element={<PostJob />} />
                  <Route path='/freelancing' element={<PostFreelancing />} />

                  <Route path='/display-job/:id' element={<ShowJob />} />
                  <Route path='/dashboard' element={<JobFeed />} />
                  <Route path='/Test' element={<ShowJob />} />
                  <Route path='/Test4' element={<JobCompetetorCard />} />
                </Route>
              </Route>

              <Route element={<AnonymousRoutes />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/:provider/call-back" element={<CallBack />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/ForgetPassword" element={<ForgotPassword />} />
                <Route path="/emailVerify" element={<EmailVerificationMessage />} />
                <Route path='/file' element={< FileDisplay />} />
                
              </Route>
            </Routes>
          </BrowserRouter>
        </ProfileContext.Provider>
      </LoginContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App