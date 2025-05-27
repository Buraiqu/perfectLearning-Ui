import { useEffect, useRef, useState } from 'react';
import FilterIcon from '../../../icons/filterIcon.svg'
import './customeFilter.css';

const CustomeFilter = ({ className, value = 'all', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [checkboxes, setCheckboxes] = useState({
        bookmarked: false,
        mastered: false
    });
    const elementRef = useRef(null)

    useEffect(() => {

        const handleClickOutSide = (event) => {
            if(elementRef.current && !elementRef.current.contains(event.target)){
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutSide)

    }, []);

    const handleSelect = (event) => {
        setSelectedValue(event);
        onChange?.(event);
        setIsOpen(false);
    };

    const handleCheckbox = (type) => {
        setCheckboxes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    return (
        <div className={`filter-select ${className || ''}`} ref={elementRef}>
            <button 
                className="filter-dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <div className="filter-main-text">Filters</div>
                <div className='dropdown-arrow'>
                    <img src={FilterIcon} alt="" />
                </div>
            </button>

            {isOpen && (
                <div className="filter-dropdown-content">
                    <div className="checkbox-section">
                        <div 
                            className="filter-option checkbox"
                            onClick={() => handleCheckbox('bookmarked')}
                        >
                            <div className={`checkbox-box ${checkboxes.bookmarked ? 'checked' : ''}`}>
                                {checkboxes.bookmarked && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <div className="filter-text">Bookmarked cards</div>
                        </div>
                        <div 
                            className="filter-option checkbox"
                            onClick={() => handleCheckbox('mastered')}
                        >
                            <div className={`checkbox-box ${checkboxes.mastered ? 'checked' : ''}`}>
                                {checkboxes.mastered && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <div className="filter-text">Mastered cards</div>
                        </div>
                    </div>

                    <span className='filter-topic-span'>
                        Topics
                    </span>
                    <div 
                        className={`filter-option ${selectedValue == 'all' ? 'selected': '' }`}
                        onClick={() => handleSelect('all')}
                    >
                        <div className={`radio-circle ${selectedValue === 'all' ? 'selected' : ''}`}></div>
                        <div className="filter-text">All Topics</div>
                    </div>
                    <div 
                        className={`filter-option ${selectedValue == 'completed' ? 'selected': '' }`}
                        onClick={() => handleSelect('completed')}
                    >
                        <div className={`radio-circle ${selectedValue === 'completed' ? 'selected' : ''}`}></div>
                        <div className="filter-text">Completed Topics</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomeFilter;