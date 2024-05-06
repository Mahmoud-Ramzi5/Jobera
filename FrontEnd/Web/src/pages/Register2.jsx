import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App.jsx";
import ProgressBar from "../components/Register/ProgressBar.jsx";
import EditSkills from "../components/EditSkills.jsx";
import EducationForm from "../components/Education&Certificates/Education.jsx";
import Certificates from "../components/Education&Certificates/Certificates.jsx";
import Portfolios from "../components/Portfolios/Portfolios.jsx";
import styles from "../styles/register2.module.css"


const Register2 = () => {
  // Context
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [step, setStep] = useState("SKILLS");
  const [stepIndex, setStepIndex] = useState(0);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState({});

  return (
    <div className={styles.container}>
      <div className={styles.Bar}>
        <ProgressBar step={step} />
      </div>
      <div>
        {(() => {
          switch (step) {
            case "SKILLS":
              return (
                <EditSkills
                  edit={false}
                  token={accessToken}
                  register={setSkills}
                  step={setStep}
                />
              );
            case "EDUCATION":
              return (
                <EducationForm
                  edit={false}
                  token={accessToken}
                  register={setEducation}
                  step={setStep}
                />
              );
            case "CERTIFICATES":
              return (
                <Certificates
                  edit={false}
                  token={accessToken}
                  step={setStep}
                />
              );
            case "PORTFOLIO":
              return <Portfolios />;
            default:
              return <h1>404 Not Found</h1>;
          }
        })()}
      </div>
    </div>
  );
};

export default Register2;