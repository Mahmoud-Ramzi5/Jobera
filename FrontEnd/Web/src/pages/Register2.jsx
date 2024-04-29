import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditSkills from "../components/EditSkills.jsx";
import styles from "../styles/register2.module.css";



const Register2 = () => {
  const [step, setStep]=useState("skills");
  const [skills, setSkills]=useState([]);
  return (
    <>
    {step == "skills" ? <EditSkills  edit={false} register={setSkills} step={setStep}/> : step == "education" ? <></> : step == "certificates" ? <></> : step == "portfolio" ? <></>:<h1>Sorry something went wrong</h1>}
    </>
  );
};

export default Register2;
