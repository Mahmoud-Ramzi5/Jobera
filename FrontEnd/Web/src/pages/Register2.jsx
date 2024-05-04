import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App.jsx";
import EditSkills from "../components/EditSkills.jsx";
import EducationForm from "../components/Profile/Education.jsx";
import Certificates from "../components/Profile/Certificates.jsx";
import Bar from "../components/Bar.jsx";
import styles from "../styles/register2.module.css"
import NavBar from "../components/NavBar.jsx";

const Register2 = () => {
  // Context
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
    useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [step, setStep] = useState("SKILLS");
  const [stepIndex, setStepIndex] = useState(0);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState({});


  return (
    <>
    <NavBar/>
      <div className={styles.wholescreen}>
        <div className={styles.Bar}>
          <Bar step={step} />
        </div>
        <div className={styles.steps}>
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
                  <Certificates edit={false} token={accessToken} step={setStep} />
                );
              case "PORTFOLIO":
                return <></>;
              default:
                return <h1>Sorry, something went wrong</h1>;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default Register2;
