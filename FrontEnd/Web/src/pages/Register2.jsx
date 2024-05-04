import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App.jsx";
import EditSkills from "../components/EditSkills.jsx";
import EducationForm from "../components/Profile/Education.jsx";
import Certificates from "../components/Profile/Certificates.jsx";
import Bar from "../components/Bar.jsx";

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
    <><Bar step={step}/>
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
    </>
  );
};

export default Register2;
