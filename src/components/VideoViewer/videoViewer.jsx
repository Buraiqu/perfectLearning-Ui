import { useEffect, useState, useRef  } from 'react'
import BsFillSkipBackwardFill from '../../icons/BsFillSkipBackwardFill.svg'
import BsFillSkipForwardFill from '../../icons/BsFillSkipForwardFill.svg'
import BsPlayFill from '../../icons/BsPlayFill.svg'
import BsVolumeUpFill from '../../icons/BsVolumeUpFill.svg'
import './videoViewer.css'

const VideoViewer = ({src}) => {

    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime)
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100
        document.documentElement.style.setProperty('--value-percent', `${percent}%`)
    }

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration)
    }

    const handleSeek = (e) => {
        const value = parseFloat(e.target.value)
        const time = (value / 100) * duration
        videoRef.current.currentTime = time
    }
    

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        videoRef.current.volume = newVolume
        setVolume(newVolume)
        setIsMuted(newVolume === 0)
    }

    const handleMute = () => {
        videoRef.current.muted = !videoRef.current.muted
        setIsMuted(!isMuted)
    }

    const handleFullscreen = () => {
        const videoContainer = videoRef.current.parentElement
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            videoContainer.requestFullscreen()
        }
    }

    const handlePrevious = () => {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
    }

    const handleNext = () => {
        videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10)
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--value-percent', '1%')
    }, [])

    return(
        <>
            <div className="video-viewer">
                <div className="video-player">
                    <video 
                        ref={videoRef}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                    <div className="video-controls-overlay">
                        <div className="top-controls">
                        </div>
                        <div className="bottom-controls">
                            <button className="control-button play-pause" onClick={handlePlayPause}>
                                {isPlaying ? '⏸' : <img src={BsPlayFill}/>}
                            </button>
                            <button className="control-button" onClick={handlePrevious}>
                                <img src={BsFillSkipBackwardFill} alt=""/>
                            </button>
                            <button className="control-button" onClick={handleNext}>
                                <img src={BsFillSkipForwardFill} alt=""/>
                            </button>
                            <button className="speed-button">1X</button>
                            <button className="quality-button">1080p</button>

                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={duration ? ((currentTime / duration) * 100) : 0} 
                                onChange={handleSeek}
                                className="weeks-slider"
                            />
                            <div className="bottom-buttons">
                                <div className="time-display">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </div>
                                <div className="right-controls">
                                    <button className="control-button" onClick={handleMute}>
                                        {isMuted ? '🔇' : <img src={BsVolumeUpFill}/>}
                                    </button>
                                    <input 
                                        type="range" 
                                        className="volume-slider" 
                                        min="0" 
                                        max="1" 
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                    />
                                    <button className="control-button" onClick={handleFullscreen}>⛶</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoViewer