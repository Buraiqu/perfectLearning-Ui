import logo from "/assets/logo_full.svg";
import NavAvatar from "../NavAvatar/navAvatar";
import Notification from "../Notification/notification";
import "./mainTopBar.css";

const MainTopBar = () => {
    return (
        <div className="main-topbar">
            <div className="main-topbar-left">
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