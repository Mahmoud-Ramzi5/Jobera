import React from "react";
import { useState, useEffect, useRef} from "react";
import styles from './progress.module.css';
const Progress = ({ steps ,currentStep}) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
  }, []);
  return (
    <div className={styles.progressbar}>
      <div className={styles.progressstepscontainer}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.progressstep} ${step === currentStep ? styles.active : ""}`}
          >
            {step}
          </div>
        )).reverse()}
      </div>
    </div>
  );
};

export default Progress;