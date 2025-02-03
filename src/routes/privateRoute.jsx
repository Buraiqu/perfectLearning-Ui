import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import MainLayout from "./layouts/MainLayout";

const PrivateRoute = () => {
  const { user } = useAuth();

  return user ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
