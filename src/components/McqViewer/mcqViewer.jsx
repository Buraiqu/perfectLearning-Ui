import { useState } from 'react';
import './mcqViewer.css';
import mcqReportIcon from '../../icons/mcq_report.svg';
import mcqBookmarkIcon from '../../icons/mcq_bookmark.svg';
import mcqSolutionIcon from '../../icons/mcq_solution.svg';
import mcqCorrectPercentageIcon from '../../icons/mcq_correct_percentage.svg';
import mcqConceptVideoIcon from '../../icons/mcq_concept_video.svg';
import mcqConceptNotesIcon from '../../icons/mcq_concept_notes.svg';

const McqViewer = ({ question }) => {
    const [selectedOption, setSelectedOption] = useState(1); // Default to first option selected
    const [isSubmitted, setIsSubmitted] = useState(true); // Set to true to show the submitted state
    const [isCorrect, setIsCorrect] = useState(false);

    // Default question if none provided
    const defaultQuestion = {
        id: 'q1',
        type: 'Single Correct',
        text: 'A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively.\nInitial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be',
        difficulty: 'Easy',
        options: [
            { id: 1, text: '350', isCorrect: false },
            { id: 2, text: '75', isCorrect: true },
            { id: 3, text: '50', isCorrect: false },
            { id: 4, text: '525', isCorrect: false }
        ]
    };

    const questionData = question || defaultQuestion;

    const handleOptionSelect = (optionId) => {
        if (!isSubmitted) {
            setSelectedOption(optionId);
        }
    };

    const handleSubmit = () => {
        if (selectedOption !== null && !isSubmitted) {
            const selectedOptionData = questionData.options.find(option => option.id === selectedOption);
            setIsCorrect(selectedOptionData.isCorrect);
            setIsSubmitted(true);
        }
    };

    return (
        <div className="pl-mcq-viewer">
            <div className="pl-mcq-header">
                <div className="pl-mcq-type">Q1 ({questionData.type})</div>
                <div className="pl-mcq-actions">
                    <button className="pl-icon-button">
                        <img src={mcqBookmarkIcon} alt="Bookmark" width="20" height="20" />
                    </button>
                    <button className="pl-icon-button">
                        <img src={mcqReportIcon} alt="Report" width="20" height="20" />
                    </button>
                </div>
            </div>
            
            <div className="pl-mcq-content">
                <p className="pl-mcq-question">{questionData.text}</p>
                <div className="pl-mcq-difficulty">{questionData.difficulty}</div>
                
                <div className="pl-mcq-options">
                    {questionData.options.map((option) => (
                        <div 
                            key={option.id} 
                            className={`pl-mcq-option ${selectedOption === option.id ? 'selected' : ''} ${
                                isSubmitted && option.id === selectedOption && !option.isCorrect ? 'incorrect' : ''
                            } ${isSubmitted && option.isCorrect ? 'correct-answer' : ''}`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <div className="pl-option-radio">
                                {selectedOption === option.id && (
                                    <div className="pl-option-radio-inner"></div>
                                )}
                            </div>
                            <div className="pl-option-text">{option.text}</div>
                            {isSubmitted && option.isCorrect && (
                                <div className="pl-correct-label">Correct Answer</div>
                            )}
                        </div>
                    ))}
                </div>
                
                {isSubmitted && selectedOption !== null && !isCorrect && (
                    <div className="pl-wrong-answer-message">Wrong answer</div>
                )}
                
                {isSubmitted ? (
                    <div className="pl-mcq-footer">
                        <button className="pl-footer-button">
                            <img src={mcqSolutionIcon} alt="Solution" width="16" height="16" />
                            <span>Solution</span>
                        </button>
                        <button className="pl-footer-button">
                            <img src={mcqCorrectPercentageIcon} alt="Correct Percentage" width="16" height="16" />
                            <span>Correct %age</span>
                        </button>
                        <button className="pl-footer-button">
                            <img src={mcqConceptVideoIcon} alt="Concept Video" width="16" height="16" />
                            <span>Concept Video</span>
                        </button>
                        <button className="pl-footer-button">
                            <img src={mcqConceptNotesIcon} alt="Concept Notes" width="16" height="16" />
                            <span>Concept Notes</span>
                        </button>
                    </div>
                ) : (
                    <button 
                        className={`pl-submit-button ${selectedOption === null ? 'disabled' : ''}`}
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default McqViewer;