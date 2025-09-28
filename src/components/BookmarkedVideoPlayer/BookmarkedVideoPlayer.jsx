import React from 'react';
import VideoViewer from '../VideoViewer/videoViewer';
import './BookmarkedVideoPlayer.css';
import BsSaveBlueIcon from '../../icons/BsSaveBlueIcon.svg'

const BookmarkedVideoPlayer = ({ video }) => {
  const { src, title } = video;

  return (
    <div className="bookmarked-video-player">
      <h3 className="video-title">{title}</h3>
      <VideoViewer src={src} />
      <div className="video-actions">
        <button className="action-btn remove-bookmark-btn">
          <span className="btn-icon"></span>
          Remove Bookmark
        </button>
        <button className="action-btn save-offline-btn">
            <img src={BsSaveBlueIcon} style={{marginRight: '8px'}} alt="" />
          Save Offline
        </button>
      </div>
    </div>
  );
};

export default BookmarkedVideoPlayer;
