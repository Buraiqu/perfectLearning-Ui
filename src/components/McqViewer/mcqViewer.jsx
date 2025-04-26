import { useState } from 'react';
import './mcqViewer.css';
import mcqReportIcon from '../../icons/mcq_report.svg';
import mcqBookmarkIcon from '../../icons/mcq_bookmark.svg';
import mcqSolutionIcon from '../../icons/mcq_solution.svg';
import mcqCorrectPercentageIcon from '../../icons/mcq_correct_percentage.svg';
import mcqConceptVideoIcon from '../../icons/mcq_concept_video.svg';
import mcqConceptNotesIcon from '../../icons/mcq_concept_notes.svg';

const McqViewer = ({ question }) => {
    // Array of MCQ states for each instance
    const [mcqStates, setMcqStates] = useState([
        {
            id: 1,
            title: 'Q1 - Submitted Example',
            selectedOption: 1,
            isSubmitted: true,
            isCorrect: false
        },
        {
            id: 2,
            title: 'Q1 - Not Submitted Example',
            selectedOption: null,
            isSubmitted: false,
            isCorrect: false
        }
    ]);

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

    const handleOptionSelect = (optionId, mcqId) => {
        setMcqStates(prevStates => 
            prevStates.map(state => 
                state.id === mcqId && !state.isSubmitted
                    ? { ...state, selectedOption: optionId }
                    : state
            )
        );
    };

    const handleSubmit = (mcqId) => {
        setMcqStates(prevStates => 
            prevStates.map(state => {
                if (state.id === mcqId && state.selectedOption !== null && !state.isSubmitted) {
                    const selectedOptionData = questionData.options.find(option => 
                        option.id === state.selectedOption
                    );
                    return {
                        ...state,
                        isSubmitted: true,
                        isCorrect: selectedOptionData.isCorrect
                    };
                }
                return state;
            })
        );
    };

    return (
        <>
            {mcqStates.map(mcqState => (
                <div key={mcqState.id} className="pl-mcq-viewer">
                    <div className="pl-mcq-header">
                        <div className="pl-mcq-type">{mcqState.title} ({questionData.type})</div>
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
                                    className={`pl-mcq-option ${mcqState.selectedOption === option.id ? 'selected' : ''} ${
                                        mcqState.isSubmitted && option.id === mcqState.selectedOption && !option.isCorrect ? 'incorrect' : ''
                                    } ${mcqState.isSubmitted && option.isCorrect ? 'correct-answer' : ''}`}
                                    onClick={() => handleOptionSelect(option.id, mcqState.id)}
                                >
                                    <div className="pl-option-radio">
                                        {mcqState.selectedOption === option.id && (
                                            <div className="pl-option-radio-inner"></div>
                                        )}
                                    </div>
                                    <div className="pl-option-text">{option.text}</div>
                                    {mcqState.isSubmitted && option.isCorrect && (
                                        <div className="pl-correct-label">Correct Answer</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {mcqState.isSubmitted && mcqState.selectedOption !== null && !mcqState.isCorrect && (
                            <div className="pl-wrong-answer-message">Wrong answer</div>
                        )}
                        
                        {mcqState.isSubmitted ? (
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
                                className={`pl-submit-button ${mcqState.selectedOption === null ? 'disabled' : ''}`}
                                onClick={() => handleSubmit(mcqState.id)}
                                disabled={mcqState.selectedOption === null}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default McqViewer;