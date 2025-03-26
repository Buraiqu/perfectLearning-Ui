import NavAvatar from "../NavAvatar/navAvatar";
import Notification from "../Notification/notification";
import "./mainTopBar.css";
import useWindowSize from "../../hooks/useWindowSize";

const MainTopBar = ({ onMenuClick }) => {

    const windowSize = useWindowSize();
    const isMobile = windowSize.width < 768;

    return (
        <div className="main-topbar">
            <div className="main-topbar-left">
                {isMobile && (
                    <div className="hamburger-menu" onClick={() => onMenuClick(prev => !prev)}>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                    </div>
                )}
                <p className="hello-text">
                    Hello <span style={{color: "#03488B"}}>Sravanti</span>
                </p>
            </div>
            <div className="main-topbar-right">
                <Notification showOnlyIcon={true}/>
                <NavAvatar showOnlyIcon={true}/>
            </div>
        </div>
    )
}
export default MainTopBar;