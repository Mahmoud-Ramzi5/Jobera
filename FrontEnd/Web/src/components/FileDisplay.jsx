import React, { useState } from "react";
import PDFViewer from "./PdfViewer";

const FileDisplay = () => {
  const [fileContent, setFileContent] = useState(""); // State to hold the file content

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content); // Set the file content in the state
      };

      reader.readAsText(file);
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