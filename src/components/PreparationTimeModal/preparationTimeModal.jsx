import { useState } from 'react';
import './preparationTimeModal.css';

const PreparationTimeModal = ({ isOpen, onClose, initialWeeks = 40 }) => {
    const [weeks, setWeeks] = useState(initialWeeks);

    if (!isOpen) return null;

    const handleSave = () => {
        onClose();
    };

    const updateSliderBackground = (value) => {
        const percent = (value - 1) / (52 - 1) * 100;
        document.documentElement.style.setProperty('--value-percent', `${percent}%`);
    };

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value);
        setWeeks(value);
        updateSliderBackground(value);
    };

    const calculateEndDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + weeks * 7);
        return today.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="preparation-modal">

            <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-header">
                        <h2>Complete preparation in</h2>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body">
                        <div className="slider-container">
                            <input 
                                type="range" 
                                min="1" 
                                max="52" 
                                value={weeks} 
                                onChange={handleSliderChange}
                                className="weeks-slider"
                            />
                            <div className="weeks-display">
                                <span>{weeks} Weeks</span>
                            </div>
                        </div>
                        <div className="completion-date">
                            <p>You will finish your preparation by</p>
                            <span>{calculateEndDate()}</span>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreparationTimeModal;
