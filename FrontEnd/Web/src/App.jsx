import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { ThemeContext, LoginContext, ProfileContext } from './utils/Contexts.jsx';
import { CheckToken } from './apis/AuthApis.jsx';
import { FetchProfile } from './apis/ProfileApis/ProfileApis.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import AnonymousRoutes from './utils/AnonymousRoutes.jsx';
import AdminRoutes from './utils/AdminRoutes.jsx';
import Clock from './utils/Clock.jsx';
import Layout from './utils/Layout.jsx';
import Index from './pages/Index.jsx';
import Register from './pages/Register.jsx';
import Register2 from './pages/Register2.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import CallBack from './components/CallBack.jsx';
import Profile from './pages/Profile.jsx';
import SkillsForm from './components/Skills.jsx';
import EducationForm from './components/Education&Certificates/Education.jsx';
import Portfolios from './components/Portfolios/Portfolios.jsx';
import ShowPortfolio from './components/Portfolios/ShowPortfolio.jsx';
import EditPortfolio from './components/Portfolios/EditPortfolio.jsx';
import Certificates from './components/Education&Certificates/Certificates.jsx';
import CertificateForm from './components/Education&Certificates/Certificate.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import EmailVerification from './pages/EmailVerification.jsx';
import JobFeed from './pages/Jobs/JobFeed.jsx';
import DefJobs from './pages/Jobs/DefJobs.jsx';
import FullTimeRegJobs from './pages/Jobs/FullTimeRegJobs.jsx';
import PartTimeRegJobs from './pages/Jobs/PartTimeRegJobs.jsx';
import FreelancingJobs from './pages/Jobs/FreelancingJobs.jsx';
import ShowJob from './components/Jobs/ShowJob.jsx';
import PostJob from './pages/Jobs/PostJob.jsx';
import Manage from './pages/Manage.jsx';
import ChatPage from './components/Chats/ChatPage.jsx';
import NotificationsPage from './components/Notifications/NotificationsPage.jsx';
import Transactions from './components/Transactions.jsx';
import RedeemCode from './components/Profile/RedeemCode.jsx';
import NotFound from './pages/NotFound.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Admin from './pages/AdminPage.jsx';


function App() {
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);
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

            FetchProfile(cookieToken).then((response) => {
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
      FetchProfile(accessToken).then((response) => {
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
    if (profile) {
      const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
        url: "http://127.0.0.1:8000/api/pusher/beams-auth",
        queryParams: {},
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const beamsClient = new PusherPushNotifications.Client({
        instanceId: "8a1adda3-cbf6-4ac7-b9b5-d8d8669217ac",
      });

      beamsClient
        .start()
        .then((beamsClient) => beamsClient.setUserId(`user-${profile.user_id}`, beamsTokenProvider))
        .then(() => beamsClient.getDeviceId())
        .then((deviceId) => console.log("Successfully registered with Beams. Device ID:", deviceId))
        .then(() => beamsClient.addDeviceInterest("TEST"))
        .then(() => beamsClient.addDeviceInterest("debug-test"))
        .then(() => beamsClient.getDeviceInterests())
        .then((interests) => console.log("Current interests:", interests))
        .then(() => beamsClient.getUserId())
        .then((userId) => console.log("User ID:", userId))
        .catch(console.error);

      // beamsClient
      //   .getUserId()
      //   .then((userId) => {
      //     console.log("User ID:", userId)
      //     // Check if the Beams user matches the user that is currently logged in
      //     if (userId !== `user-${profile.user_id}`) {
      //       // Unregister for notifications
      //       return beamsClient.stop();
      //     }
      //   })
      //   .catch(console.error);
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('Theme', theme);
    document.body.className = theme;
  }, [theme]);

  if (isLoading) {
    return <Clock />
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn, accessToken, setAccessToken }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <BrowserRouter>
            <Routes>
              <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<JobFeed />} />
                  <Route path="/complete-register" element={<Register2 />} />
                  <Route path="/profile/:user_id/:user_name" element={<Profile />} />
                  <Route path="/edit-skills" element={<SkillsForm />} />
                  <Route path="/edit-education" element={<EducationForm />} />
                  <Route path="/certificates/:user_id/:user_name" element={<Certificates />} />
                  <Route path="/edit-certificate" element={<CertificateForm />} />
                  <Route path="/portfolios/:user_id/:user_name" element={<Portfolios />} />
                  <Route path="/portfolio/:id" element={<ShowPortfolio />} />
                  <Route path="/edit-portfolio" element={<EditPortfolio />} />
                  <Route path='/jobs/all' element={<DefJobs />} />
                  <Route path='/jobs/FullTime' element={<FullTimeRegJobs />} />
                  <Route path='/jobs/PartTime' element={<PartTimeRegJobs />} />
                  <Route path='/jobs/Freelancing' element={<FreelancingJobs />} />
                  <Route path='/jobs/post' element={<PostJob />} />
                  <Route path='/job/:id' element={<ShowJob />} />
                  <Route path='/manage' element={<Manage />} />
                  <Route path='/chats' element={<ChatPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path='/redeemcode' element={<RedeemCode />} />
                  <Route path='/notfound' element={<NotFound />} />
                  <Route path='/error' element={<ErrorPage />} />
                  <Route path="/logout" element={<Logout />} />
                </Route>
              </Route>

              <Route element={<AnonymousRoutes />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/:provider/call-back" element={<CallBack />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/ForgetPassword" element={<ForgotPassword />} />
                <Route path="/emailVerify" element={<EmailVerification />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProfileContext.Provider>
      </LoginContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App;
