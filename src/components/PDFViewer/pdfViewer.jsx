import React from 'react';
import './pdfViewer.css';

const PDFViewer = () => {
    return (
        <div className="pdf-viewer">
            <div className="pdf-container">
                <iframe
                    src="https://www.orimi.com/pdf-test.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH"
                    className="pdf-frame"
                    title="PDF Document"
                />
            </div>
        </div>
    );
};
export default PDFViewer;
