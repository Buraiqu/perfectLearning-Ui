import './courseMaterial.css'
import { useState } from 'react'
import MathImage from '../../../../icons/math-image.svg'
import PhysicsImage from '../../../../icons/physics-image.svg'
import ChemistryImage from '../../../../icons/chemistry-image.svg'
import ProgressBar from '../../../../components/ProgressBar/progressBar'
import { useNavigate } from 'react-router-dom'

const CourseMaterialMain = () => {
    const [selectedSubject, setSelectedSubject] = useState('Mathematics')
    const navigate = useNavigate();
    const subjects = [
        {
            name: 'Mathematics',
            image: MathImage,
            percentage: 10
        },
        {
            name: 'Physics',
            image: PhysicsImage,
            percentage: 50
        },
        {
            name: 'Chemistry',
            image: ChemistryImage,
            percentage: 0
        }
    ]

    const topics = [
        {
            name: 'Sets, Relations, and Functions',
            progress: 50
        },
        {
            name: 'Inequalities, Modulus and Logarithms',
            progress: 20
        },
        {
            name: 'Relations & Functions 1',
            progress: 5
        },
        {
            name: 'Quadratic Equations',
            progress: 0
        },
        {
            name: 'Quadratic Equations & one',
            progress: 0
        },
        {
            name: 'Quadratic Equations & one',
            progress: 0
        },
        {
            name: 'Quadratic Equations & one',
            progress: 0
        },
    ]

    return(
        <div className="course-material">
            <div className="course-material-header">
                <h2>Pick a subject</h2>
            </div>
            <div className="subjects-grid">
                {subjects.map((subject, index) => (
                    <div
                        key={index}
                        className={`subject-card ${selectedSubject === subject.name ? 'selected' : ''}`}
                        onClick={() => setSelectedSubject(subject.name)}
                    >
                        <div className="subject-image">
                            <img src={subject.image} alt={subject.name} />
                        </div>
                        <div className="subject-progress-bar">
                            <div className="subject-progress" style={{width: `${subject.percentage}%`}}></div>
                        </div>
                        <div className="subject-name">{subject.name}</div>
                    </div>
                ))}
            </div>

            <div className="topics-section">
                <h3>Select a topic</h3>
                <div className="topics-list">
                    {topics.map((topic, index) => (
                        <div key={index} className="topic-item" onClick={() => navigate(`/main/course-material-topics?subject=${selectedSubject}&topic=${topic.name}`)}>
                            <div className="topic-name">{topic.name}</div>
                            <div className="topic-progress">
                                <ProgressBar 
                                    percentage={topic.progress} 
                                    showPercentageFirst={true}
                                    color="#03488B"
                                    backgroundColor="#C5DDF399"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CourseMaterialMain