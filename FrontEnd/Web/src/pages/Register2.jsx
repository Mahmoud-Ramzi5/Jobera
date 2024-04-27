import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditSkills from "../components/EditSkills.jsx";
import styles from "../styles/register2.module.css";


const Register2 = () => {
  return (
    <EditSkills edit={false} />
  );
};

export default Register2;
