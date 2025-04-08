import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * @param {string} requiredPermission - The permission required for the route.
 * @param {JSX.Element} children - The component to render if authorized.
 */
const AuthorizedRoute = ({ requiredPermission, children }) => {
  const userPermissions = useSelector((state) => state.user.userPermissions);
  const isLoading = useSelector((state) => state.user.processing);

  // Wait until the API call completes
  if (isLoading) return null; // Or a loading spinner

  // Redirect if no permission
  if (!userPermissions.includes(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AuthorizedRoute;
