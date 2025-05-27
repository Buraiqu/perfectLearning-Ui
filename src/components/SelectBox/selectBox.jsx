
import { useState, useRef, useEffect } from 'react';
import './selectBox.css';

const CustomSelect = ({ value, onChange, options, label }) => {

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="custom-select" ref={selectRef}>
            <div className="select-label">{label}</div>
            <div 
                className={`select-selected ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {value}
            </div>
            {isOpen && (
                <div className="select-items">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`select-item ${value === option ? 'selected' : ''}`}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;