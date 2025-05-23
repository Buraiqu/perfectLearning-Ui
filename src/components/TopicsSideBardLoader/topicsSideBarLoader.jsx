import { useState } from 'react'
import bsCameraVideoIcon from '../../icons/BsCameraVideoBlack.svg'
import BsFileEaMarkText from '../../icons/BsFileEarmarkText.svg'
import BsFilePpt from '../../icons/BsFilePpt.svg'
import downArrowIcon from '../../icons/down-arrow-icon.svg';
import circleGreenTick from  '../../icons/BsCheckCircleFill.svg'
import './topicsSideBarLoader.css'

const TopicsSideBardLoader = ({topics, onSelectItem, selectedTopic, selectedItem}) => {

    const [expand, setExpand] = useState(true)


    const getTypeIcon = (type) => {
        switch (type) {
            case 'video':
                return bsCameraVideoIcon
            case 'read':
                return BsFileEaMarkText
            case 'practice':
                return BsFilePpt
            default:
                return BsFileEaMarkText
        }
    }

    return (
        <div className="topic-side-section">

            <div className={`topics-sidebar ${expand ? 'expanded' : ''}`}>
                <div className="topics-header" onClick={() => setExpand(!expand)}>
                    <h2>Topics</h2>
                    <div className="expand-icon">
                        {!expand ? (
                            <>
                                <img src={downArrowIcon} alt=""  style={{transform: 'rotate(180deg)'}}/>
                                <img src={downArrowIcon} alt="" />
                            </>
                        ): (
                            <>
                                <img src={downArrowIcon} alt="" />
                                <img src={downArrowIcon} alt="" style={{transform: 'rotate(180deg)'}}/>
                            </>
                        )}
                    </div>
                </div>
                <div className={`topic-section ${expand ? 'expanded' : ''}`}>
                    {topics.map((topic, index) => (
                        <div key={index} style={{paddingTop: index === 0 ? '0' : '20px'}}>  
                            <div className="subtopic-header">
                                <span>{topic.name}</span>
                            </div>
                            <div className="topic-items">
                                {topic.items.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className={`topic-item ${selectedTopic === index && topics[selectedTopic].items[selectedItem].id === item.id ? 'selected' : ''}`}
                                        onClick={() => {
                                            // Find the index of the item within its topic
                                            const itemIndex = topic.items.findIndex(i => i.id === item.id);
                                            onSelectItem?.(item, index, itemIndex);
                                        }}
                                    >
                                        {item.status === 'completed' ? (
                                            <img className='type-icon' src={circleGreenTick} alt="" />
                                        ) : (
                                            <img className="type-icon" src={getTypeIcon(item.type)} alt="" />
                                        )}
                                        <div className="item-content">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-duration">{item.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopicsSideBardLoader