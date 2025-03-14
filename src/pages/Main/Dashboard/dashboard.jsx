
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="exam-progress-card">
                <div className="exam-info">
                    <div className="exam-icon">
                        <img src="/icons/engineering.svg" alt="Engineering icon" />
                    </div>
                    <div className="exam-details">
                        <h2>Engineering Entrance Exams</h2>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '0%' }}></div>
                        </div>
                        <p>Overall Progress</p>
                    </div>
                </div>
            </div>

            <div className="exam-countdown-card">
                <div className="exam-logo">
                    <img src="/icons/iit.svg" alt="IIT logo" />
                </div>
                <div className="exam-countdown-info">
                    <h2>IIT JEE 2024</h2>
                    <p>in June 2024</p>
                </div>
                <div className="countdown">
                    <h1>50</h1>
                    <p>Weeks to go</p>
                </div>
            </div>

            <div className="study-section">
                <h2>Pickup where you left off</h2>
                <div className="study-card">
                    <div className="study-image">
                        <img src="/images/math-notes.jpg" alt="Math notes" />
                    </div>
                    <div className="study-content">
                        <h3>Types of sets</h3>
                        <p>in Sets, Relations and Functions</p>
                        <span className="subject-tag">Mathematics</span>
                        <button className="continue-btn">Continue</button>
                    </div>
                </div>
            </div>

            <div className="flashcards-section">
                <h2>Flash Cards</h2>
                <div className="flashcard-stats">
                    <div className="stat-item mastered">
                        <img src="/icons/mastered.svg" alt="Mastered icon" />
                        <span>Mastered</span>
                        <h3>0</h3>
                    </div>
                    <div className="stat-item to-learn">
                        <img src="/icons/to-learn.svg" alt="To Learn icon" />
                        <span>To Learn</span>
                        <h3>70</h3>
                    </div>
                    <div className="stat-item bookmarked">
                        <img src="/icons/bookmark.svg" alt="Bookmark icon" />
                        <span>Bookmarked</span>
                        <h3>8</h3>
                    </div>
                </div>
                <button className="open-flashcards-btn">Open Flashcards</button>
            </div>
            <div className="flashcards-section">
                <h2>Flash Cards</h2>
                <div className="flashcard-stats">
                    <div className="stat-item mastered">
                        <img src="/icons/mastered.svg" alt="Mastered icon" />
                        <span>Mastered</span>
                        <h3>0</h3>
                    </div>
                    <div className="stat-item to-learn">
                        <img src="/icons/to-learn.svg" alt="To Learn icon" />
                        <span>To Learn</span>
                        <h3>70</h3>
                    </div>
                    <div className="stat-item bookmarked">
                        <img src="/icons/bookmark.svg" alt="Bookmark icon" />
                        <span>Bookmarked</span>
                        <h3>8</h3>
                    </div>
                </div>
                <button className="open-flashcards-btn">Open Flashcards</button>
            </div>
        </div>
    );
}
export default Dashboard;