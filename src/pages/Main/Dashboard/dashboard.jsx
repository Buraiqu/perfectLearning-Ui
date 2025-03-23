import './dashboard.css';
import ColumnChartWithImages from '../../../components/Charts/ColumnChartWithImages';
import { useState, useRef, useEffect } from 'react';
import goalIcon from '../../../icons/goal-icon.svg';
import bsCheckCircleFillIcon from '../../../icons/BsCheckCircleFill.svg';
import bsPencilSquareIcon from '../../../icons/BsPencilSquare.svg';
import bsTrashIcon from '../../../icons/BsTrash.svg';
import bsCameraVideoIcon from '../../../icons/BsCameraVideo.svg';
import tickSquareIcon from '../../../icons/tick-square-icon.svg'
import bsLightningChargeIcon from '../../../icons/BsLightningCharge.svg'
import chartStarIcon from '../../../icons/column-chart-star-icon.svg'
import chartWarningIcon from '../../../icons/column-chart-warning-icon.svg'
import chartTrophyIcon from '../../../icons/column-chart-trophy-icon.svg'
import SemiCirclePieChart from '../../../components/Charts/SemiCirclePieChart'
import EngineerIcon from '../../../icons/engineer-icon.svg'
import BsBookmarksIcon from '../../../icons/BsBookmarks.svg'
import BsPatchCheckIcon from '../../../icons/BsPatchCheck.svg'
import BsPatchExclamationIcon from '../../../icons/BsPatchExclamation.svg'
import BsCirclePlayOutlineWhiteIcon from '../../../icons/circle-play-outline-white-icon.svg'

const chartOptions = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Mathematics', 'Physics'],
    },
    yaxis: {
        title: {
            text: '%'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + "%"
            }
        }
    }
};

const chartSeries = [{
    name: 'Accuracy',
    data: [86, 78]
}];

const pieChartOptions = {
    chart: {
        type: 'donut',
        height: 220,
        offsetY: 0
    },
    plotOptions: {
        pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 0,
            donut: {
                size: '80%',
                labels: {
                    show: false
                }
            }
        }
    },
    colors: ['#4caf50', '#2196f3', '#f44336'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    tooltip: {
        enabled: false
    },
    stroke: {
        width: 0
    }
};

const pieChartSeries = [255, 75, 135]; // Minutes for each subject

const Dashboard = () => {

    const [showGoalModal, setShowGoalModal] = useState(false);

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
    const [subjectValue, setSubjectValue] = useState('Mathematics');
    const [topicValue, setTopicValue] = useState('Sets, Relations & Functions');
    const [deadlineValue, setDeadlineValue] = useState('Tomorrow');
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    
    const dateDropdownRef = useRef(null);
    const calendarRef = useRef(null);

    const openGoalModal = () => {
        setShowGoalModal(true);
    };

    const closeGoalModal = () => {
        setShowGoalModal(false);
        setShowDateDropdown(false);
        setShowCalendar(false);
    };

    const handleSetGoal = () => {
        // Logic to add a new goal would go here
        // For now, just close the modal
        closeGoalModal();
    };

    const toggleDateDropdown = () => {
        setShowDateDropdown(!showDateDropdown);
        setShowCalendar(false);
    };

    const handleDateSelection = (value) => {
        setDeadlineValue(value);
        if (value === 'Pick date') {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        }
        setShowDateDropdown(false);
    };

    // Calendar navigation functions
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
        setDeadlineValue(formattedDate);
        setShowCalendar(false);
    };

    const getMonthName = (monthIndex) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // Adjust Sunday to be 7 instead of 0
        
        // Create array for all days in month
        const days = [];
        
        // Add empty cells for days before first day of month
        for (let i = 1; i < firstDayOfWeek; i++) {
            days.push({ date: null });
        }
        
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({ date, day: i });
        }
        
        return days;
    };

    // Close dropdown and calendar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
                setShowDateDropdown(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target) && 
                dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dateDropdownRef, calendarRef]);

    // Calculate day names
    const getTodayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    };

    const getTomorrowName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return days[tomorrow.getDay()];
    };

    const getNextMondayName = () => {
        return 'Monday';
    };

    return (
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
                            <div className="progress-container">
                                <div className="progress-bar1">
                                    <div className="progress1" style={{ width: '10%' }}></div>
                                </div>
                                <div className="progress-text1">10<span>%</span></div>
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
                        <p>Weeks to go</p>
                    </div>
                </div>
            </div>

            {/* Study and Flashcards Sections Container */}
            <div className="dashboard-sections-container">
                {/* Study Section */}
                <div className="study-section">
                    <h2>Pickup where you left off</h2>
                    <div className="study-card">
                        <div className="study-image">
                            <img src="/assets/pickupwhereyouleftoff.svg" alt="Pickup where you left off" />
                        </div>
                        <div className="study-content">
                            <h3>Types of sets</h3>
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
                                    <img src={BsPatchCheckIcon} alt="" />
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
                    <button className="open-flashcards-btn">Open Flashcards</button>
                </div>
            </div>

            {/* Goals Card */}
            <div className="card goals-card">
                <div className="card-header">
                    <h2>Your Goals</h2>
                    <button className="set-goal-btn" onClick={openGoalModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                        Set new goal
                    </button>
                </div>
                
                <div className="goal-list">
                    <div className="goal-row">
                        <div className="goal-left">
                            <img src={goalIcon} alt="" />
                            <div className="goal-text">Complete <span className="goal-highlight">Sets, Relations & Functions</span> by <span className="goal-date">1st September</span></div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '10%' }}></div>
                            </div>
                            <div className="progress-text">10<span>%</span></div>
                        </div>
                        <div className="goal-right">
                            <button className="icon-btn edit-btn" aria-label="Edit goal">
                                <img src={bsPencilSquareIcon} className="edit-icon" alt="" />
                            </button>
                            <button className="icon-btn delete-btn" aria-label="Delete goal">
                                <img src={bsTrashIcon} className="trash-icon" alt="" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="goal-row">
                        <div className="goal-left">
                            <img src={goalIcon} alt="" />
                            <div className="goal-text">Complete <span className="goal-highlight">Organic Chemistry</span> by <span className="goal-date">Tomorrow</span></div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '0%' , minWidth: '1%'}}></div>
                            </div>
                            <div className="progress-text">0<span>%</span></div>
                        </div>
                        <div className="goal-right">
                            <button className="icon-btn edit-btn" aria-label="Edit goal">
                                <img src={bsPencilSquareIcon} className="edit-icon" alt="" />
                            </button>
                            <button className="icon-btn delete-btn" aria-label="Delete goal">
                                <img src={bsTrashIcon} className="trash-icon" alt="" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="goal-row completed">
                        <div className="goal-left">
                            <img src={bsCheckCircleFillIcon} alt="" />
                            <div className="goal-text">Completed <span className="goal-highlight">Organic Chemistry</span> by <span className="goal-date">29th August</span></div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '100%' }}></div>
                            </div>
                            <div className="progress-text">100<span>%</span></div>
                        </div>
                        <div className="goal-right">
                            <button className="icon-btn edit-btn" aria-label="Edit goal">
                                <img src={bsPencilSquareIcon} className="edit-icon" alt="" />
                            </button>
                            <button className="icon-btn delete-btn" aria-label="Delete goal">
                                <img src={bsTrashIcon} className="trash-icon" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
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
                            <div className="stat-value">80 <span style={{color: 'black'}}>/120</span></div>
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
                    <h2>Tip of the day</h2>
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
                    <h2>Stay motivated</h2>
                    <div className="motivation-image-container">
                        <img src="/assets/staymotivated.svg" alt="Stay motivated" className="motivation-image" />
                    </div>
                </div>
            </div>

            {/* New Goal Modal */}
            {showGoalModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <div className="modal-title">
                                <img src={goalIcon} alt="" />
                                <h2>Set New Goal</h2>
                            </div>
                            <button className="close-btn" onClick={closeGoalModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Pick a Subject</label>
                                <div className="select-container" style={{width: '40%'}}>
                                    <select 
                                        value={subjectValue} 
                                        onChange={(e) => setSubjectValue(e.target.value)}
                                    >
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Chemistry</option>
                                    </select>
                                    <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Select Topic</label>
                                <div className="select-container" style={{width: '70%'}}>
                                    <select 
                                        value={topicValue} 
                                        onChange={(e) => setTopicValue(e.target.value)}
                                    >
                                        <option>Sets, Relations & Functions</option>
                                        <option>Calculus</option>
                                        <option>Trigonometry</option>
                                    </select>
                                    <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Complete topic by</label>
                                <div className="select-container custom-dropdown" style={{width: '50%'}} ref={dateDropdownRef}>
                                    <div className="selected-option" onClick={toggleDateDropdown}>
                                        {deadlineValue}
                                        <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                    
                                    {showDateDropdown && (
                                        <div className="dropdown-options">
                                            <div className={`dropdown-option ${deadlineValue === 'Today' ? 'selected' : ''}`} onClick={() => handleDateSelection('Today')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Today</span>
                                                </div>
                                                <div className="day-name">
                                                    {getTodayName()}
                                                </div>
                                            </div>
                                            <div className={`dropdown-option ${deadlineValue === 'Tomorrow' ? 'selected' : ''}`} onClick={() => handleDateSelection('Tomorrow')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Tomorrow</span>
                                                </div>
                                                <div className="day-name">
                                                    {getTomorrowName()}
                                                </div>
                                            </div>
                                            <div className={`dropdown-option ${deadlineValue === 'Next week' ? 'selected' : ''}`} onClick={() => handleDateSelection('Next week')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Next week</span>
                                                </div>
                                                <div className="day-name">
                                                    {getNextMondayName()}
                                                </div>
                                            </div>
                                            <div className={`dropdown-option ${deadlineValue === 'Pick date' ? 'selected' : ''}`} onClick={() => handleDateSelection('Pick date')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Pick date</span>
                                                </div>
                                                <div className="day-name">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {showCalendar && (
                                        <div className="calendar-container" ref={calendarRef}>
                                            <div className="calendar-header">
                                                <div className="month-year">
                                                    {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
                                                </div>
                                                <div className="calendar-nav">
                                                    <button className="calendar-nav-btn" onClick={prevMonth}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="15 18 9 12 15 6"></polyline>
                                                        </svg>
                                                    </button>
                                                    <button className="calendar-nav-btn" onClick={nextMonth}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="calendar-weekdays">
                                                <div className="weekday">Mo</div>
                                                <div className="weekday">Tu</div>
                                                <div className="weekday">We</div>
                                                <div className="weekday">Th</div>
                                                <div className="weekday">Fr</div>
                                                <div className="weekday">Sa</div>
                                                <div className="weekday">Su</div>
                                            </div>
                                            <div className="calendar-days">
                                                {generateCalendarDays().map((dayObj, index) => (
                                                    <div 
                                                        key={index} 
                                                        className={`calendar-day ${!dayObj.date ? 'empty' : ''} ${
                                                            selectedDate && dayObj.date && 
                                                            selectedDate.getDate() === dayObj.date.getDate() && 
                                                            selectedDate.getMonth() === dayObj.date.getMonth() && 
                                                            selectedDate.getFullYear() === dayObj.date.getFullYear() ? 'selected' : ''
                                                        }`}
                                                        onClick={() => dayObj.date && handleDateClick(dayObj.date)}
                                                    >
                                                        {dayObj.day}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button className="set-goal-submit-btn" onClick={handleSetGoal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="16"></line>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                    </svg>
                                    Set goal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;