import { useState } from 'react';
import './studyPlanner.css'
import EngineerIcon from '../../../icons/Engineer-Icon.svg'
import GoalsSection from '../../../components/GoalsSection/goalsSection'
import ProgressBar from '../../../components/ProgressBar/progressBar';
import PreparationTimeModal from '../../../components/PreparationTimeModal/preparationTimeModal';

const StudyPlanner = () => {
    const [expandedWeek, setExpandedWeek] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weeks, setWeeks] = useState(40);

    const weekData = [
        {
            weekNumber: 1,
            subjects: [
                { name: 'Chemistry - Introduction to organic Chemistry', hours: 6, progress: 50 },
                { name: 'Mathematics - Sets, Relations & Functions', hours: 9, progress: 25 },
                { name: 'Physics - Theory of relativity', hours: 10, progress: 0 },
            ]
        },
        {
            weekNumber: 2,
            subjects: [
                { name: 'Chemistry - Chemical Bonding', hours: 8, progress: 0 },
                { name: 'Mathematics - Complex Numbers', hours: 7, progress: 0 },
                { name: 'Physics - Kinematics', hours: 12, progress: 0 },
            ]
        },
        {
            weekNumber: 3,
            subjects: [
                { name: 'Chemistry - States of Matter', hours: 5, progress: 0 },
                { name: 'Mathematics - Quadratic Equations', hours: 6, progress: 0 },
                { name: 'Physics - Laws of Motion', hours: 8, progress: 0 },
            ]
        },
        {
            weekNumber: 4,
            subjects: [
                { name: 'Chemistry - Thermodynamics', hours: 10, progress: 0 },
                { name: 'Mathematics - Matrices', hours: 8, progress: 0 },
                { name: 'Physics - Work and Energy', hours: 7, progress: 0 },
            ]
        },
    ];

    return (
        <div className="study-planner-container">
            <div className="prep-info-card">
                <div className="prep-time-section">
                    <div className="icon-section">
                        <div className="prep-icon">
                            <img src={EngineerIcon} alt="Engineering icon" />
                        </div>
                    </div>
                    <div className="prep-text">
                        <span className='text'>Complete preparation in</span> <span className="weeks">40 Weeks</span>
                        <button className="edit-btn" onClick={() => setIsModalOpen(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="avg-prep-section">
                    <div className="prep-time-info">
                        <span className="info-title">Avg. Prep time per day</span>
                        <span className="info-subtitle">to complete prep within your target weeks</span>
                    </div>
                    <div className="time-display">
                        <span className="time">90</span>
                        <span className="unit">Mins per day</span>
                    </div>
                </div>
            </div>

            <div className="goals-section">
                <GoalsSection/>
            </div>

            <div className="study-plan-section">
                <h2>1 Year Study Plan for IIT JEE</h2>
                <div className="weeks-container">
                    {weekData.map((week) => (
                        <div key={week.weekNumber} className="week-item">
                            <div 
                                className={`week-header ${expandedWeek === week.weekNumber ? 'expanded' : ''}`}
                                onClick={() => setExpandedWeek(week.weekNumber === expandedWeek ? null : week.weekNumber)}
                            >
                                <div className="week-title">
                                    <h3>Week {week.weekNumber}</h3>
                                    <svg className="expand-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            {expandedWeek === week.weekNumber && (
                                <div className="week-content">
                                    {week.subjects.map((subject, index) => (
                                        <div key={index} className="subject-item">
                                            <div className="subject-info">
                                                <span className="subject-name">{subject.name}</span>
                                            </div>
                                            <div className="subject-time">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <span>{subject.hours} Hr</span>
                                            </div>
                                            <div style={{width: '18%'}}>
                                                <ProgressBar percentage={subject.progress} showPercentageFirst={true}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <PreparationTimeModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialWeeks={weeks}
            />
        </div>
    )
}

export default StudyPlanner