import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from '../components/Register/ProgressBar.jsx';
import SkillsForm from '../components/SkillsForm.jsx';
import EducationForm from '../components/Education&Certificates/Education.jsx';
import Certificates from '../components/Education&Certificates/Certificates.jsx';
import Portfolios from '../components/Portfolios/Portfolios.jsx';
import styles from '../styles/register2.module.css';


const Register2 = () => {
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState('SKILLS');

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (location.state !== null) {
        setStep(location.state.step);
      }
      else {
        navigate('/profile');
      }
    }
  }, []);

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
              return navigate('/profile');
            default:
              return <h1>404 Not Found</h1>;
          }
        })()}
      </div>
    </div>
  );
};

export default Register2;