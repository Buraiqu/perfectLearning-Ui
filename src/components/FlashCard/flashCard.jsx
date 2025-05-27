import { useState } from 'react';
import SubjectLoader from '../loaders/SubjectLoader/subjectLoader';
import BSBookMarkIcon from '../../icons/BsBookmarks.svg'
import BsBlueTriangleExclamation from '../../icons/BsExclamationTriangle.svg'
import BsBluePatchCheckIcon from '../../icons/BsBluePatchCheck.svg'
import './flashCard.css';
import CustomeFilter from '../loaders/CustomeFilter/customeFilter';
import ReportQuestionModal from '../Modals/ReportQuestion-Modal/reportQuestionModal';

const FlashCard = ({ onClose }) => {
    const [currentCard, setCurrentCard] = useState(1);
    const [reportModal, setReportModal] = useState(false);
    const totalCards = 200;

    const handleClickOutside = (e) => {
        if (e.target.className === 'flash-card-modal') {
            onClose();
        }
    };

    return (
        <div className="flash-card-modal" onClick={handleClickOutside}>
            <div className="flash-card-content">
                <div className="flash-card-header">
                    <h2 className="flash-card-title">Flash Cards</h2>
                    <button className="flash-card-close" onClick={onClose}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M1 13L13 1" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                <div className="flash-card-actions">
                    <SubjectLoader className="flash-subject-loader"/>
                    <CustomeFilter className="flash-filter-loader"/>
                    {/* <button className="filters-button">
                        <span>Filters</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 4h12M4 8h8M6 12h4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </button> */}
                </div>

                <div className="flash-card-main">
                    <div className="flash-card-container">
                        <div className="flash-card-nav">
                            <button className="nav-button prev" onClick={() => setCurrentCard(prev => Math.max(1, prev - 1))}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="nav-button next" onClick={() => setCurrentCard(prev => Math.min(totalCards, prev + 1))}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18l6-6-6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flash-card">
                            <button className="icon-button warning-icon" onClick={() => setReportModal(true)}>
                                <img src={BsBlueTriangleExclamation} alt="" />
                            </button>
                            <button className="icon-button bookmark-icon">
                                <img src={BSBookMarkIcon} alt="" />
                            </button>
                            <button className="icon-button check-icon">
                                <img src={BsBluePatchCheckIcon} alt="" />
                            </button>

                            <div className='flash-content'>
                                <p>The atomic weight of an element is defined as the average relative weight (or mass) of an atom of an element with respect to (1/12)th of an atom of carbon.</p>
                            </div>

                            <div className='flash-content'>
                                <div className="flash-card-formula">
                                    <img src="data:image/png;base64," alt="Weight formula" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flash-card-progress">
                        {currentCard}/{totalCards}
                    </div>
                </div>
            </div>
            {reportModal && <ReportQuestionModal onClose={() => setReportModal(false)}/>}
        </div>
    );
};

export default FlashCard;