import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import { GetRegisterStep } from '../apis/ProfileApis/ProfileApis.jsx';
import ProgressBar from '../components/Register/ProgressBar.jsx';
import SkillsForm from '../components/Skills.jsx';
import EducationForm from '../components/Education&Certificates/Education.jsx';
import Certificates from '../components/Education&Certificates/Certificates.jsx';
import Portfolios from '../components/Portfolios/Portfolios.jsx';
import styles from '../styles/register2.module.css';


const Register2 = () => {
  // Context    
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('SKILLS');

  const ProfilePage = () => {
    if (profile.type === 'individual') {
      navigate(`/profile/${profile.user_id}/${profile.full_name}`);
    }
    else if (profile.type === 'company') {
      navigate(`/profile/${profile.user_id}/${profile.name}`);
    }
    else {
      console.log('error')
    }
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (profile.is_registered) {
        ProfilePage();
      }
      else {
        if (location.state !== null) {
          if (location.state.currStep) {
            setStep(location.state.currStep);
            setLoading(false);
          }
          else {
            GetRegisterStep(accessToken).then((response) => {
              if (response.status == 200) {
                setStep(response.data.step);
              }
              else {
                console.log(response.statusText);
              }
            }).then(() => {
              setLoading(false);
            });
          }
        }
        else {
          ProfilePage();
        }
      }
    }
  }, []);


  if (loading) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.Bar}>
        <ProgressBar step={step} />
      </div>
      <div>
        {(() => {
          switch (step) {
            case 'SKILLS':
              return (
                <SkillsForm step={setStep} />
              );
            case 'EDUCATION':
              return (
                <EducationForm step={setStep} />
              );
            case 'CERTIFICATES':
              return (
                <Certificates step={setStep} />
              );
            case 'PORTFOLIO':
              return (
                <Portfolios step={setStep} />
              );
            case 'DONE':
              return ProfilePage();
            default:
              return <h1>404 Not Found</h1>;
          }
        })()}
      </div>
    </div>
  );
};

export default Register2;