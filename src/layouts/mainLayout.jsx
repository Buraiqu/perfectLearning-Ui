import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/sidebar";
import "./mainLayout.css";
import MainTopBar from "../components/MainTopBar/mainTopBar";

const MainLayout = () => {
  const location = useLocation();
  const showSidebar = !location.pathname.includes('/main/my-courses');

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}
      <main className={`main-content ${!showSidebar ? 'no-sidebar' : ''}`}>
        {showSidebar && <MainTopBar />}
        <div className="main-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
