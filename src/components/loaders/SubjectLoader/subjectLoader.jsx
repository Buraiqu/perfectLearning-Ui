import { useState, useRef, useEffect } from 'react';
import './subjectLoader.css';

const SubjectLoader = ({ className, value = 'all', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
    }, []);

    const subjects = [
        { id: 'all', name: 'All Subjects' },
        { id: 'mathematics', name: 'Mathematics' },
        { id: 'physics', name: 'Physics' },
        { id: 'chemistry', name: 'Chemistry' }
    ];

    const selectedSubject = subjects.find(subject => subject.id === selectedValue) || subjects[0];

    const handleSelect = (subject) => {
        setSelectedValue(subject.id);
        onChange?.(subject.id);
        setIsOpen(false);
    };

    return (
        <div className={`subject-select ${className || ''}`} ref={dropdownRef}>
            <button 
                className="subject-dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <div className="subject-main-text">{selectedSubject.name}</div>
                <div className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="subject-dropdown-content">
                    {subjects.map(subject => (
                        <div 
                            key={subject.id}
                            className={`subject-option ${subject.id === selectedValue ? 'selected' : ''}`}
                            onClick={() => handleSelect(subject)}
                        >
                            <div className={`radio-circle ${subject.id === selectedValue ? 'selected' : ''}`}></div>
                            <div className="subject-text">{subject.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubjectLoader;