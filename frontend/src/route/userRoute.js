import { Navigate, Outlet } from "react-router-dom";

const userRoute = ({ user, redirectPath = "/landing" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default userRoute;
