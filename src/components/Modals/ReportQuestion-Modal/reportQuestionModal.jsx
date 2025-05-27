import { useState } from 'react';
import './reportQuestionModal.css';

const ReportQuestionModal = ({onClose}) => {

    const handleClickOutside = (e) => {
        if (e.target.className === 'report-question-modal') {
            onClose();
        }
    };

    return (
        <div className="report-question-modal" onClick={handleClickOutside}>
            <div className="report-question-content">
                <div className="report-question-header">
                    <h2 className="report-question-title">Report Question</h2>
                    <button className="report-question-close" onClick={onClose}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M1 13L13 1" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                <div className="report-question-main">
                    <div className="report-question-container">
                        <div className="row">
                            <span>Can you please specify the issue with the question?</span>
                        </div>
                        <div className="row input-row">
                            {/* <textarea name="" id=""></textarea> */}
                            <input type="text" placeholder='Ex. Spelling Mistake, No right answer in options, etc.'  className='report-input'/>
                        </div>
                        <div className="row" style={{padding: '10px 0px'}}>
                            <span>Please attach a screenshot (if any)</span>
                        </div>
                        <div className="row" style={{padding: '12px'}}>
                            <div className="upload-box">
                                <label>Upload here in JPEG, PNG, JPG or PDF format (Max 2Mb)</label>
                            </div>
                        </div>
                    </div>

                    <div className="report-question-footer">
                        <button className='report-submit-button'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportQuestionModal