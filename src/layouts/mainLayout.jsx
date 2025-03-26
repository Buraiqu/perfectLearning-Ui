import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/sidebar";
import "./mainLayout.css";
import MainTopBar from "../components/MainTopBar/mainTopBar";
import useWindowSize from "../hooks/useWindowSize";
import { useState } from "react";

const MainLayout = () => {
  const location = useLocation();
  const showSidebar = !location.pathname.includes('/main/my-courses');
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;
  const [exapand, setIsExpanded] = useState(false);

  return (
    <div className="layout">
      {showSidebar && <Sidebar expand={exapand} onMenuClick={setIsExpanded}/>}
      <main className={`main-content ${!showSidebar ? 'no-sidebar' : isMobile ? 'w-100': ''}`}>
        {showSidebar && <MainTopBar onMenuClick={setIsExpanded} />}
        <div className="main-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
