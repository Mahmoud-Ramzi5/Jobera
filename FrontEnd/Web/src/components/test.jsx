import React from "react";
import Progress from "./progress";
const Bar = () => {
    const steps = ["Skills", "Education", "Certificates", "Portfolio"];
  
    return (
      <div>
        <Progress steps={steps} />
      </div>
    );
  };
  
  export default Bar;