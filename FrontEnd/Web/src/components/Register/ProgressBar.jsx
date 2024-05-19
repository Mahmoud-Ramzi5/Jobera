import { useEffect, useState, useRef } from 'react';
import styles from './progressbar.module.css';

const ProgressBar = ({ step }) => {
  const initialized = useRef(false);
  const steps = ["SKILLS", "EDUCATION", "CERTIFICATE", "PORTFOLIO"];

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
  }, []);

  return (
    <ProgressStep steps={steps} currentStep={step} />
  );
};

const ProgressStep = ({ steps, currentStep }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
  }, []);

  return (
    <div className={styles.progress_bar}>
      <div className={styles.progress_steps_container}>
        {steps.map((step, index) => (
          <div key={index} className={`${styles.progress_step} ${step === currentStep ? styles.active : ""}`}>
            {step}
          </div>
        )).reverse()}
      </div>
    </div>
  );
};

export default ProgressBar;