import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../CustomHooks/AuthProvider ";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth/login"
      state={{ from: location.pathname + location.search }} // store the original path before redirect
      replace
    />
  );
};
export default PrivateRoutes;
