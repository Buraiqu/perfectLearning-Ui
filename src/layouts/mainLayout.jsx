import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/sidebar";
import "./mainLayout.css";

const MainLayout = () => {
  const location = useLocation();
  const showSidebar = !location.pathname.includes('/main/my-courses');

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}
      <main className={`main-content ${!showSidebar ? 'no-sidebar' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
