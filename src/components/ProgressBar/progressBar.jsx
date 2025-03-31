import './progressBar.css'

const ProgressBar = ({percentage, color, backgroundColor, showPercentageFirst}) => {
    return (
        <div className="pl-custome-progress-bar">
            <div className="progress-bar-container">
                {showPercentageFirst && <div className="progress-text">{percentage}<span>%</span></div>}
                <div className="progress-bar" style={{backgroundColor: backgroundColor}}>
                    <div className="progress" style={{ width: `${percentage}%` , minWidth: '1%', backgroundColor: color}}></div>
                </div>
                {!showPercentageFirst && <div className="progress-text">{percentage}<span>%</span></div>}
            </div>
        </div>
    )
}

export default ProgressBar