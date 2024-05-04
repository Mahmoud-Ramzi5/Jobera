import React, { useEffect, useState, useRef } from "react";
import Progress from "./progress";
const Bar = (step) => {
  const initialized = useRef(false);
  const steps = ["Skills", "Education", "Certificates", "Portfolio"];
  const [stepIndex, setStepIndex] = useState(0);


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      switch (step){
        case 'SKILLS':
          setStepIndex(0);
        case 'EDUCATION':
          setStepIndex(1);
        case 'CERTIFICATES':
          setStepIndex(2);
        case 'PORTFOLIO':
          setStepIndex(3);
        default:
          setStepIndex(0);
      }
    }
  }, []);
  return (
    <div>
      <Progress steps={steps} stepIndex={stepIndex} />
    </div>
  );
};

export default Bar;