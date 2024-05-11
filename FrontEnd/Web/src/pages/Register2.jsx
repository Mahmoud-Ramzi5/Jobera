import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import ProgressBar from '../components/Register/ProgressBar.jsx';
import SkillsForm from '../components/SkillsForm.jsx';
import EducationForm from '../components/Education&Certificates/Education.jsx';
import Certificates from '../components/Education&Certificates/Certificates.jsx';
import Portfolios from '../components/Portfolios/Portfolios.jsx';
import styles from '../styles/register2.module.css';
import { AdvanceRegisterStep } from '../apis/ProfileApis.jsx';


const Register2 = () => {
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState('SKILLS');

  useEffect(() => {
    if (!initialized.current) {
      if (location.state === null) {
        navigate('/profile');
      }
      initialized.current = true;
      // Get data from local storage
      var RegisterStep=null;
      AdvanceRegisterStep(location.state.token).then((response)=>{
        if(response.status==201){
          RegisterStep =response.step;
        }else{
          console.log(response);
        }
      })
      
      // Set step
      if (RegisterStep !== null) {
        setStep(RegisterStep);
      }
      else {
        setStep('SKILLS')
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