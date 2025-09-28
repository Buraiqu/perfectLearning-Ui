import React from 'react';
import './pdfViewer.css';

const PDFViewer = ({ pdfUrl }) => {
    return (
        <div className="pdf-viewer">
            <div className="pdf-container">
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH`}
                    className="pdf-frame"
                    title="PDF Document"
                />
            </div>
        </div>
    );
};
export default PDFViewer;
