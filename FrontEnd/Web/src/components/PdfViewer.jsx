import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PdfViewer.module.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PdfViewer({ file }) {
    const [pdfFile, setPdfFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);
    const newplugin = defaultLayoutPlugin();

    useEffect(() => {
        if (file) {
            setPdfFile(file);
            setViewPdf(file);
        }
    }, [file]);

    return (
        <div className='container'>
            <h2>View PDF</h2>
            <div className={styles.pdf_container}>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                    {viewPdf && (
                        <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                    )}
                    {!viewPdf && <>No PDF</>}
                </Worker>
            </div>
        </div>
    );
}

export default PdfViewer;
