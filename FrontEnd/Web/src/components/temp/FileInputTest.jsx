import React, { useState } from 'react';
import axios from 'axios';

function FileInputTest() {
    const [files, setFiles] = useState(null);
    const [ progress , setProgress ] = useState({started: false, pc:0});
    const [ msg , setMsg ] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    function handleUpload(){
        if(!files){
            setMsg('thats not a file :)')
            return;
        }

    const fd = new FormData();
    for(let i = 0 ; i<files.length ; i++){
        fd.append(`files${i+1}`, files[i]);
    }
    setMsg('uploading');
    fetch('http://httpbin.org/post',{
    method:'post',
    body: fd,
    headers:{
        'custom-Header':"value",
    }
    })
    .then(res => {
        if(!res.ok){
            throw new error('bad response');
        }
        setMsg('uploading succesfully');
        return res.json();
    })
    .then(data => console.log(data))
    .catch(err => console.error(err));
    /*axios.post('http://httpbin.org/post',fd,{
        onUploadProgress: (progressEvent) => {  setProgress(prevstate => {
            return{...prevstate, pc: progressEvent.progress*100}
        })},
        headers:{
            'custom-Header':"value",
        }
    })
    .then(res => {
        setMsg('uploading succesfully');
        console.log(res.data);
    })
    .catch(err => console.error(err));
    */
    }

    return (
        <div className="FileInputTest">
                <h1>React Multiple File Upload</h1>
                <input onChange={ (e) => {setFiles(e.target.files)}} type="file" multiple />
                <button onClick={ handleUpload }>Upload</button>
            { progress.started && <progress max="100" value={progress.pc}></progress>}
            {
                msg && <span>{msg}</span>
            }
        </div>
    );
}

export default FileInputTest;