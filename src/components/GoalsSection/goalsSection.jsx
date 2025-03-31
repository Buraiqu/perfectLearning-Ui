import './goalsSection.css'
import { useState, useRef, useEffect } from 'react';
import bsPencilSquareIcon from '../../icons/BsPencilSquare.svg';
import bsTrashIcon from '../../icons/BsTrash.svg';
import goalIcon from '../../icons/goal-icon.svg';
import bsCheckCircleFillIcon from '../../icons/BsCheckCircleFill.svg';
import ProgressBar from '../ProgressBar/progressBar';


const GoalsSection = () => {

    const [showGoalModal, setShowGoalModal] = useState(false);
    const [showDateDropdown, setShowDateDropdown] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false);

    const [subjectValue, setSubjectValue] = useState('Mathematics');
    const [topicValue, setTopicValue] = useState('Sets, Relations & Functions');
    const [deadlineValue, setDeadlineValue] = useState('Tomorrow');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const dateDropdownRef = useRef(null);
    const calendarRef = useRef(null);

    const  goals = [
        {
            subject: "Mathematics",
            topic: "Sets, Relations & Functions",
            deadline: "1st September",
            status: "In-Progress",
            progress: '50'
        },
        {
            subject: "Chemistry",
            topic: "Organic Chemistry",
            deadline: "Tomorrow",
            status: "In-Progress",
            progress: '0'
        },
        {
            subject: "Chemistry",
            topic: "Organic Chemistry",
            deadline: "29th August",
            status: "Completed",
            progress: '100'
        }
    ]

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

    const openGoalModal = () => {
        setShowGoalModal(true);
    };

    const closeGoalModal = () => {
        setShowGoalModal(false);
        setShowDateDropdown(false);
        setShowCalendar(false);
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

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
        
        const days = [];
        
        for (let i = 1; i < firstDayOfWeek; i++) {
            days.push({ date: null });
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({ date, day: i });
        }
        
        return days;
    };

    const handleSetGoal = () => {
        closeGoalModal();
    };

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
        <>
            <div className="goal-section">
                <div className="card goals-card">
                    <div className="card-header">
                        <h2>Your Goals</h2>
                        <button className="set-goal-btn" onClick={openGoalModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                            Set New Goal
                        </button>
                    </div>

                    <div className="goal-list">
                        {goals.map((goal, index) => (
                            <div className="goal-row" key={index}>
                                <div className="goal-left">
                                    {goal.status === "In-Progress" ? (
                                        <img src={goalIcon} alt="" />
                                    ) : (
                                        <img src={bsCheckCircleFillIcon} alt="" />
                                    )}
                                    <div className="goal-text">{goal.status === "In-Progress" ? "Complete " : "Completed "}<span className="goal-highlight">{goal.topic}</span> by <span className="goal-date">{goal.deadline}</span></div>
                                </div>
                                <div className='goal-progress'>
                                    <ProgressBar percentage={goal.progress} color={'#03488B'} />
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
                        ))}
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

        </>
    )
}

export default GoalsSection