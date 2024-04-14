import React from "react";
import './progress.module.css';
const Progress = () => {
    const steps=["Skills","Education","Certificates","Portifolio"];
  return (
    <div className="container">
      {
        steps?.map((step,i)=>(
            <div key={i} className="step-item">
                <div>{i+1}</div>
                <p className="step">{step}</p>
            </div>
        ))}
    </div>
  );
};

export default Progress;