import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="layout">
      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
