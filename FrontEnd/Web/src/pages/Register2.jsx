import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App.jsx';
import EditSkills from '../components/EditSkills.jsx';



const Register2 = () => {
  // Context    
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [step, setStep] = useState("SKILLS");
  const [skills, setSkills] = useState([]);

  return (
    <>
    {(() => {
      switch (step) {
        case 'SKILLS':
          return <EditSkills edit={false} token={accessToken} register={setSkills} step={setStep}/>
        case 'EDUCATION':
          return <></>
        case 'CERTIFICATES':
          return <></>
        case 'PORTFOLIO':
          return <></>
        default:
          return <h1>Sorry, something went wrong</h1>
      }
    })()}
    </>
  );
};

export default Register2;