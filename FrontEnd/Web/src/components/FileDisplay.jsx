import React, { useState } from "react";
import PDFViewer from "./PdfViewer";

const FileDisplay = () => {
  const [fileContent, setFileContent] = useState(""); // State to hold the file content

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      let reader=new FileReader();
      reader.readAsDataURL(file)
      reader.onload=(e)=>{
        setFileContent(e.target.result)  
      }
    } 
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <PDFViewer file={fileContent} />
    </div>
  );
};

export default FileDisplay;