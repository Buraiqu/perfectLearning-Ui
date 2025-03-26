import './progressBar.css'

const ProgressBar = ({percentage, color, backgroundColor}) => {
    return (
        <div className="pl-custome-progress-bar">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{backgroundColor: backgroundColor}}>
                    <div className="progress" style={{ width: `${percentage}%` , minWidth: '1%', backgroundColor: color}}></div>
                </div>
                <div className="progress-text">{percentage}<span>%</span></div>
            </div>
        </div>
    )
}

export default ProgressBar