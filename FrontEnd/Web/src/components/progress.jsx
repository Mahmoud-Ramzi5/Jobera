import React from "react";
import { useState } from "react";
import './progress.css';
const Progress = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="progress-bar">
      <div className="progress-steps-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${index === currentStep ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            {step}
          </div>
        )).reverse()}
      </div>
    </div>
  );
};

export default Progress;