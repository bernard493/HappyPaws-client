import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../CustomHooks/AuthProvider ";

const PrivateRoutes = () => {
  const { isAuthenticated, authChecked } = useAuth();
  const location = useLocation();

  if (!authChecked) {
    // Prevent navigation and wait for the auth check to finish
    return null;

  }

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
