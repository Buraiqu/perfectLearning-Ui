import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import './FinishTestModal.css';

const FinishTestModal = ({ 
    onClose, 
    onConfirm, 
    onSummaryFilter, 
    summary 
}) => {
    return (
        <div className="finish-test-modal-overlay">
            <div className="finish-test-modal">
                <button onClick={onClose} className="close-modal-btn" aria-label="Close finish confirmation">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12M4 4L12 12" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h2 className="finish-modal-title">Are you sure that you would like to finish the test?</h2>
                
                <div className="finish-modal-summary">
                    <div className="summary-item" onClick={() => onSummaryFilter('attempted')} style={{cursor: 'pointer'}}>
                        <div className="summary-item-header">
                            <span className="summary-icon attempted-icon">
                                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="#475467" strokeWidth="1.33333" />
                                    <path d="M11.3333 5.33333L6.66667 10L4.66667 8" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span className="summary-label">Attempted</span>
                        </div>
                        <span className="summary-value">{summary.attempted}</span>
                    </div>
                    <div className="summary-item" onClick={() => onSummaryFilter('revisit-later')} style={{cursor: 'pointer'}}>
                        <div className="summary-item-header">
                            <span className="summary-icon revisit-icon">
                                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10.6667V8M8 5.33333H8.00667M14.6667 8C14.6667 11.6819 11.682 14.6667 8 14.6667C4.31811 14.6667 1.33337 11.6819 1.33337 8C1.33337 4.31811 4.31811 1.33333 8 1.33333C11.682 1.33333 14.6667 4.31811 14.6667 8Z" stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span className="summary-label">Revisit Later</span>
                        </div>
                        <span className="summary-value">{summary.revisit}</span>
                    </div>
                    <div className="summary-item" onClick={() => onSummaryFilter('not-attempted')} style={{cursor: 'pointer'}}>
                        <div className="summary-item-header">
                            <span className="summary-icon unattempted-icon">
                                <BsQuestionCircle size={22} color="#475467" />
                            </span>
                            <span className="summary-label">Unattempted</span>
                        </div>
                        <span className="summary-value">{summary.unattempted}</span>
                    </div>
                    <div className="summary-item">
                        <div className="summary-item-header">
                            <span className="summary-icon time-icon">
                                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span className="summary-label">Time Left</span>
                        </div>
                        <span className="summary-value">{summary.timeLeft}</span>
                    </div>
                </div>
                
                <div className="finish-modal-actions">
                    <button onClick={onConfirm} className="finish-modal-confirm-btn">
                        Finish test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinishTestModal;
