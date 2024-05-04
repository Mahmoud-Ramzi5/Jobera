import React, { useEffect, useState, useRef } from "react";
import Progress from "./progress";
const Bar = ({step}) => {
  const initialized = useRef(false);
  const steps = ["SKILLS", "EDUCATION", "CERTIFICATES", "PORTFOLIO"];


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
  }, []);

  return (
    <div>
      <Progress steps={steps} currentStep={step} />
    </div>
  );
};

export default Bar;