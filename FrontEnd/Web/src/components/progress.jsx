import React from "react";
import { useState, useEffect, useRef} from "react";
import styles from './progress.module.css';
const Progress = ({ steps ,stepIndex}) => {
  const initialized = useRef(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setCurrentStep(stepIndex);
    }
  }, []);
  console.log(stepIndex);
  return (
    <div className={styles.progressbar}>
      <div className={styles.progressstepscontainer}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.progressstep} ${index === currentStep ? "active" : ""}`}
          >
            {step}
          </div>
        )).reverse()}
      </div>
    </div>
  );
};

export default Progress;