import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import MainLayout from "../layouts/mainLayout";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
