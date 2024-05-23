import axios from 'axios';


export const FetchFile = async (token, filePath) => {
  try {
    const response = await axios({
      url: `http://127.0.0.1:8000/api/file/${filePath}`,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/pdf; charset=UTF-8',
        'Accept': 'application/pdf'
      }
    }).then((response) => {
      // Create file from response data
      const file = new Blob(
        [response.data],
        { type: 'application/pdf' }
      );
      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      // Open the URL on new Window
      window.open(fileURL);
    });
  } catch (error) {
    return error.response;
  }
};


export const FetchImage = async (token, imagePath) => {
  try {
    const response = await axios({
      url: `http://127.0.0.1:8000/api/image/${imagePath}`,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/*; charset=UTF-8',
        'Accept': 'image/*'
      }
    }).then((response) => {
      // Create file from response data
      const image = new Blob(
        [response.data],
        { type: response.data.type }
      );
      // Return file
      return(image);
    });
    return(response);
  } catch (error) {
    return error.response;
  }
};