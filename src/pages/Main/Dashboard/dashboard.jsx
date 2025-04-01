import './dashboard.css';
import ColumnChartWithImages from '../../../components/Charts/ColumnChartWithImages';
import { useState} from 'react';
import bsCameraVideoIcon from '../../../icons/BsCameraVideoBlue.svg';
import tickSquareIcon from '../../../icons/tick-square-icon.svg'
import bsLightningChargeIcon from '../../../icons/BsLightningCharge.svg'
import chartStarIcon from '../../../icons/column-chart-star-icon.svg'
import chartWarningIcon from '../../../icons/column-chart-warning-icon.svg'
import chartTrophyIcon from '../../../icons/column-chart-trophy-icon.svg'
import SemiCirclePieChart from '../../../components/Charts/SemiCirclePieChart'
import EngineerIcon from '../../../icons/Engineer-Icon.svg'
import BsBookmarksIcon from '../../../icons/BsBookmarks.svg'
import BsGreenPatchCheckIcon from '../../../icons/BsGreenPatchCheck.svg'
import BsPatchExclamationIcon from '../../../icons/BsPatchExclamation.svg'
import BsCirclePlayOutlineWhiteIcon from '../../../icons/circle-play-outline-white-icon.svg'
import ProgressBar from '../../../components/ProgressBar/progressBar';
import FlashCard from '../../../components/FlashCard/flashCard';
import GoalsSection from '../../../components/GoalsSection/goalsSection';


const Dashboard = () => {

    const [flashCardModal, setFlashCardModal] = useState(false);

    const pieChartData = [
      { 
        value: 70, 
        category: "Mathematics",
        hours: "4",
        minutes: "15",
        hrs: "Hrs",
        mins: "Mins"
      },
      { 
        value: 20, 
        category: "Physics",
        hours: "1",
        minutes: "15",
        hrs: "Hrs",
        mins: "Mins"
      },
      { 
        value: 10, 
        category: "Chemistry",
        hours: "2",
        minutes: "15",
        hrs: "Hrs",
        mins: "Mins"
      }
    ];

    const userPerformanceData = [
        {
            name: "Mathematics",
            value: 70,
            bulletSettings: { src: chartTrophyIcon },
            color: "#C4DD9B"
        },
        {
            name: "Physics",
            value: 100,
            bulletSettings: { src: chartStarIcon },
            color: "#B0CCE7"
        },
        {
            name: "Chemistry",
            value: 60,
            bulletSettings: { src: chartWarningIcon },
            color: "#FFCFB6"
        }
    ];

    return (
        <div className="dashboard-section">
            <div className="dashboard-container">
                {/* Exam Cards Container */}
                <div className="exam-cards-container">
                    {/* Exam Progress Card */}
                    <div className="exam-progress-card">
                        <div className="exam-info">
                            <div className="exam-icon">
                                <img src={EngineerIcon} alt="Engineering icon" />
                            </div>
                            <div className="exam-details">
                                <h2>Engineering Entrance Exams</h2>
                                <div style={{width: '97%'}}>
                                    <ProgressBar percentage={50} color={'#38A169'} backgroundColor={'#C4C7CF'}/>
                                </div>
                                <p>Overall Progress</p>
                            </div>
                        </div>
                    </div>

                    {/* Exam Countdown Card */}
                    <div className="exam-countdown-card">
                        <div className="exam-logo">
                            <img src="/assets/iitlogo.svg" alt="IIT logo" />
                        </div>
                        <div className="exam-countdown-info">
                            <h2>IIT JEE 2024</h2>
                            <p>in June 2024</p>
                        </div>
                        <div className="countdown">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h1>50</h1>
                            </div>
                            <p>Weeks To Go</p>
                        </div>
                    </div>
                </div>

                {/* Study and Flashcards Sections Container */}
                <div className="dashboard-sections-container">
                    {/* Study Section */}
                    <div className="study-section">
                        <h2>Pickup Where You Left Off</h2>
                        <div className="study-card">
                            <div className="study-image">
                                <img src="/assets/pickupwhereyouleftoff.svg" alt="Pickup where you left off" />
                            </div>
                            <div className="study-content">
                                <h3>Types Of Sets</h3>
                                <p>in Sets, Relations and Functions</p>
                                <div className="subject-tag-container">
                                    <span className="subject-tag">Mathematics</span>
                                </div>
                            </div>
                        </div>
                        <button className="continue-btn">
                            <img src={BsCirclePlayOutlineWhiteIcon} alt="" />
                            Continue
                        </button>
                    </div>

                    {/* Flashcards Section */}
                    <div className="flashcards-section">
                        <h2>Flash Cards</h2>
                        <div className="flashcard-stats">
                            <div className="stat-item flashcard-stat mastered">
                                <div className="stat-row">
                                    <div className="stat-icon">
                                        <img src={BsGreenPatchCheckIcon} alt="" />
                                    </div>
                                    <span>Mastered</span>
                                </div>
                                <h3>0</h3>
                            </div>
                            <div className="stat-item flashcard-stat to-learn">
                                <div className="stat-row">
                                    <div className="stat-icon">
                                        <img src={BsPatchExclamationIcon} alt="" />
                                    </div>
                                    <span>To Learn</span>
                                </div>
                                <h3>70</h3>
                            </div>
                            <div className="stat-item flashcard-stat bookmarked">
                                <div className="stat-row">
                                    <div className="stat-icon">
                                        <img src={BsBookmarksIcon} alt="" />
                                    </div>
                                    <span>Bookmarked</span>
                                </div>
                                <h3>8</h3>
                            </div>
                        </div>
                        <button className="open-flashcards-btn" onClick={() => setFlashCardModal(true)}>Open Flashcards</button>
                    </div>
                </div>

                {/* Goals Card */}
                <div>
                    <GoalsSection/>
                </div>

                {/* This Week's Learning Summary */}
                <div className="card learning-summary-card">
                    <h2>This Week's Learning Summary</h2>
                    
                    <div className="learning-content">
                        <div className="learning-left">
                            <div className="learning-item video-item">
                                <span className="learning-icon">
                                    <img src={bsCameraVideoIcon} alt="" />
                                </span>
                                <div className="learning-info">
                                    <div className="learning-label">Video Lectures</div>
                                </div>
                                <div className="learning-time">
                                    5<span className="unit">hrs</span> 30<span className="unit">mins</span>
                                </div>
                            </div>
                            
                            <div className="learning-item reading-item">
                                <span className="learning-icon">
                                    <i className="far fa-file-alt"></i>
                                </span>
                                <div className="learning-info">
                                    <div className="learning-label">Reading Material</div>
                                </div>
                                <div className="learning-time">
                                    40<span className="unit">min</span>
                                </div>
                            </div>
                            
                            <div className="learning-item practice-item">
                                <span className="learning-icon">
                                    <i className="far fa-question-circle"></i>
                                </span>
                                <div className="learning-info">
                                    <div className="learning-label">Practice Questions</div>
                                </div>
                                <div className="learning-value">50</div>
                            </div>
                        </div>
                        
                        <div className="chart-container">
                            <SemiCirclePieChart data={pieChartData} />
                        </div>
                    </div>
                </div>

                {/* Performance Section */}
                <div className="performance-card">
                    <div className="performance-header">
                        <h2>This Week's Performance</h2>
                        <button className="insights-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3v18h18"></path>
                                <path d="M18 9l-5 5-2.5-2.5L7 15"></path>
                            </svg>
                            More Insights
                        </button>
                    </div>
                    
                    <div className="performance-content">
                        <div className="performance-stats">
                            <div className="stat-item tests-taken">
                                <div className="stat-row">
                                    <div className="stat-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                                            <rect x="9" y="3" width="6" height="4" rx="2"></rect>
                                            <path d="M9 14l2 2 4-4"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-label">Tests Taken</div>
                                </div>
                                <div className="stat-value">5</div>
                            </div>
                            
                            <div className="stat-item answers-correct">
                                <div className="stat-row">
                                    <div className="stat-icon">
                                        <img src={bsLightningChargeIcon} alt="" />
                                    </div>
                                    <div className="stat-label">Correctly Answered</div>
                                </div>
                                <div className="stat-value">80 /120</div>
                            </div>
                            
                            <div className="take-test-container">
                                <button className="take-test-btn">Take Test</button>
                            </div>
                        </div>
                        
                        <div className="performance-chart">
                            <div className="chart-header">
                                <img src={tickSquareIcon} style={{width: '17px', height: '17px'}} alt="" />
                                <div className="chart-label">Avg. Score Percentage</div>
                                <div className="chart-percentage">70%</div>
                            </div>
                            
                            <ColumnChartWithImages data={userPerformanceData} />
                        </div>
                    </div>
                </div>

                <div className="bottom-cards">
                    {/* Tip of the Day */}
                    <div className="tip-card">
                        <h2>Tip Of The Day</h2>
                        <div className="tip-content">
                            <div className="tip-image">
                                <img src="/assets/tipofthedayimage.svg" alt="Tip of the day" />
                            </div>
                            <div className="tip-text">
                                <p className="quote">" Reading about the topics and answering questions about them on the exact day can help you understand them better. "</p>
                                <p className="author">- Joseph, Physics Faculty at Perfect Learning</p>
                            </div>
                        </div>
                    </div>

                    {/* Stay Motivated */}
                    <div className="motivation-card">
                        <h2>Stay Motivated</h2>
                        <div className="motivation-image-container">
                            <img src="/assets/staymotivated.svg" alt="Stay motivated" className="motivation-image" />
                        </div>
                    </div>
                </div>

                {flashCardModal && <FlashCard onClose={() => setFlashCardModal(false)}/>}
            </div>
        </div>
    );
};

export default Dashboard;