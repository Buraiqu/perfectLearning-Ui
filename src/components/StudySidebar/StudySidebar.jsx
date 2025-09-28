import React from 'react';
import './StudySidebar.css';

// Import icons
import { IoDocumentTextOutline } from 'react-icons/io5';
import { BsFileText, BsFileEarmarkText } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';
import { BiNote } from 'react-icons/bi';
import { RiPencilLine } from 'react-icons/ri';

const StudySidebar = ({ activeTab, onTabChange, items = [] }) => {
  const defaultItems = [
    {
      id: 'questions',
      label: 'Bookmarked Questions',
      icon: IoDocumentTextOutline
    },
    {
      id: 'flashcards',
      label: 'Bookmarked Flashcards',
      icon: BsFileText
    },
    {
      id: 'formula',
      label: 'Formula Sheet',
      icon: BsFileEarmarkText
    },
    {
      id: 'videos',
      label: 'Bookmarked Videos',
      icon: MdOndemandVideo
    },
    {
      id: 'notes',
      label: 'Course Notes',
      icon: BiNote
    },
    {
      id: 'bookmarked-notes',
      label: 'Bookmarked Notes',
      icon: RiPencilLine
    }
  ];

  const sidebarItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="study-sidebar">
      {sidebarItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            className={`study-sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <IconComponent className="study-sidebar-icon" />
            <span className="study-sidebar-label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StudySidebar;
